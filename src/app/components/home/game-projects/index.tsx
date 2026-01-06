'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

function GameProjects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const [gameProjectsList, setGameProjectsList] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')

                const data = await res.json()
                setGameProjectsList(data?.gameProjectsList)
            } catch (error) {
                console.error('Error fetching game projects:', error)
            }
        }
        fetchData()
    }, [])

    const bottomAnimation = (index: number) => ({
        initial: { y: 50, opacity: 0 },
        animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
        transition: { duration: 0.8, delay: 0.4 + index * 0.2 },
    })

    return (
        <section id='game-projects'>
            <div ref={ref} className='2xl:py-20 py-11 bg-pale-yellow dark:bg-dark_black'>
                <div className='container'>
                    <div className='flex flex-col justify-center items-center gap-10 md:gap-20'>
                        <div className='max-w-2xl text-center'>
                            <h2>
                                <TextGenerateEffect words="Bringing immersive worlds to life through" duration={0.5} />
                                <TextGenerateEffect
                                    words="game development"
                                    delay={1.2}
                                    className="italic font-normal instrument-font"
                                />
                            </h2>
                            <p className='text-dark_black/60 dark:text-white/60 mt-4'>
                                Featured Projects
                            </p>
                        </div>
                        <div className='grid md:grid-cols-2 gap-x-6 gap-y-8 w-full'>
                            {gameProjectsList?.map((project: any, index: number) => (
                                <motion.div
                                    key={index}
                                    className='flex flex-col gap-6'
                                    {...bottomAnimation(index)}
                                >
                                    <div className='relative overflow-hidden rounded-2xl aspect-video bg-black'>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${project.videoId}`}
                                            title={project.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className='absolute top-0 left-0 w-full h-full'
                                        ></iframe>
                                    </div>

                                    <div className='flex flex-col items-start gap-4'>
                                        <h3 className='text-2xl'>
                                            {project.title}
                                        </h3>
                                        <div className='flex gap-3 flex-wrap'>
                                            {project.tag?.map((tag: any, idx: number) => (
                                                <p
                                                    key={idx}
                                                    className='text-sm border border-dark_black/10 dark:border-white/50 w-fit py-1.5 px-4 rounded-full hover:bg-dark_black hover:text-white dark:hover:bg-white dark:hover:text-dark_black transition-colors'
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

export default GameProjects
