"use client"
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'
import { motion, AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// All client review screenshots live in /public/reviews (1.jpeg … 12.jpeg)
const REVIEW_IMAGES = Array.from({ length: 10 }, (_, i) => `/reviews/${i + 1}.jpeg`)

function CustomerStories() {
  // Index of the review currently expanded in the lightbox (null = closed)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + REVIEW_IMAGES.length) % REVIEW_IMAGES.length)),
    []
  )
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % REVIEW_IMAGES.length)),
    []
  )

  // Keyboard controls + body scroll lock while the lightbox is open
  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [activeIndex, close, showPrev, showNext])

  return (
    <section>
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div className="flex flex-col justify-center gap-10 md:gap-16">
            <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-3">
              <h2>
                <TextGenerateEffect words="What clients say about working" />
                <TextGenerateEffect
                  words="with me"
                  delay={1}
                  className="italic font-normal instrument-font"
                />
              </h2>
              <p className="text-dark_black/60 dark:text-white/60 max-w-md">
                Real conversations and feedback from clients. Tap any review to view it in full.
              </p>
            </div>

            {/* Masonry gallery — handles screenshots of different sizes gracefully */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
              {REVIEW_IMAGES.map((src, index) => (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                  className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-dark_black/10 dark:border-white/10 bg-dark_black/5 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple_blue"
                  aria-label={`Open client review ${index + 1}`}
                >
                  {/* Plain <img> keeps each screenshot's natural aspect ratio (sizes vary) */}
                  <img
                    src={src}
                    alt={`Client review ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded client review"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close review"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                showPrev()
              }}
              aria-label="Previous review"
              className="absolute left-2 sm:left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                showNext()
              }}
              aria-label="Next review"
              className="absolute right-2 sm:right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <ChevronRight size={26} />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-[88vh] max-w-[92vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={REVIEW_IMAGES[activeIndex]}
                alt={`Client review ${activeIndex + 1}`}
                className="h-auto max-h-[88vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {activeIndex + 1} / {REVIEW_IMAGES.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CustomerStories
