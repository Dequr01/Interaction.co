import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Badge } from '../atoms/Badge';

interface AppointmentChipProps {
  title: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'call';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const AppointmentChip: React.FC<AppointmentChipProps> = ({ title, date, time, type, status }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface/40 backdrop-blur-md border border-surface-border rounded-xl hover:border-accent-blue/30 transition-colors gap-4">
      <div className="flex flex-col gap-1">
        <h5 className="font-medium text-text-primary flex items-center gap-2">
          {type === 'video' && <Video className="w-4 h-4 text-accent-blue" />}
          {title}
        </h5>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {time}
          </span>
        </div>
      </div>
      
      <div>
        <Badge
          variant={
            status === 'ongoing' ? 'info' : status === 'upcoming' ? 'warning' : 'default'
          }
        >
          {status}
        </Badge>
      </div>
    </div>
  );
};
