import { API_URL } from "../services/api";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    console.log("Fetching cart with token:", token); // Log para depuração
    if (!token) {
      setLoading(false);
      setCartItems([]); // Limpa o carrinho se não houver token
      return;
    }

    setLoading(true);
    setError(null); // Limpa erros anteriores
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetch cart response status:", response.status); // Log do status
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch cart:", errorText); // Log do erro
        throw new Error("Falha ao buscar o carrinho.");
      }
      const data = await response.json();
      console.log("Cart data fetched:", data); // Log dos dados
      setCartItems(data);
    } catch (err: any) {
      console.error("Error in fetchCart:", err); // Log da exceção
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [localStorage.getItem("token")]); // Dependência do token

  const apiRequest = async (url: string, options: RequestInit) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado.");

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha na operação do carrinho.");
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    }

    // Após qualquer modificação, busca o carrinho atualizado para garantir consistência
    await fetchCart();
  };

  const addToCart = async (productId: number, quantity: number) => {
    await apiRequest(`${API_URL}/api/cart`, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeFromCart(productId);
    } else {
      await apiRequest(`${API_URL}/api/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: newQuantity }),
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    await apiRequest(`${API_URL}/api/cart/${productId}`, {
      method: "DELETE",
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    loading,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
