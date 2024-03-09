const express = require('express');
const router = express.Router();
const pool= require('./db');

// Define routes
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Leads');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { course_id, name, email, phone, linkedin_profile, status } = req.body;
    try {
        if (!course_id || !name || !email || !phone) {
            return res.status(400).json({ message: 'Course ID, name, email, and phone are required' });
        }
        const { rows } = await pool.query('INSERT INTO Leads (course_id, name, email, phone, linkedin_profile, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [course_id, name, email, phone, linkedin_profile, status]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:lead_id', async (req, res) => {
    const { lead_id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM Leads WHERE lead_id = $1 RETURNING *', [lead_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Lead not found' });
        } else {
            res.json({ message: 'Lead deleted successfully' });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:lead_id', async (req, res) => {
    const { lead_id } = req.params;
    const { course_id, name, email, phone, linkedin_profile, status } = req.body;
    try {
        const { rows } = await pool.query('UPDATE Leads SET course_id = $1, name = $2, email = $3, phone = $4, linkedin_profile = $5, status = $6 WHERE lead_id = $7 RETURNING *', [course_id, name, email, phone, linkedin_profile, status, lead_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Lead not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
