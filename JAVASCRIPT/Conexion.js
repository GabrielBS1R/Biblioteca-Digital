const express = require('express');
const sql = require('mssql');
const app = express();

app.use(express.json());

// Configuración de la base de datos MSSQL
const dbConfig = {
    user: 'sa',
    password: 'Mazda787B',
    server: 'DESKTOP-NQ8VIDM', // Puede ser 'localhost' o una dirección IP
    database: 'Biblioteca',
    options: {
        encrypt: false, // Usa true si estás conectándote a Azure, en otros casos puede ser false
        trustServerCertificate: true // Si es necesario para conexiones locales
    }
};

// Ruta para obtener libros
app.get('/api/libros', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM libros');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener libros:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para agregar un libro
app.post('/api/libros', async (req, res) => {
    const { titulo, autor, categoria } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('titulo', sql.VarChar, titulo)
            .input('autor', sql.VarChar, autor)
            .input('categoria', sql.VarChar, categoria)
            .query('INSERT INTO libros (titulo, fecha_publicacion, isbn) VALUES (@titulo, @fecha_publicacion, @isbn)');
        res.send('Libro agregado');
    } catch (err) {
        console.error('Error al agregar libro:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para eliminar un libro (opcional)
app.delete('/api/libros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM libros WHERE id = @id');
        res.send('Libro eliminado');
    } catch (err) {
        console.error('Error al eliminar libro:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
