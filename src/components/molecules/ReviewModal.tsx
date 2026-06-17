'use client';
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../atoms/Button';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface/80 backdrop-blur-2xl border border-surface-border p-6 rounded-3xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Leave a Review</h3>
            <p className="text-text-secondary mb-6">Your feedback helps us improve our services.</p>

            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-text-muted'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 mb-6"
            />

            <div className="flex justify-end gap-4">
              <Button variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onSubmit(rating, comment);
                  onClose();
                }}
                disabled={rating === 0}
              >
                Submit Review
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
