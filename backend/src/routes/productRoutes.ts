import express from 'express';
import { getProducts, getProductById } from '../controllers/productController';

const router = express.Router();

// Rota para obter todos os produtos
// GET /api/products
router.get('/', getProducts);

// Rota para obter um produto específico pelo ID
// GET /api/products/:id
router.get('/:id', getProductById);

export default router;
