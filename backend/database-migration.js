import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Client} = pkg;

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  async function createTable() {
    try {
      // Conecta con la base de datos
      await client.connect();
      console.log('Conectado correctamente a PostgreSQL');
  
      // Crea la tabla 'chats' si no existe
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS chats (
                id SERIAL PRIMARY KEY,
                room VARCHAR(255),
                message TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      /*await client.query(createTableQuery);
      console.log('Tabla de chats creada (si no existía) con éxito');

      const createIndexQuery = `
        CREATE INDEX IF NOT EXISTS idx_chats_room ON chats (room);
      `;
      await client.query(createIndexQuery);
      console.log('Índice idx_chats_name_number creado (si no existía) con éxito');*/
  
    } catch (err) {
      console.error('Error al conectar o crear la tabla/índice:', err);
    } finally {
      // Cierra la conexión
      await client.end();
      console.log('Conexión cerrada');
    }
  }

  export default createTable;