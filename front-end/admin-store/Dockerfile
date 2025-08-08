# ---- Etapa 1: build de Angular ----
FROM node:20-alpine AS build
WORKDIR /app

# Copia dependencias y las instala
COPY package*.json ./
RUN npm ci

# Copia el código y compila a producción
COPY . .
# Ajusta el --configuration si usas "production" u otro
RUN npm run build -- --configuration production

# ---- Etapa 2: Nginx para servir estáticos ----
FROM nginx:1.27-alpine
# Copia artefactos compilados
COPY --from=build /app/dist/admin-store/browser /usr/share/nginx/html
# Reemplaza config por una que maneje SPA + proxy /api
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
