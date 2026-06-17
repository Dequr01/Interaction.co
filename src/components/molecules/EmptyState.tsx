import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '../atoms/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-inner">
        <Icon className="w-8 h-8 text-text-muted" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-display font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
