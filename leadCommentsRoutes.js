const express = require('express');
const router = express.Router();
const pool= require('./db');

// Define routes
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM LeadComments');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { lead_id, instructor_id, comment } = req.body;
    try {
        if (!lead_id || !instructor_id || !comment) {
            return res.status(400).json({ message: 'Lead ID, instructor ID, and comment are required' });
        }
        const { rows } = await pool.query('INSERT INTO LeadComments (lead_id, instructor_id, comment) VALUES ($1, $2, $3) RETURNING *', [lead_id, instructor_id, comment]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:comment_id', async (req, res) => {
    const { comment_id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM LeadComments WHERE comment_id = $1 RETURNING *', [comment_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Lead comment not found' });
        } else {
            res.json({ message: 'Lead comment deleted successfully' });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:comment_id', async (req, res) => {
    const { comment_id } = req.params;
    const { lead_id, instructor_id, comment } = req.body;
    try {
        const { rows } = await pool.query('UPDATE LeadComments SET lead_id = $1, instructor_id = $2, comment = $3 WHERE comment_id = $4 RETURNING *', [lead_id, instructor_id, comment, comment_id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Lead comment not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
