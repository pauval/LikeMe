import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion } = req.body;
    try {
        await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)',
            [titulo, url, descripcion, 0]
        );
        res.status(201).send('Post agregado exitosamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query(
            'UPDATE posts SET likes = likes + 1 WHERE id = $1',
            [id]
        );
        res.status(200).send('Like agregado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        res.status(200).send('Post eliminado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
