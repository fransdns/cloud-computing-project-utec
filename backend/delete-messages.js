import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'chat_db',
  password: 'your_db_password',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

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

// Función para borrar mensajes
const deleteMessages = async () => {
  try {
    await pool.query('DELETE FROM messages');
    console.log('Messages deleted');
  } catch (err) {
    console.error('Error deleting messages:', err);
  }
};

// Configurar `setInterval` para borrar mensajes cada 24 horas
setInterval(deleteMessages, 24 * 60 * 60 * 1000); // 24 horas en milisegundos

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
