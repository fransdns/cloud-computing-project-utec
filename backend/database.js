
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

// Crear un pool de conexiones a la base de datos
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    min: 2,
    max: 10,
  });
  
  // Exportar el pool para ser usado en otras partes de la aplicación
 export default pool;