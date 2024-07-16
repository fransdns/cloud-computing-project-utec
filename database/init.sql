-- Crear la base de datos chat_db si no existe
CREATE DATABASE IF NOT EXISTS chat_db;
\c chat_db; -- Conectarse a la base de datos chat_db

-- Crear la tabla chats si no existe
CREATE TABLE IF NOT EXISTS chats (
                                     id SERIAL PRIMARY KEY,
                                     room VARCHAR(255),
                                     message TEXT,
                                     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear el índice idx_chats_room en la tabla chats si no existe
CREATE INDEX IF NOT EXISTS idx_chats_room ON chats (room);
