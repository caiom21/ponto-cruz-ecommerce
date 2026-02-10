const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Um banco de dados de usuários simulado
const users = [
  { id: 1, username: 'user', password: 'password123' }
];

// Endpoint de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log(`Tentativa de login com usuário: ${username}`);

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    console.log('Login bem-sucedido!');
    // Em um aplicativo real, você geraria um token JWT (JSON Web Token)
    res.json({
      success: true,
      message: 'Login bem-sucedido!',
      token: 'fake-jwt-token-for-demo-purposes', // Token simulado
      user: { id: user.id, username: user.username }
    });
  } else {
    console.log('Falha no login: credenciais inválidas.');
    res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
  }
});

// Endpoint de cadastro
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    console.log(`Falha no cadastro: usuário '${username}' já existe.`);
    return res.status(409).json({ success: false, message: 'Este nome de usuário já está em uso.' });
  }

  const newUser = {
    id: users.length + 1, // ID simples para o exemplo
    username,
    password
  };

  users.push(newUser);
  console.log(`Novo usuário cadastrado:`, newUser);
  console.log(`Lista de usuários atualizada:`, users);

  res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
});


app.listen(port, () => {
  console.log(`Servidor backend simulado rodando em http://localhost:${port}`);
});