'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {

    const displayQuantity = 4
    const products = useSelector(state => state.product.list)

    return (
        <section className="px-6 py-12 sm:py-2 my-16 max-w-6xl mx-auto">
            
            {/* Section Title */}
            <Title
                title="Latest Products"
                description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
                href="/shop"
            />

            {/* Product Grid */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, displayQuantity)
                    .map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                            className="
                                transition-transform duration-300 ease-in-out
                                hover:scale-[1.03] hover:shadow-xl
                            "
                        />
                    ))}
            </div>
        </section>
    )
}

export default LatestProducts