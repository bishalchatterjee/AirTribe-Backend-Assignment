const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const pool = require('./db');

// Middleware to parse JSON request body
router.use(bodyParser.json());

// Define routes
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Instructors');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:instructor_id', async (req, res) => {
    const { instructor_id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM Instructors WHERE instructor_id = $1', [instructor_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Instructor not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const { rows } = await pool.query('INSERT INTO Instructors (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:instructor_id', async (req, res) => {
    const { instructor_id } = req.params;
    const { name, email } = req.body;
    try {
        const { rows } = await pool.query('UPDATE Instructors SET name = $1, email = $2 WHERE instructor_id = $3 RETURNING *', [name, email, instructor_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Instructor not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:instructor_id', async (req, res) => {
    const { instructor_id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM Instructors WHERE instructor_id = $1 RETURNING *', [instructor_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Instructor not found' });
        } else {
            res.json({ message: 'Instructor deleted successfully' });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
