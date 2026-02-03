import sqlite3 from 'sqlite3';
import { Product, CustomOrder } from './models/Product';

const db = new sqlite3.Database('./database.sqlite');

// Criar tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT,
      imageUrl TEXT,
      stock INTEGER DEFAULT 0,
      isCustomizable INTEGER DEFAULT 0,
      availableColors TEXT,
      availableFabrics TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      productId TEXT,
      customerName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      phone TEXT NOT NULL,
      customDetails TEXT,
      selectedColor TEXT,
      selectedFabric TEXT,
      size TEXT,
      specialInstructions TEXT,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (productId) REFERENCES products(id)
    )
  `);

  // Inserir dados de exemplo
  const products: Omit<Product, 'availableColors' | 'availableFabrics'>[] = [
    {
      id: '1',
      name: 'Kit Ponto Cruz - Flores',
      description: 'Kit completo para bordar lindas flores',
      price: 45.90,
      category: 'Kits Completos',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Flores+Ponto+Cruz',
      stock: 15,
      isCustomizable: true
    },
    {
      id: '2',
      name: 'Kit Ponto Cruz - Animais',
      description: 'Diversos modelos de animais para bordar',
      price: 39.90,
      category: 'Kits Completos',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Animais+Ponto+Cruz',
      stock: 10,
      isCustomizable: true
    },
    {
      id: '3',
      name: 'Linhas Anchor - Caixa com 50 cores',
      description: 'Caixa completa com 50 cores diferentes',
      price: 89.90,
      category: 'Materiais',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Linhas+Anchor',
      stock: 25,
      isCustomizable: false
    }
  ];

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO products 
    (id, name, description, price, category, imageUrl, stock, isCustomizable) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  products.forEach(product => {
    stmt.run(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.imageUrl,
      product.stock,
      product.isCustomizable ? 1 : 0
    );
  });

  stmt.finalize();
});

export default db;