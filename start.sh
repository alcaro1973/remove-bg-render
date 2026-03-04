#!/bin/bash

echo "🚀 Iniciando aplicação..."
echo "📡 PORT: $PORT"
echo "🐍 Python: $(python --version)"
echo "📦 Node: $(node --version)"

# Iniciar o servidor Node.js
node server.js
