import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Permite que o servidor entenda JSON

// Rotas
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do Ponto Cruz E-commerce está no ar! 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
