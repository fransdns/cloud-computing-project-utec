import express from 'express';
import pool from './database.js';
import cors from 'cors';
import createTable from './database-migration.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import checkUserType from './middleware.js';

const app = express();
const port = 443;

//middlewares
app.use(express.json());
app.use(cors());

// Obtener __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//creación de tablas y el indice
createTable();


// Servir los archivos estáticos de la carpeta 'frontend/build'
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Ruta para servir la aplicación React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});



app.post('/messages', async (req, res) => {
  const {room, message} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO chats (room, message, timestamp) VALUES ($1, $2,$3) RETURNING *',
      [room, message, new Date()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/messages', async (req, res) => {
  const { room } = req.query;
  try {
    const result = await pool.query(
        'SELECT * FROM chats WHERE room = $1 ORDER BY timestamp ASC',
        [room]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('*', (req, res) => {
  res.status(404).send('Página no encontrada');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
