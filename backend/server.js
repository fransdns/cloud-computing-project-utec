import express from 'express';
import pool from './database.js';
import cors from 'cors';
import createTable from './database-migration.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

import useragent from 'express-useragent';
import requestIp from 'request-ip';
import dotenv from "dotenv";


const app = express();
const port = process.env.BACKEND_PORT || 3000;

dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(requestIp.mw());
app.use(useragent.express());

// Obtener __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//creación de tablas y el indice
createTable();

// Middleware para capturar la información del cliente
app.use((req, res, next) => {
  const clientIp = req.clientIp;
  const agent = req.useragent;

  const logData = {
    ip: clientIp,
    browser: agent.browser || 'Unknown',
    os: (agent.os && agent.os.toString()) || 'Unknown',
    platform: (agent.platform && agent.platform.toString()) || 'Unknown',
    timestamp: new Date(),
  };


  fs.appendFile('client_logs.txt', JSON.stringify(logData) + '\n', (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de log:', err);
    }
  });
  next();
});

// Servir los archivos estáticos de la carpeta 'frontend/build'
//app.use(express.static(path.join(__dirname, '../frontend/build')));

app.post('/api/messages', async (req, res) => {
  const { room, message } = req.body;
  try {
    const result = await pool.query(
        'INSERT INTO chats (room, message, timestamp) VALUES ($1, $2, $3) RETURNING *',
        [room, message, new Date()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/messages', async (req, res) => {
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

app.get('/api/chat', async (req, res) => {
  const { room } = req.query;
  console.log("el parametro room es: ", room);
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

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
*/

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
