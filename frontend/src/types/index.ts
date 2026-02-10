export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string; // Opcional, pois não vem em todos os lugares
  category: string;
  size: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}
