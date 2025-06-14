# Use a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

COPY . .

# Instala as dependências e constroi o projeto
RUN npm install && npm run build

# Expõe a porta em que o Next.js irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]