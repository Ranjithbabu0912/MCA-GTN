const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET all gallery items from MongoDB Atlas
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET single gallery item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findOne({ id });
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST create gallery item (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }

    if (!payload.caption) {
      payload.caption = payload.description || payload.title;
    }
    if (!payload.description) {
      payload.description = payload.caption;
    }

    if (!payload.id) {
      payload.id = 'gal-' + Date.now().toString(36);
    }
    if (!payload.category) {
      payload.category = 'Events';
    }
    if (!payload.categoryLabel) {
      payload.categoryLabel = payload.category;
    }
    if (!payload.themeColor) {
      payload.themeColor = '#102A54';
    }
    if (!payload.icon) {
      payload.icon = 'fa-award';
    }

    const newItem = await Gallery.create(payload);
    return res.status(201).json({ success: true, message: 'Gallery item created successfully in MongoDB.', data: newItem });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update gallery item (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Gallery.findOneAndUpdate({ id }, updates, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    return res.json({ success: true, message: 'Gallery item updated successfully in MongoDB.', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE gallery item (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    return res.json({ success: true, message: 'Gallery item deleted successfully from MongoDB.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
