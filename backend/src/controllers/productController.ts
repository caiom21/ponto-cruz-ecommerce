import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Caminho para o nosso "banco de dados" JSON
const dbPath = path.resolve(__dirname, "../../db.json");

// Função para ler o banco de dados
const readDatabase = (): any => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir, retorna um objeto vazio
    return { users: [], products: [] };
  }
};

// Função para escrever no banco de dados
const writeDatabase = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Controller para buscar todos os produtos
export const getProducts = (req: Request, res: Response) => {
  const { products } = readDatabase();
  res.json(products);
};

// Controller para buscar um produto pelo ID
export const getProductById = (req: Request, res: Response) => {
  const { products } = readDatabase();
  const product = products.find(
    (p: any) => p.id === parseInt(req.params.id, 10),
  );

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado." });
  }
};

// @desc    Criar um novo produto
// @route   POST /api/products
// @access  Admin
export const createProduct = (req: Request, res: Response) => {
  const { name, price, image, description, category, size } = req.body;

  if (!name || !price || !image || !description || !category || !size) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  const db = readDatabase();

  const newProduct = {
    id:
      db.products.length > 0
        ? Math.max(...db.products.map((p: any) => p.id)) + 1
        : 1,
    name,
    price,
    image,
    description,
    category,
    size,
  };

  db.products.push(newProduct);
  writeDatabase(db);

  res.status(201).json(newProduct);
};

// @desc    Atualizar um produto
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  const { name, price, image, description, category, size } = req.body;

  const db = readDatabase();
  const productIndex = db.products.findIndex((p: any) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Produto não encontrado." });
  }

  const updatedProduct = {
    ...db.products[productIndex],
    name: name || db.products[productIndex].name,
    price: price || db.products[productIndex].price,
    image: image || db.products[productIndex].image,
    description: description || db.products[productIndex].description,
    category: category || db.products[productIndex].category,
    size: size || db.products[productIndex].size,
  };

  db.products[productIndex] = updatedProduct;
  writeDatabase(db);

  res.json(updatedProduct);
};

// @desc    Deletar um produto
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);

  const db = readDatabase();
  const initialLength = db.products.length;

  db.products = db.products.filter((p: any) => p.id !== productId);

  if (db.products.length < initialLength) {
    writeDatabase(db);
    res.json({ message: "Produto removido com sucesso." });
  } else {
    res.status(404).json({ message: "Produto não encontrado." });
  }
};
