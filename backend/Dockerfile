# Etapa de construção
FROM node:18-alpine AS builder

ARG APP_NAME=backend

WORKDIR /app

# Copiar arquivos de origem e dependências
COPY ./src ./src
COPY package*.json ./

# Instalar dependências e construir o projeto
RUN npm install && npm run build

# Etapa de execução
FROM node:18-alpine

ARG APP_NAME=backend

# Copiar os arquivos construídos da etapa anterior
COPY --from=builder /app .

# Expor a porta (caso necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start:prod" ]