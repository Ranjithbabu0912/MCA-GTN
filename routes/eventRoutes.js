const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET all events from MongoDB Atlas
router.get('/', async (req, res) => {
  try {
    const items = await Event.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Event.findOne({ id });
    if (!item) return res.status(404).json({ success: false, message: 'Event not found.' });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST create event (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title) {
      return res.status(400).json({ success: false, message: 'Event title is required.' });
    }

    if (!payload.id) {
      payload.id = 'evt-' + Date.now().toString(36);
    }
    if (typeof payload.highlights === 'string') {
      payload.highlights = payload.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }
    if (typeof payload.tags === 'string') {
      payload.tags = payload.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (typeof payload.categories === 'string') {
      payload.categories = payload.categories.split(',').map(c => c.trim()).filter(Boolean);
    }
    if (!payload.category && payload.categories && payload.categories.length > 0) {
      payload.category = payload.categories[0];
    }
    if (typeof payload.chiefGuests === 'string') {
      payload.chiefGuests = payload.chiefGuests.split(',').map(g => ({ name: g.trim(), title: '' })).filter(g => g.name);
    }

    const newItem = await Event.create(payload);
    return res.status(201).json({ success: true, message: 'Event created successfully in MongoDB.', data: newItem });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update event (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (typeof updates.highlights === 'string') {
      updates.highlights = updates.highlights.split('\n').map(h => h.trim()).filter(Boolean);
    }
    if (typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (typeof updates.categories === 'string') {
      updates.categories = updates.categories.split(',').map(c => c.trim()).filter(Boolean);
    }
    if (typeof updates.chiefGuests === 'string') {
      updates.chiefGuests = updates.chiefGuests.split(',').map(g => ({ name: g.trim(), title: '' })).filter(g => g.name);
    }

    const updated = await Event.findOneAndUpdate({ id }, updates, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ success: false, message: 'Event not found.' });
    return res.json({ success: true, message: 'Event updated successfully in MongoDB.', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE event (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Event not found.' });
    return res.json({ success: true, message: 'Event deleted successfully from MongoDB.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
