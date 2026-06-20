'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowUpRight, Calendar } from 'lucide-react'

interface Outcome {
  label: string
  value: string
}

interface Project {
  id: string
  title: string
  category: string
  image: string
  link: string
  year?: string
  description?: string
  tags?: string[]
  outcomes?: Outcome[]
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
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
              className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-3xl glass-card pointer-events-auto"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center
                           bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20
                           border border-black/5 dark:border-white/10 transition-colors"
                aria-label="Close project details"
              >
                <X className="w-4 h-4 text-text-primary" />
              </button>

              {/* Hero image */}
              <div className="relative w-full h-52 md:h-72 rounded-t-3xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <p className="text-accent-blue font-mono font-bold tracking-widest uppercase text-[0.65rem] mb-1">
                    {project.category}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-7">

                {/* Meta row */}
                <div className="flex items-center gap-4 text-text-muted text-sm">
                  {project.year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-text-secondary leading-relaxed text-sm md:text-base font-light">
                    {project.description}
                  </p>
                )}

                {/* Outcomes */}
                {project.outcomes && project.outcomes.length > 0 && (
                  <div>
                    <p className="text-xs font-mono font-bold tracking-widest uppercase text-text-muted mb-3">
                      Key outcomes
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {project.outcomes.map((o) => (
                        <div
                          key={o.label}
                          className="rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center"
                        >
                          <p className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight">
                            {o.value}
                          </p>
                          <p className="text-[0.65rem] text-text-muted mt-0.5 uppercase tracking-wider font-mono">
                            {o.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech tags */}
                {project.tags && project.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-mono font-bold tracking-widest uppercase text-text-muted mb-3">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium border border-black/5 dark:border-white/10
                                     bg-black/5 dark:bg-white/5 text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue
                               hover:text-text-primary transition-colors"
                  >
                    View live project <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
