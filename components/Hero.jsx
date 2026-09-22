'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-6xl mx-auto my-8'>
                
                {/* LEFT MAIN HERO */}
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-emerald-100 via-green-50 to-white backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[32px] xl:min-h-[420px] overflow-hidden group transition-all duration-500'>

                    <div className='p-6 sm:p-16 z-10'>
                        
                        {/* Badge */}
                        <div className='inline-flex items-center gap-3 bg-white/70 backdrop-blur-md text-emerald-700 pr-4 p-1.5 rounded-full text-xs sm:text-sm shadow-sm border border-white/50 transition-all duration-300 hover:shadow-md'>
                            <span className='bg-emerald-600 px-3 py-1 rounded-full text-white text-xs tracking-wide'>
                                NEWS
                            </span>
                            Free Shipping on Orders Above $50!
                            <ChevronRightIcon className='group-hover:ml-2 transition-all duration-300' size={16} />
                        </div>

                        {/* Heading */}
                        <h2 className='text-3xl sm:text-5xl leading-[1.15] my-5 font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-500 bg-clip-text text-transparent max-w-xs sm:max-w-md'>
                            Gadgets you'll love. Prices you'll trust.
                        </h2>

                        {/* Price */}
                        <div className='text-slate-700 text-sm font-medium mt-6 sm:mt-10'>
                            <p className='uppercase tracking-wider text-xs text-slate-500'>
                                Starts from
                            </p>
                            <p className='text-4xl font-semibold mt-1'>
                                {currency}4.90
                            </p>
                        </div>

                        {/* Button */}
                        <button className='relative overflow-hidden bg-slate-900 text-white text-sm font-medium py-3 px-8 sm:py-5 sm:px-12 mt-6 sm:mt-12 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300'>
                            LEARN MORE
                        </button>

                    </div>

                    {/* Hero Image */}
                    <Image
                        className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm drop-shadow-2xl transition-transform duration-500 group-hover:scale-105'
                        src={assets.hero_model_img}
                        alt=""
                        priority
                    />
                </div>

                {/* RIGHT SIDE CARDS */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-6 w-full xl:max-w-sm text-sm text-slate-600'>
                    
                    {/* Card 1 */}
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-orange-100 via-white to-orange-50 border border-white/40 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] rounded-[28px] p-6 px-8 group hover:-translate-y-1 transition-all duration-300'>
                        <div>
                            <p className='text-3xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 to-orange-500 bg-clip-text text-transparent max-w-40'>
                                Best products
                            </p>
                            <p className='flex items-center gap-1 mt-4 font-medium text-slate-600'>
                                View more 
                                <ArrowRightIcon className='group-hover:ml-2 transition-all duration-300' size={18} />
                            </p>
                        </div>
                        <Image className='w-32 drop-shadow-xl transition-transform duration-500 group-hover:scale-105' src={assets.hero_product_img1} alt="" />
                    </div>

                    {/* Card 2 */}
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-white/40 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] rounded-[28px] p-6 px-8 group hover:-translate-y-1 transition-all duration-300'>
                        <div>
                            <p className='text-3xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 to-blue-500 bg-clip-text text-transparent max-w-40'>
                                20% discounts
                            </p>
                            <p className='flex items-center gap-1 mt-4 font-medium text-slate-600'>
                                View more 
                                <ArrowRightIcon className='group-hover:ml-2 transition-all duration-300' size={18} />
                            </p>
                        </div>
                        <Image className='w-32 drop-shadow-xl transition-transform duration-500 group-hover:scale-105' src={assets.hero_product_img2} alt="" />
                    </div>

                </div>
            </div>

            <CategoriesMarquee />
        </div>
    )
}

export default Hero