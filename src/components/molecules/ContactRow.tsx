import React from 'react';
import { MoreHorizontal, MessageSquare, Phone } from 'lucide-react';
import { Avatar } from '../atoms/Avatar';
import { StatusDot } from '../atoms/StatusDot';

interface ContactRowProps {
  name: string;
  role: string;
  avatarUrl?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: string;
}

export const ContactRow: React.FC<ContactRowProps> = ({ name, role, avatarUrl, status, lastSeen }) => {
  return (
    <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar src={avatarUrl} initials={name.charAt(0)} size="md" />
          <div className="absolute -bottom-1 -right-1 border-2 border-bg rounded-full">
             <StatusDot status={status} animate={status === 'online'} />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">{name}</h4>
          <p className="text-xs text-text-muted">{role} {lastSeen && `• ${lastSeen}`}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 text-text-muted hover:text-text-primary hover:bg-white/10 rounded-full transition-colors">
          <MessageSquare className="w-4 h-4" />
        </button>
        <button className="p-2 text-text-muted hover:text-text-primary hover:bg-white/10 rounded-full transition-colors">
          <Phone className="w-4 h-4" />
        </button>
        <button className="p-2 text-text-muted hover:text-text-primary hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
