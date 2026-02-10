import React from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-serif p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-stone-800 mb-8">
          Carrinho de Compras
        </h1>
        <div className="bg-white shadow-elegant rounded-sm p-8">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6">
            Resumo do Pedido
          </h2>
          <div className="py-4 border-b border-stone-200">
            <p className="text-stone-600">Nenhum item no carrinho ainda.</p>
          </div>
          <div className="mt-6 text-right">
            <p className="text-lg text-stone-700">
              Subtotal: <span className="font-bold text-stone-800">$0.00</span>
            </p>
            <p className="text-lg text-stone-700">
              Frete: <span className="font-bold text-stone-800">$0.00</span>
            </p>
            <p className="text-2xl font-bold text-stone-800 mt-2">
              Total: <span className="text-amber-800">$0.00</span>
            </p>
          </div>
          <div className="mt-8 text-right">
            <Link to="/payment">
              <button className="bg-amber-800 text-white px-10 py-3 font-sans font-medium rounded-sm hover:bg-amber-900 transition-colors">
                Ir para Pagamento
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
