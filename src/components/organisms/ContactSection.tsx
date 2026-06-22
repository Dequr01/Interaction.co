'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, X } from 'lucide-react';
import { BadgePill } from '../atoms/BadgePill';
import { Button } from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';

export function ContactSection() {
  const [view, setView] = useState<'form' | 'sent' | 'chat'>('form');
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hi! I'm Interactions AI. I can answer questions about our services, gather your requirements, or help you get started." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [chatDone, setChatDone] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareOpacity = useMotionValue(0);
  const smoothGlareOpacity = useSpring(glareOpacity, { damping: 20, stiffness: 100 });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setView('sent');
    setTimeout(() => setView('form'), 3000);
  }

  async function handleSendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isSending) return;
    
    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsSending(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: userMsg })
      });
      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      }
      if (data.done) {
        setChatDone(true);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsSending(false);
    }
  }

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    glareOpacity.set(1);
  }

  function handleMouseLeave() {
    glareOpacity.set(0);
  }

  const renderFormContent = () => (
    <div className="glass-card p-6 md:p-6 rounded-3xl relative overflow-hidden group h-[520px] md:h-[350px] w-full max-w-md md:max-w-none mx-auto shadow-2xl pointer-events-auto">
      <div className="absolute -inset-2 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {view === 'form' && (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative z-10 flex flex-col gap-3 md:gap-4 h-full" 
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1 flex flex-col gap-1.5 md:gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-widest font-mono">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 md:py-2 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5 md:gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-widest font-mono">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 md:py-2 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2 flex-1">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-widest font-mono">Message</label>
              <textarea 
                placeholder="Tell us about your project..."
                className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 md:py-2 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all resize-none"
              />
            </div>

            <div className="mt-2 flex flex-col sm:flex-row justify-center gap-4 shrink-0">
              <Magnetic>
                <Button type="submit" variant="secondary" size="lg" className="w-full sm:w-auto px-12 md:h-[40px] md:px-8 md:text-xs">
                  Send Message
                </Button>
              </Magnetic>
              <Magnetic>
                <Button type="button" onClick={() => setView('chat')} variant="rainbow" size="lg" className="w-full sm:w-auto px-8 md:h-[40px] md:px-6 md:text-xs font-extrabold tracking-widest text-[0.9rem] md:text-[0.8rem]">
                  Chat with Interactions AI
                </Button>
              </Magnetic>
            </div>
          </motion.form>
        )}

        {view === 'sent' && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-2">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-display font-bold text-text-primary">Message Sent!</h3>
            <p className="text-text-secondary">We'll get back to you as soon as possible.</p>
          </motion.div>
        )}

        {view === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative z-10 flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent-blue" />
                <h3 className="text-xl font-display font-bold text-text-primary">Interactions AI</h3>
              </div>
              <button onClick={() => setView('form')} className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors">
                Back to Form
              </button>
            </div>
            
            <div className="flex-1 bg-transparent border border-black/10 dark:border-white/10 rounded-xl p-4 flex flex-col gap-3 overflow-y-auto mb-4 min-h-0 relative">
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl -z-10" />
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] shadow-sm ${
                    msg.role === 'model' 
                      ? 'bg-white/50 dark:bg-[#040405]/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-text-primary self-start rounded-tl-sm' 
                      : 'bg-accent-blue text-white self-end rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isSending && (
                <div className="bg-white/50 dark:bg-[#040405]/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-text-primary self-start px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-text-secondary animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-text-secondary animate-pulse delay-75" />
                  <span className="w-2 h-2 rounded-full bg-text-secondary animate-pulse delay-150" />
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                disabled={isSending || chatDone}
                placeholder={chatDone ? "Chat completed" : "Type your message..."}
                className="flex-1 min-w-0 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all disabled:opacity-50"
              />
              <Button type="submit" disabled={isSending || chatDone || !chatInput.trim()} variant="rainbow" size="sm" className="px-4 md:px-6 rounded-xl shrink-0">
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="contact" className="relative w-full snap-start py-2 md:py-3 px-6 md:px-12 flex-1 flex flex-col justify-center min-h-0">
      <div className="max-w-7xl mx-auto relative z-10 w-full flex-1 flex flex-col justify-center md:block">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 md:mb-6"
        >
          <BadgePill>
            <MessageSquare className="w-4 h-4 text-text-secondary" />
            CONTACT
          </BadgePill>
          <div className="mt-2 md:mt-3 relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            
            {/* Base Text (Invisible, provides sizing) */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight opacity-0 pointer-events-none select-none">
              Let's build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent-blue to-purple-400">
                something great.
              </span>
            </h2>

            {/* Layer 1: Visible Text */}
            <h2 className="absolute inset-0 font-display text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight text-text-primary pointer-events-none">
              Let's build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent-blue to-purple-400">
                something great.
              </span>
            </h2>

            {/* Layer 2: Glare (Cursor Tracking) */}
            <motion.h2
              className="absolute inset-0 font-display text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text pointer-events-none"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: smoothGlareOpacity,
                backgroundImage: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.9),
                    transparent 40%
                  )
                `,
              }}
            >
              Let's build{' '}
              <span className="text-transparent">
                something great.
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Mobile Modal Trigger Button */}
        <div className="md:hidden flex-1 flex items-center justify-center w-full relative z-20 py-4">
          <Button onClick={() => setIsMobileModalOpen(true)} variant="secondary" size="lg" className="w-full max-w-[280px]">
            Send a Message
          </Button>
        </div>

        {/* Desktop inline form */}
        <div className="hidden md:flex flex-col gap-4 lg:gap-6 max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 w-full"
          >
            {renderFormContent()}
          </motion.div>
        </div>
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md"
          >
            {/* Overlay click to close */}
            <div className="absolute inset-0" onClick={() => setIsMobileModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md"
            >
              <button 
                onClick={() => setIsMobileModalOpen(false)}
                className="absolute -top-14 right-0 p-3 text-text-secondary hover:text-text-primary bg-surface/50 rounded-full border border-surface-border backdrop-blur-md shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              {renderFormContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
