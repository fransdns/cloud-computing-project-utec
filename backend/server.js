import express from 'express';
import pool from './database.js';
import checkUserType from './middleware.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/connected', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release(); // Liberar el cliente de la conexión de vuelta al pool

    res.send(`Current time is: ${result.rows[0].current_time}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Obtener todos los usuarios
app.get('/usuarios',checkUserType("laprincesa"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM usuarios');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/usuarios', async (req, res) => {
  const { nombre, email, edad, tipo } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO usuarios (nombre, email, edad,tipo) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, email, edad, tipo]);
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en POST /usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, email, edad, tipo} = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE usuarios SET nombre = $1, email = $2, edad = $3, tipo = $4 WHERE id = $5 RETURNING *', [nombre, email, edad, tipo, id]);
    client.release();
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error en PUT /usuarios/:id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    client.release();
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    }
  } catch (error) {
    console.error('Error en DELETE /usuarios/:id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/', (req, res) => {
  res.send('hola, estás en el root')
});


app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY timestamp ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/messages', async (req, res) => {
  const { text, sender } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages (text, sender, timestamp) VALUES ($1, $2, $3) RETURNING *',
      [text, sender, new Date()]
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
