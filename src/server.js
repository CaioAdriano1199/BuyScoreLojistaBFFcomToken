import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/cliente.route.js";
import pontoRoutes from "./routes/ponto.route.js";
import loginRoutes from "./routes/login.route.js";
import produtoRoutes from "./routes/produto.route.js";
import enderecoRoutes from "./routes/endereco.route.js";
import compraRoutes from "./routes/compra.route.js";
import comercioRoutes from "./routes/comercio.route.js";

const app = express();

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/compra", compraRoutes);
app.use("/ponto", pontoRoutes);
app.use("/cliente", clienteRoutes);
app.use("/login", loginRoutes);
app.use("/produto", produtoRoutes);
app.use("/endereco", enderecoRoutes);
app.use("/comercio", comercioRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota para debug
app.get('/test', (req, res) => {
  res.json({ message: 'BFF funcionando!', port: 3000 });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`BFF rodando na porta ${PORT}`);
  console.log(`Servidor acessível em http://localhost:${PORT}`);
});
