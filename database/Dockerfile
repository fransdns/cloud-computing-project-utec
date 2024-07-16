# Usa la imagen oficial de PostgreSQL como base
FROM postgres:latest

# Copia el archivo de inicialización SQL en el directorio de inicialización de PostgreSQL
COPY init.sql /docker-entrypoint-initdb.d/

# Copia el archivo .env al contenedor
COPY .env /app/.env

# Configura el contenedor para que use las variables de entorno del archivo .env
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

# Exponer el puerto por defecto de PostgreSQL
EXPOSE 5432

