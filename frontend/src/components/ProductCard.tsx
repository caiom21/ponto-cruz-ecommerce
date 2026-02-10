import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, 1); // Adiciona uma unidade do produto
  };

  return (
    <div
      className="product-card bg-white dark:bg-stone-800 rounded-sm overflow-hidden shadow-elegant flex flex-col fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden h-80">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 text-xs font-sans font-medium">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans mb-4">
          Tamanho: {product.size}
        </p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-amber-800 dark:text-amber-500">
              R${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-800 text-white px-4 py-2 font-sans text-sm font-medium rounded-sm hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
            >
              Adicionar ao Carrinho
            </button>
            <Link to="/payment" className="w-full">
              <button className="w-full bg-stone-700 text-white px-4 py-2 font-sans text-sm font-medium rounded-sm hover:bg-stone-800 dark:bg-stone-600 dark:hover:bg-stone-500 transition-colors">
                Comprar Agora
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
