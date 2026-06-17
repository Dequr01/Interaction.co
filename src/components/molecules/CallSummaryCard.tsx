import React from 'react';
import { Phone, Clock, User } from 'lucide-react';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface CallSummaryCardProps {
  contactName: string;
  duration: string;
  time: string;
  status: 'completed' | 'missed' | 'voicemail';
  avatarUrl?: string;
}

export const CallSummaryCard: React.FC<CallSummaryCardProps> = ({
  contactName,
  duration,
  time,
  status,
  avatarUrl,
}) => {
  return (
    <div className="p-4 md:p-5 rounded-2xl bg-surface/30 backdrop-blur-md border border-surface-border hover:border-white/10 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar src={avatarUrl} initials={contactName.charAt(0)} size="md" />
        <div>
          <h4 className="text-base font-semibold text-text-primary">{contactName}</h4>
          <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {time}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {duration}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
        <Badge
          variant={
            status === 'completed' ? 'success' : status === 'missed' ? 'error' : 'warning'
          }
        >
          {status}
        </Badge>
        <Button variant="ghost" size="md" className="hidden sm:flex rounded-full px-3">
          Details
        </Button>
      </div>
    </div>
  );
};
