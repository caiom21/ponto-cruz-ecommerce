export const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const addToCart = async (productId: number) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  });
  return response.json();
};

export default {
  fetchProducts,
  addToCart,
  // Adicione mais funções conforme necessário
};
// Adicione mais funções conforme necessário