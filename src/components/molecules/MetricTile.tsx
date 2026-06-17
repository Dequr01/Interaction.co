import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricTileProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricTile: React.FC<MetricTileProps> = ({ title, value, icon: Icon, trend, className }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-6 rounded-2xl bg-surface/40 backdrop-blur-md border border-surface-border shadow-sm flex flex-col gap-4 ${className || ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-muted uppercase tracking-wider">{title}</span>
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent-blue" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-display font-bold text-text-primary">{value}</span>
        {trend && (
          <span
            className={`text-sm font-medium px-2 py-0.5 rounded-full ${
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </motion.div>
  );
};
