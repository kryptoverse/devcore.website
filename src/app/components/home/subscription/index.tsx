"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect';

function Subscription() {
  const [startupPlanList, setstartupPlanList] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setstartupPlanList(data?.startupPlanList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <section id='pricing'>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col gap-10 md:gap-20'>
            <div className='max-w-25 text-center mx-auto'>
              <h2>
                <TextGenerateEffect words="Pick the plan that fits your" />
                <TextGenerateEffect
                  words="startup"
                  delay={1.2}
                  className="italic font-normal instrument-font"
                />
              </h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {startupPlanList?.map((items: any, index: number) => (
                <div
                  className={`${items.plan_bg_color} p-6 md:p-8 rounded-2xl flex flex-col justify-between`}
                  key={index}>
                  <div className='flex flex-col gap-6'>
                    {/* Plan Header */}
                    <div className='flex flex-col gap-3'>
                      <p className='py-2 px-4 bg-dark_black w-fit text-white rounded-full text-sm font-medium'>
                        {items.plan_name}
                      </p>
                      <h3 className={`${items.text_color} text-xl font-semibold`}>
                        {items.plan_subtitle}
                      </h3>
                      <p className={`text-${items.descp_color} text-sm italic`}>
                        {items.plan_tagline}
                      </p>
                      <p className={`text-${items.descp_color}`}>
                        {items.plan_descp}
                      </p>
                    </div>

                    {/* Features Section */}
                    <div className='flex flex-col gap-4'>
                      <p className={`${items.text_color} font-semibold text-sm uppercase tracking-wide`}>
                        What you get
                      </p>
                      <ul className='flex flex-col gap-3'>
                        {items.plan_feature?.map((feature: any, idx: number) => {
                          return (
                            <li key={idx} className='flex items-start gap-3'>
                              <Image
                                src={items.icon_img}
                                alt='check icon'
                                width={20}
                                height={20}
                                className='mt-0.5 flex-shrink-0'
                              />
                              <p className={`${items.text_color} text-sm`}>{feature}</p>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* Best For Section */}
                    {items.best_for && items.best_for.length > 0 && (
                      <div className='flex flex-col gap-3'>
                        <p className={`${items.text_color} font-semibold text-sm uppercase tracking-wide`}>
                          Best for
                        </p>
                        <ul className='flex flex-col gap-2'>
                          {items.best_for?.map((item: any, idx: number) => (
                            <li key={idx} className={`text-${items.descp_color} text-sm flex items-center gap-2`}>
                              <span className={`${items.text_color}`}>•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className='mt-8'>
                    <Link
                      href='/chat'
                      className='group text-dark_black font-medium bg-white rounded-full flex items-center justify-center gap-4 py-3 px-6 w-full hover:bg-dark_black hover:text-white border border-dark_black transition-all duration-200'>
                      <span className='group-hover:translate-x-2 transform transition-transform duration-200 ease-in-out'>
                        Let's Chat
                      </span>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 32 32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='group-hover:translate-x-1 transition-all duration-200 ease-in-out'>
                        <path
                          d='M11.832 11.3335H20.1654M20.1654 11.3335V19.6668M20.1654 11.3335L11.832 19.6668'
                          stroke='currentColor'
                          strokeWidth='1.42857'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscription
