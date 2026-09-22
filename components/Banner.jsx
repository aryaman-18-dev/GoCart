'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {

    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
        toast.success('Coupon copied to clipboard!');
        navigator.clipboard.writeText('NEW20');
    };

    return isOpen && (
        <div className="w-full px-6 py-0.5 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 shadow-lg">
            <div className='flex items-center justify-between max-w-6xl  mx-auto'>
                <p className="font-medium tracking-wide"> Get <span className="font-semibold">20% OFF</span> on Your First Order!</p>
                <div className="flex items-center space-x-6">
                    <button onClick={handleClaim} type="button" className="hidden max-sm:hidden sm:inline-flex items-center justify-center px-6 py-2 text-xs sm:text-sm font-medium text-slate-900 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">Claim Offer</button>
                    <button onClick={() => setIsOpen(false)} type="button" className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#fff" />
                            <rect x="12.533" y="13.915" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.533 13.915)" fill="#fff" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};