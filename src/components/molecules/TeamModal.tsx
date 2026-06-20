'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Globe } from 'lucide-react'
import teamData from '../../../data/team.json'
import Link from 'next/link'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

type TeamMember = typeof teamData[0]

interface TeamModalProps {
  member: TeamMember | null
  onClose: () => void
}

export function TeamModal({ member, onClose }: TeamModalProps) {
  // Close on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-3xl glass-card pointer-events-auto"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center
                           bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30 backdrop-blur-md
                           border border-black/10 dark:border-white/20 transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Photo Hero */}
              <div className="relative w-full aspect-[4/5] md:aspect-square rounded-t-3xl overflow-hidden">
                <Image
                  src={member.photo.trim()}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-accent-blue font-mono font-bold tracking-widest uppercase text-[0.65rem] mb-1">
                    {member.designation}
                  </p>
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                    {member.name}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 bg-surface-primary dark:bg-surface-primary/50">
                {member.about ? (
                  <p className="text-text-secondary leading-relaxed text-sm md:text-base font-medium">
                    {member.about}
                  </p>
                ) : (
                  <p className="text-text-muted italic text-sm">No biography available.</p>
                )}

                {/* Social links */}
                {(member.links.github || member.links.linkedin || member.links.website) && (
                  <div className="flex gap-3 mt-8">
                    {member.links.github && (
                      <Link
                        href={`https://${member.links.github.replace('https://', '')}`}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                                   flex items-center justify-center
                                   hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4 text-text-primary" />
                      </Link>
                    )}
                    {member.links.linkedin && (
                      <Link
                        href={member.links.linkedin}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                                   flex items-center justify-center
                                   hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4 text-text-primary" />
                      </Link>
                    )}
                    {member.links.website && (
                      <Link
                        href={member.links.website.startsWith('http') ? member.links.website : `https://${member.links.website}`}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                                   flex items-center justify-center
                                   hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <Globe className="w-4 h-4 text-text-primary" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
