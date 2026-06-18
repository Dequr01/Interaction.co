import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

// Simple in-memory store for sessions (Note: this resets on server restart/redeploy)
const conversations = new Map<string, any[]>();

async function sendEmail(lead: any) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Missing GMAIL_USER or GMAIL_APP_PASSWORD. Skipping email.");
    return;
  }
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Lead: ${lead.name}`,
    text: JSON.stringify(lead, null, 2),
  });
}

async function extractAndForward(sessionId: string, history: any[]) {
  const transcript = history.map(h => `${h.role}: ${h.parts[0].text}`).join("\n");
  const prompt = `Extract this conversation into strict JSON only (no markdown, no extra text):
{"name":"","contact":"","projectType":"","budget":"","timeline":"","requirements":""}

Conversation:
${transcript}`;

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  
  const data = await r.json();
  const raw = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
  
  try {
    const lead = JSON.parse(raw);
    
    // Save to local file
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const leadsFile = path.join(dataDir, 'leads.json');
    let leads = [];
    try {
      const fileData = await fs.readFile(leadsFile, 'utf-8');
      leads = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist or invalid JSON
    }
    
    leads.push({ ...lead, sessionId, date: new Date().toISOString() });
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));

    // Send email
    await sendEmail(lead);
  } catch (e) {
    console.error("Failed to parse or forward lead JSON:", e);
  }
}

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ reply: "I'm currently offline as the API key is not configured.", done: false });
    }

    const history = conversations.get(sessionId) || [];
    history.push({ role: "user", parts: [{ text: message }] });

    const systemPrompt = `You are the intake assistant for "Interactions" agency.
Chat naturally with the visitor and collect: name, contact (email/phone), 
project type, budget range, timeline, and key requirements.
Ask one short question at a time. Once you have ALL of these, 
append exactly [INTAKE_COMPLETE] at the end of your final message.`;

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: history,
        }),
      }
    );
    
    const data = await r.json();
    
    if (!data.candidates || !data.candidates[0]) {
      console.error("Gemini API Error Response:", JSON.stringify(data, null, 2));
      throw new Error(`Invalid response from Gemini API: ${data.error?.message || 'Unknown error'}`);
    }
    
    const reply = data.candidates[0].content.parts[0].text;
    const done = reply.includes("[INTAKE_COMPLETE]");
    const cleanReply = reply.replace("[INTAKE_COMPLETE]", "").trim();

    history.push({ role: "model", parts: [{ text: reply }] });
    conversations.set(sessionId, history);

    if (done) {
      // Run extraction in background to avoid blocking the response
      extractAndForward(sessionId, history).catch(console.error);
    }

    return NextResponse.json({ reply: cleanReply, done });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
