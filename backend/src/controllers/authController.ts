import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { AuthRequest } from "../middleware/authMiddleware";
import { JWT_SECRET } from "../config";

// Caminho para o nosso "banco de dados" JSON
const dbPath = path.resolve(__dirname, "../../db.json");

// Função para ler todo o banco de dados
const readDatabase = (): any => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir ou houver erro, retorna uma estrutura padrão
    return { users: [], products: [] };
  }
};

// Função para escrever no banco de dados
const writeDatabase = (data: any): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça nome, email e senha." });
  }

  const db = readDatabase();
  const userExists = db.users.find((user: any) => user.email === email);

  if (userExists) {
    return res
      .status(400)
      .json({ message: "Usuário já cadastrado com este email." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id:
      db.users.length > 0 ? Math.max(...db.users.map((u: any) => u.id)) + 1 : 1,
    name,
    email,
    password: hashedPassword,
    role: "user", // Adiciona a função padrão para novos usuários
    cart: [],
  };

  db.users.push(newUser);
  writeDatabase(db);

  res.status(201).json({
    message: "Usuário registrado com sucesso!",
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça email e senha." });
  }

  const db = readDatabase();
  const user = db.users.find((user: any) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Credenciais inválidas." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Credenciais inválidas." });
  }

  // O segredo do JWT agora é importado do arquivo de configuração
  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login bem-sucedido!",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

// @desc    Obter o perfil do usuário
// @route   GET /api/users/profile
// @access  Privado
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  const db = readDatabase();
  // O req.user é adicionado pelo middleware 'protect'
  const user = db.users.find((u: any) => u.id === req.user?.id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "Usuário não encontrado." });
  }
};
