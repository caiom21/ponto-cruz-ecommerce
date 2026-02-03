export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  isCustomizable: boolean; // Se pode ser personalizado/encomenda
  availableColors?: string[];
  availableFabrics?: string[];
}

export interface CustomOrder {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  customDetails: string;
  selectedColor: string;
  selectedFabric: string;
  size: string;
  specialInstructions?: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
}