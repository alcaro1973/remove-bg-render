FROM python:3.11-slim

# Instalar Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY requirements.txt ./

# Instalar dependências
RUN npm install
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o resto da aplicação
COPY . .

# Dar permissão ao script de start
RUN chmod +x start.sh

# Porta que será usada (o Render substituirá pela variável PORT)
EXPOSE 3000

# Usar script de start
CMD ["./start.sh"]
