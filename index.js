const express = require('express');
const multer = require('multer');
const { removeBackground } = require('@imgly/background-removal-node'); // ou sua lib específica
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware para log de todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota de health check (obrigatória para o Render)
app.get('/', (req, res) => {
  res.send('API de Remoção de Fundo está rodando!');
});

// Sua rota principal
app.post('/remove-background', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    console.log('Processando imagem:', req.file.originalname);
    
    // Aqui vai sua lógica de remoção de fundo
    // const result = await removeBackground(req.file.buffer);
    
    res.set('Content-Type', 'image/png');
    res.send(result); // ou req.file.buffer para teste
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
});

// CRUCIAL: Use 0.0.0.0 e a PORT do ambiente
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando em http://0.0.0.0:${port}`);
  console.log(`🌍 Acesse: http://localhost:${port} (local) ou via URL do Render`);
});
