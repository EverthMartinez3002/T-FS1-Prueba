FROM node:20

WORKDIR /app

# Copiamos sólo definición de dependencias
COPY package.json package-lock.json ./

# Instalamos TODAS las dependencias (incluye opcionales)
RUN npm install

# Copiamos el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
