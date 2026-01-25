'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

function BlockchainProjects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const [blockchainProjectsList, setBlockchainProjectsList] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')

                const data = await res.json()
                setBlockchainProjectsList(data?.blockchainProjectsList)
            } catch (error) {
                console.error('Error fetching blockchain projects:', error)
            }
        }
        fetchData()
    }, [])

    const bottomAnimation = (index: number) => ({
        initial: { y: 50, opacity: 0 },
        animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
        transition: { duration: 0.8, delay: 0.4 + index * 0.2, },
    })

    return (
        <section id='blockchain-projects'>
            <div ref={ref} className='2xl:py-20 py-11'>
                <div className='container'>
                    <div className='flex flex-col justify-center items-center gap-10 md:gap-20'>
                        <div className='max-w-2xl text-center'>
                            <h2>
                                <TextGenerateEffect words="Building the future with" duration={0.5} />
                                <TextGenerateEffect
                                    words="blockchain technology"
                                    delay={1.2}
                                    className="italic font-normal instrument-font"
                                />
                            </h2>
                            <p className='text-dark_black/60 dark:text-white/60 mt-4'>
                                Featured Blockchain Projects
                            </p>
                        </div>
                        <div className='grid md:grid-cols-2 gap-x-6 gap-y-8 w-full'>
                            {blockchainProjectsList?.map((items: any, index: number) => (
                                <motion.div
                                    key={index}
                                    className='group flex flex-col gap-6 cursor-pointer'
                                    {...bottomAnimation(index)}
                                >
                                    <div className='relative overflow-hidden rounded-2xl aspect-[625/410]'>
                                        <Image
                                            src={items.image}
                                            alt={items.title}
                                            width={625}
                                            height={410}
                                            className='rounded-2xl w-full h-full object-cover'
                                        />
                                        {items.link && (
                                            <Link
                                                href={items.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='absolute top-0 left-0 bg-black/50 w-full h-full rounded-2xl hidden group-hover:flex'
                                            >
                                                <span className='flex justify-end p-5 w-full'>
                                                    <Icon
                                                        icon='icon-park-solid:circle-right-up'
                                                        width='50'
                                                        height='50'
                                                        style={{ color: '#fbfbfb' }}
                                                    />
                                                </span>
                                            </Link>
                                        )}
                                    </div>

                                    <div className='flex flex-col items-start gap-4'>
                                        <h3 className='group-hover:text-purple_blue text-2xl'>
                                            {items.title}
                                        </h3>
                                        <div className='flex gap-3 flex-wrap'>
                                            {items.tag?.map((tag: any, idx: number) => (
                                                <p
                                                    key={idx}
                                                    className='text-xs border border-dark_black/30 dark:border-white/40 w-fit py-1 px-3 rounded-full hover:bg-dark_black hover:text-white dark:hover:bg-white dark:hover:text-dark_black hover:border-dark_black dark:hover:border-white transition-colors'
                                                >
                                                    {tag}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlockchainProjects
