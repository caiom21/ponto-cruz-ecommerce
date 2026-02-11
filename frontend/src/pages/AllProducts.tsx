import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/sections/Header";
import SkeletonProductCard from "../components/SkeletonProductCard";
import { API_URL } from "../services/api";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  size: string;
}

const AllProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Falha ao buscar os produtos.");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        const uniqueCategories = [
          "All",
          ...Array.from(new Set(data.map((p) => p.category))),
        ];
        setCategories(uniqueCategories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-stone-50 dark:bg-stone-900 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded w-3/4 mx-auto mt-4 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonProductCard key={index} />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="bg-stone-50 dark:bg-stone-900 min-h-screen flex justify-center items-center">
          <p className="text-lg text-red-500 dark:text-red-400">
            Erro: {error}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-stone-50 dark:bg-stone-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-200 mb-4 font-serif">
              Todos os Produtos
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 font-sans font-light max-w-2xl mx-auto">
              Explore nossa coleção completa de tesouros bordados.
            </p>
          </div>

          <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm md:text-base font-sans rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-amber-800 text-white"
                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AllProductsPage;
