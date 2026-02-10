import React from "react";
import { products } from "../../data/products";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  // Exibe apenas os primeiros 3 produtos como destaque
  const featured = products.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-200">
          Coleção em Destaque
        </h2>
        <Link
          to="/products"
          className="hidden sm:inline-block bg-transparent text-stone-800 dark:text-stone-300 px-6 py-2 font-sans font-medium rounded-sm border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          Ver Todos
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      <div className="text-center mt-12 sm:hidden">
        <Link
          to="/products"
          className="bg-stone-800 text-white px-10 py-3 font-sans font-medium rounded-sm hover:bg-stone-900 dark:bg-stone-700 dark:hover:bg-stone-600 transition-colors"
        >
          Ver Todos os Produtos
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
