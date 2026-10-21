const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET all announcements from MongoDB Atlas
router.get('/', async (req, res) => {
  try {
    const items = await Announcement.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET single announcement
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Announcement.findOne({ id });
    if (!item) return res.status(404).json({ success: false, message: 'Announcement not found.' });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST create new announcement (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title || !payload.description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    if (!payload.id) {
      payload.id = 'ann-' + Date.now().toString(36);
    }
    if (!payload.date) {
      payload.date = new Date().toISOString().split('T')[0];
    }
    if (!payload.displayDate) {
      payload.displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const newItem = await Announcement.create(payload);
    return res.status(201).json({ success: true, message: 'Announcement created successfully in MongoDB.', data: newItem });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update announcement (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Announcement.findOneAndUpdate({ id }, updates, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ success: false, message: 'Announcement not found.' });
    return res.json({ success: true, message: 'Announcement updated successfully in MongoDB.', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE announcement (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Announcement not found.' });
    return res.json({ success: true, message: 'Announcement deleted successfully from MongoDB.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
