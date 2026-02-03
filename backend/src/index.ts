// Adicionar no início do arquivo
import express from 'express';
import { networkInterfaces } from 'os';

const app = express();  // Declare app here
const PORT = parseInt(process.env.PORT || '3000', 10);  // Parse to number

// Function to get local IP
function getLocalIP(): string {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';  // Fallback
}

const localIP = getLocalIP();  // Call the function here
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesso local: http://localhost:${PORT}`);
  console.log(`📱 Acesso na rede: http://${localIP}:${PORT}`);
  console.log(`🔗 API disponível em: http://${localIP}:${PORT}/api/products`);
});