import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { readDatabase } from "../utils/db"; // Importa a função de ler o DB

// Estendemos a interface Request do Express para incluir a propriedade 'user'
export interface AuthRequest extends Request {
  user?: { id: number };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  console.log("--- Middleware 'protect' ativado ---");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Cabeçalho de autorização encontrado.");
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token extraído:", token);

      console.log("Verificando o token com o segredo...");
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
      console.log("Token verificado com sucesso. Decodificado:", decoded);

      req.user = { id: decoded.id };
      console.log("Usuário adicionado à requisição. Chamando next()...");
      return next(); // Passa para a próxima função e encerra a execução aqui
    } catch (error) {
      console.error(
        "--- ERRO no middleware 'protect': Token inválido ---",
        error,
      );
      return res.status(401).json({ message: "Não autorizado, token falhou." });
    }
  }

  console.error(
    "--- ERRO no middleware 'protect': Sem token ou cabeçalho de autorização ---",
  );
  res.status(401).json({ message: "Não autorizado, sem token." });
};

// Novo middleware para verificar se o usuário é um administrador
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("--- Middleware 'admin' ativado ---");
  if (req.user) {
    const db = readDatabase();
    const user = db.users.find((u: any) => u.id === req.user!.id);

    if (user && user.role === "admin") {
      console.log("Usuário é um administrador. Acesso permitido.");
      next();
    } else {
      console.error(
        "--- ERRO no middleware 'admin': Usuário não é administrador ---",
      );
      res
        .status(403)
        .json({
          message: "Acesso negado. Requer privilégios de administrador.",
        });
    }
  } else {
    // Isso não deve acontecer se 'protect' for usado antes de 'admin'
    console.error(
      "--- ERRO no middleware 'admin': Nenhum usuário na requisição ---",
    );
    res.status(401).json({ message: "Não autorizado." });
  }
};
