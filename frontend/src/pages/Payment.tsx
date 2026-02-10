import React from 'react';

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-serif p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-stone-800 mb-8">Pagamento</h1>
        <div className="bg-white shadow-elegant rounded-sm p-8">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6">Detalhes do Pagamento</h2>
          
          <form>
            <div className="mb-6">
              <label htmlFor="cardNumber" className="block text-stone-700 mb-2 font-sans text-sm">Número do Cartão</label>
              <input type="text" id="cardNumber" className="w-full px-4 py-3 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="**** **** **** ****" />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="expiryDate" className="block text-stone-700 mb-2 font-sans text-sm">Data de Validade</label>
                <input type="text" id="expiryDate" className="w-full px-4 py-3 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="MM/AA" />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-stone-700 mb-2 font-sans text-sm">CVV</label>
                <input type="text" id="cvv" className="w-full px-4 py-3 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="***" />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="cardName" className="block text-stone-700 mb-2 font-sans text-sm">Nome no Cartão</label>
              <input type="text" id="cardName" className="w-full px-4 py-3 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Nome completo" />
            </div>

            <button type="submit" className="w-full bg-amber-800 text-white px-10 py-4 font-sans font-medium rounded-sm hover:bg-amber-900 transition-colors">
              Pagar Agora
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
