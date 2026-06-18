import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '../atoms/Button';

interface BillingAlertsBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const BillingAlertsBanner: React.FC<BillingAlertsBannerProps> = ({
  isVisible,
  onDismiss,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-1 items-center gap-3">
                <span className="flex p-2 rounded-lg bg-amber-500/20">
                  <AlertCircle className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </span>
                <p className="text-amber-100 font-medium text-sm truncate">
                  {message}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {actionLabel && onAction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onAction}
                    className="text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
                  >
                    {actionLabel}
                  </Button>
                )}
                <button
                  type="button"
                  className="-m-3 p-3 focus-visible:outline-offset-[-4px] text-amber-500/70 hover:text-amber-400 transition-colors"
                  onClick={onDismiss}
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
