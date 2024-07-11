# Usa la imagen oficial de PostgreSQL como base
FROM postgres:16

# Añade variables de entorno para la configuración de PostgreSQL
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# Copia un script SQL de inicialización (opcional)
# COPY init.sql /docker-entrypoint-initdb.d/

# Expone el puerto 5432
EXPOSE 5432
