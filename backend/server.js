import express from 'express';
import pool from './database.js';
import checkUserType from './middleware.js';
import cors from 'cors';
import createTable from './database-migration.js';

const app = express();
const port = 443;

//middlewares
app.use(express.json());
app.use(cors());

//creación de tablas y el indice
createTable();

// Servir los archivos estáticos de la carpeta 'frontend/build'
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Ruta para servir la aplicación React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//rutas


app.get('/messages', async (req, res) => {
  const { name, number } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM messages WHERE name = $1 AND number = $2 ORDER BY timestamp ASC',
      [name, number]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/messages', async (req, res) => {
  const { name, number, text, sender } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO messages (name, number, text, sender, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, number, text, sender, new Date()]
    );
    res.json(result.rows[0]);
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
