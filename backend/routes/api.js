// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// DELETE /api/users/:id
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

// GET /api/users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

// POST /api/users
router.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  try {
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

// Default API root
router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

module.exports = router;
