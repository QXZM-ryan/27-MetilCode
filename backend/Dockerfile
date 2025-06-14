# Etapa de construção
FROM node:18-alpine AS builder

ARG APP_NAME=backend

WORKDIR /app

# Copiar apenas arquivos necessários para o build
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/

# Instalar dependências e construir o projeto
RUN npm install
RUN npm run build

# Etapa de execução
FROM node:18-alpine

ARG APP_NAME=backend

# Copiar os arquivos construídos da etapa anterior
WORKDIR /app
COPY --from=builder /app .

# Expor a porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start" ] 