const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const pool= require('./db');

// Middleware to parse JSON request body
router.use(bodyParser.json());

// Define routes
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Courses');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { instructor_id, name, max_seats, start_date } = req.body;
    try {
        if (!instructor_id || !name || !max_seats || !start_date) {
            return res.status(400).json({ message: 'Instructor ID, name, max seats, and start date are required' });
        }
        const { rows } = await pool.query('INSERT INTO Courses (instructor_id, name, max_seats, start_date) VALUES ($1, $2, $3, $4) RETURNING *', [instructor_id, name, max_seats, start_date]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:course_id', async (req, res) => {
    const { course_id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM Courses WHERE course_id = $1 RETURNING *', [course_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.json({ message: 'Course deleted successfully' });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:course_id', async (req, res) => {
    const { course_id } = req.params;
    const { instructor_id, name, max_seats, start_date } = req.body;
    try {
        const { rows } = await pool.query('UPDATE Courses SET instructor_id = $1, name = $2, max_seats = $3, start_date = $4 WHERE course_id = $5 RETURNING *', [instructor_id, name, max_seats, start_date, course_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
