const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // <-- ADICIONE ESTA LINHA

const app = express();

// <-- ADICIONE ESTE BLOCO
// Configuração CORS - permite requisições do seu frontend
app.use(cors({
    origin: '*', // Em produção, substitua * pelo seu domínio
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const upload = multer({ dest: 'uploads/' });
const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Criar pasta uploads se não existir
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Rota de health check - OBRIGATÓRIA para o Render
app.get('/', (req, res) => {
    res.json({ 
        status: 'online', 
        message: 'API de remoção de fundo está funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Sua rota de remoção de fundo
app.post('/remove-background', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada' });
        }

        console.log('📸 Processando imagem:', req.file.originalname);
        
        const inputPath = req.file.path;
        const outputPath = `uploads/${req.file.filename}_output.png`;

        // Chamar o script Python
        const pythonProcess = spawn('python', ['main.py', inputPath, outputPath]);

        pythonProcess.stderr.on('data', (data) => {
            console.error('🐍 Python stderr:', data.toString());
        });

        pythonProcess.on('close', (code) => {
            // Limpar arquivo de upload
            fs.unlink(inputPath, () => {});

            if (code !== 0) {
                console.error('❌ Python process failed with code:', code);
                return res.status(500).json({ error: 'Erro ao processar imagem' });
            }

            console.log('✅ Imagem processada com sucesso');

            // Enviar imagem processada
            res.sendFile(path.resolve(outputPath), () => {
                // Limpar arquivo de saída após enviar
                fs.unlink(outputPath, () => {});
            });
        });

    } catch (error) {
        console.error('❌ Erro:', error);
        res.status(500).json({ error: error.message });
    }
});

// CRÍTICO: Usar PORT do ambiente e 0.0.0.0
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌍 Acesse: http://localhost:${PORT} (local)`);
    console.log(`📦 Python versão: ${process.env.PYTHON_VERSION || 'não definido'}`);
});
