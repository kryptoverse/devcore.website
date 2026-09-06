'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

const portfolioCategories = [
  { label: 'AI & Automation', href: '#ai-projects', dot: 'bg-green' },
  { label: 'Android & iOS Apps', href: '#app-projects', dot: 'bg-purple' },
  { label: 'Web & CRM', href: '#fullstack-projects', dot: 'bg-pink' },
  { label: 'Client Websites', href: '#client-websites', dot: 'bg-orange' },
  { label: 'Blockchain & Web3', href: '#blockchain-projects', dot: 'bg-blue' },
]

function PortfolioIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const bottomAnimation = (index: number) => ({
    initial: { y: 30, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 },
    transition: { duration: 0.6, delay: 0.2 + index * 0.1 },
  })

  return (
    <section id='work'>
      <div ref={ref} className='2xl:pt-20 pt-11'>
        <div className='container'>
          <div className='flex flex-col items-center gap-8 text-center border-t border-dark_black/10 dark:border-white/10 pt-12 md:pt-16'>
            <motion.p
              {...bottomAnimation(0)}
              className='text-xs tracking-[0.2em] uppercase font-medium text-dark_black/60 dark:text-white/60 border border-dark_black/20 dark:border-white/20 rounded-full py-2 px-5'>
              Portfolio
            </motion.p>

            <div className='max-w-2xl'>
              <h2>
                <TextGenerateEffect words='Selected work, grouped by what it' duration={0.5} />
                <TextGenerateEffect
                  words='actually does'
                  delay={1.2}
                  className='italic font-normal instrument-font'
                />
              </h2>
            </div>

            <motion.p
              {...bottomAnimation(1)}
              className='max-w-xl text-dark_black/60 dark:text-white/60'>
              Everything below is shipped work — AI and automation systems, mobile
              apps, web platforms and CRMs, client websites, and Web3 products.
              Jump to the category you care about.
            </motion.p>

            <motion.div
              {...bottomAnimation(2)}
              className='flex flex-wrap justify-center gap-3'>
              {portfolioCategories.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='group flex items-center gap-2 text-sm border border-dark_black/20 dark:border-white/20 rounded-full py-2 px-4 hover:bg-dark_black hover:text-white hover:border-dark_black dark:hover:bg-white dark:hover:text-dark_black dark:hover:border-white transition-colors duration-200'>
                  <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioIntro
