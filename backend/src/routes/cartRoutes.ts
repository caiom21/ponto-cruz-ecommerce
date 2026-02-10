import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Aplicamos o middleware 'protect' a todas as rotas deste arquivo
// Apenas usuários logados poderão acessá-las
router.use(protect);

router
  .route("/")
  .get(getCart) // Obter o carrinho
  .post(addToCart); // Adicionar item ao carrinho

router
  .route("/:productId")
  .delete(removeFromCart) // Remover item do carrinho
  .put(updateCartItem); // Atualizar quantidade do item

export default router;
