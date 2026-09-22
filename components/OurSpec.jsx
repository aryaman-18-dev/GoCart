import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    return (
        <section className='px-6 py-12 sm:py-4 my-16 max-w-6xl mx-auto'>
            
            {/* Section Title */}
            <Title
                visibleButton={false}
                title='Our Specifications'
                description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free."
            />

            {/* Specs Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20'>

                {ourSpecsData.map((spec, index) => (
                    <div
                        key={index}
                        className='relative h-48 px-6 py-8 flex flex-col items-center justify-center w-full text-center rounded-2xl border border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm group hover:shadow-lg hover:scale-[1.03] transition-all duration-300'
                        style={{ borderColor: spec.accent + '30' }}
                    >
                        {/* Icon */}
                        <div
                            className='absolute -top-6 flex items-center justify-center rounded-full w-12 h-12 text-white shadow-md group-hover:scale-110 transition-transform duration-300'
                            style={{ backgroundColor: spec.accent }}
                        >
                            <spec.icon size={24} />
                        </div>

                        {/* Title & Description */}
                        <h3 className='text-slate-800 font-semibold text-lg mt-2'>{spec.title}</h3>
                        <p className='text-slate-600 text-sm mt-3'>{spec.description}</p>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default OurSpecs