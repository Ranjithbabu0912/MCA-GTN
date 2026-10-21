const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET all achievements from MongoDB Atlas
router.get('/', async (req, res) => {
  try {
    const items = await Achievement.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET single achievement
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Achievement.findOne({ id });
    if (!item) return res.status(404).json({ success: false, message: 'Achievement not found.' });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST create achievement (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title && !payload.awardTitle) {
      return res.status(400).json({ success: false, message: 'Achievement title is required.' });
    }

    if (!payload.id) {
      payload.id = 'ach-' + Date.now().toString(36);
    }
    if (!payload.awardTitle) {
      payload.awardTitle = payload.title;
    }
    if (!payload.title) {
      payload.title = payload.awardTitle;
    }
    if (!payload.recipient) {
      payload.recipient = payload.studentName || 'MCA Department';
    }
    if (!payload.studentName) {
      payload.studentName = payload.recipient;
    }
    if (typeof payload.highlights === 'string') {
      payload.highlights = payload.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }
    if (typeof payload.students === 'string') {
      payload.students = payload.students.split(',').map(s => s.trim()).filter(Boolean);
    }

    const newItem = await Achievement.create(payload);
    return res.status(201).json({ success: true, message: 'Achievement created successfully in MongoDB.', data: newItem });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update achievement (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (typeof updates.highlights === 'string') {
      updates.highlights = updates.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }
    if (typeof updates.students === 'string') {
      updates.students = updates.students.split(',').map(s => s.trim()).filter(Boolean);
    }

    const updated = await Achievement.findOneAndUpdate({ id }, updates, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ success: false, message: 'Achievement not found.' });
    return res.json({ success: true, message: 'Achievement updated successfully in MongoDB.', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE achievement (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Achievement.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Achievement not found.' });
    return res.json({ success: true, message: 'Achievement deleted successfully from MongoDB.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
