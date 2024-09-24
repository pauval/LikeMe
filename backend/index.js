import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './database/database.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron publicaciones' });
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion } = req.body;

    if (!titulo || !url || !descripcion) {
        return res.status(400).json({ message: 'Campos no pueden ser vacios' });
    }

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



app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        res.status(200).send('Post eliminado');
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


app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url, descripcion, likes } = req.body; 
    try {
        const result = await pool.query(
            'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5',
            [titulo, url, descripcion, likes, id]
        );
        res.status(200).json({ message: 'Post actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
