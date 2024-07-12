# Usa una imagen base de Node.js
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "server.js"]
