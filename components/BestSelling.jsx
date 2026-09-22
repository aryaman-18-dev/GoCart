'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellingProducts } from "@/lib/features/product/productSlice";
import Title from './Title'
import ProductCard from './ProductCard'

export default function BestSelling() {
  const dispatch = useDispatch();
  const { bestSelling, bestSellingLoading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchBestSellingProducts());
  }, [dispatch]);

  if (bestSellingLoading) 
    return <p className="text-center py-12 text-slate-500 font-medium">Loading best selling...</p>;

  return (
    <section className="px-6 py-12 sm:py-4 my-16 max-w-6xl mx-auto">
      
      {/* Section Title */}
      <Title 
        title='Best Selling' 
        description={`Showing ${bestSelling.length} of ${bestSelling.length} products`} 
        href='/shop' 
      />

      {/* Product Grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-12">
        {bestSelling.map((product, index) => (
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
  );
}