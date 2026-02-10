import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Rota para registrar um novo usuário
// URL final: POST /api/users/register
router.post("/register", registerUser);

// Rota para fazer login
// URL final: POST /api/users/login
router.post("/login", loginUser);

// Rota para obter o perfil do usuário
// URL final: GET /api/users/profile
router.get("/profile", protect, getUserProfile);

export default router;
