import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Interface para garantir que nossa requisição tenha o objeto 'user'
interface AuthRequest extends Request {
  user?: { id: number };
}

const dbPath = path.resolve(__dirname, "../../db.json");

// Funções auxiliares para ler e escrever no banco de dados
const readDatabase = (): any => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { users: [], products: [] };
  }
};

const writeDatabase = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// @desc    Obter o carrinho do usuário
// @route   GET /api/cart
export const getCart = (req: AuthRequest, res: Response) => {
  const { users, products } = readDatabase();
  const user = users.find((u: any) => u.id === req.user?.id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  // Se o usuário não tiver um carrinho, retorna um array vazio
  if (!user.cart) {
    return res.json([]);
  }

  // Combina os dados do carrinho com os detalhes completos do produto
  const populatedCart = user.cart
    .map((item: { productId: number; quantity: number }) => {
      const product = products.find((p: any) => p.id === item.productId);
      // Retorna um objeto formatado com 'id' para alinhar com o frontend
      return product
        ? {
            id: product.id, // Garante que a propriedade 'id' esteja presente
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: item.quantity,
          }
        : null;
    })
    .filter(Boolean); // Remove itens nulos caso o produto tenha sido deletado

  res.json(populatedCart);
};

// @desc    Adicionar um item ao carrinho
// @route   POST /api/cart
export const addToCart = (req: AuthRequest, res: Response) => {
  console.log("--- Iniciando addToCart ---");
  console.log("Request Body:", req.body);

  const { productId, quantity } = req.body;

  if (
    typeof productId !== "number" ||
    typeof quantity !== "number" ||
    quantity <= 0
  ) {
    console.error("Erro de validação: productId ou quantity inválido.");
    return res
      .status(400)
      .json({ message: "ID do produto ou quantidade inválida." });
  }

  const db = readDatabase();
  const userIndex = db.users.findIndex((u: any) => u.id === req.user?.id);

  // Garante que db.products seja um array, mesmo que não exista no db.json
  const products = db.products || [];

  if (userIndex === -1) {
    console.error(
      "Usuário não encontrado no banco de dados. ID do usuário da requisição:",
      req.user?.id,
    );
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  if (!products.some((p: any) => p.id === productId)) {
    console.error(
      "Produto não encontrado no banco de dados. ID do produto:",
      productId,
    );
    return res.status(404).json({ message: "Produto não encontrado." });
  }

  const user = db.users[userIndex];
  console.log("Usuário encontrado:", { id: user.id, email: user.email });

  if (!user.cart) {
    console.log(
      "Usuário não possui carrinho. Criando um novo array de carrinho.",
    );
    user.cart = [];
  }

  console.log("Carrinho antes da modificação:", JSON.stringify(user.cart));

  const itemIndex = user.cart.findIndex(
    (item: any) => item.productId === productId,
  );

  if (itemIndex > -1) {
    console.log(`Item (ID: ${productId}) já existe. Incrementando quantidade.`);
    user.cart[itemIndex].quantity += quantity;
  } else {
    console.log(`Adicionando novo item (ID: ${productId}) ao carrinho.`);
    user.cart.push({ productId, quantity });
  }

  console.log("Carrinho após modificação:", JSON.stringify(user.cart));

  try {
    writeDatabase(db);
    console.log("Banco de dados atualizado com sucesso.");
  } catch (error) {
    console.error("--- ERRO CRÍTICO AO ESCREVER NO BANCO DE DADOS ---", error);
    return res.status(500).json({ message: "Erro ao salvar o carrinho." });
  }

  console.log("--- Finalizando addToCart com sucesso ---");
  res.status(200).json(user.cart);
};

// @desc    Atualizar a quantidade de um item no carrinho
// @route   PUT /api/cart/:productId
export const updateCartItem = (req: AuthRequest, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const numericProductId = Number(productId);

  if (isNaN(numericProductId)) {
    return res.status(400).json({ message: "ID de produto inválido." });
  }
  if (typeof quantity !== "number" || quantity < 0) {
    return res.status(400).json({ message: "Quantidade inválida." });
  }

  const db = readDatabase();
  const userIndex = db.users.findIndex((u: any) => u.id === req.user?.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const user = db.users[userIndex];

  // Garante que o carrinho exista
  if (!user.cart) {
    return res.status(404).json({ message: "Carrinho não encontrado." });
  }

  const itemIndex = user.cart.findIndex(
    (item: any) => item.productId === numericProductId,
  );

  if (itemIndex === -1) {
    return res
      .status(404)
      .json({ message: "Item não encontrado no carrinho." });
  }

  if (quantity === 0) {
    // Se a quantidade for 0, remove o item
    user.cart.splice(itemIndex, 1);
  } else {
    // Senão, atualiza a quantidade
    user.cart[itemIndex].quantity = quantity;
  }

  writeDatabase(db);
  res.status(200).json(user.cart);
};

// @desc    Remover um item do carrinho
// @route   DELETE /api/cart/:productId
export const removeFromCart = (req: AuthRequest, res: Response) => {
  const { productId } = req.params;
  const numericProductId = Number(productId);

  if (isNaN(numericProductId)) {
    return res.status(400).json({ message: "ID de produto inválido." });
  }

  const db = readDatabase();
  const userIndex = db.users.findIndex((u: any) => u.id === req.user?.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const user = db.users[userIndex];

  // Garante que o carrinho exista
  if (!user.cart) {
    // Se não há carrinho, o item certamente não está lá.
    return res
      .status(404)
      .json({ message: "Item não encontrado no carrinho." });
  }

  const initialLength = user.cart.length;
  user.cart = user.cart.filter(
    (item: any) => item.productId !== numericProductId,
  );

  if (user.cart.length === initialLength) {
    return res
      .status(404)
      .json({ message: "Item não encontrado no carrinho." });
  }

  writeDatabase(db);
  res.status(200).json(user.cart);
};
