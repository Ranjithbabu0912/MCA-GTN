const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET all faculty members from MongoDB Atlas sorted by order and id
router.get('/', async (req, res) => {
  try {
    const items = await Faculty.find().sort({ order: 1, id: 1 });
    // Stable sort guarantee: order ascending, HOD priority, then ID
    items.sort((a, b) => {
      const ordA = typeof a.order === 'number' && a.order > 0 ? a.order : (a.role === 'HOD' ? 1 : 99);
      const ordB = typeof b.order === 'number' && b.order > 0 ? b.order : (b.role === 'HOD' ? 1 : 99);
      if (ordA !== ordB) return ordA - ordB;
      return (a.id || '').localeCompare(b.id || '', undefined, { numeric: true });
    });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET single faculty member
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Faculty.findOne({ id });
    if (!item) return res.status(404).json({ success: false, message: 'Faculty member not found.' });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST create faculty member (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.name || !payload.designation) {
      return res.status(400).json({ success: false, message: 'Name and designation are required.' });
    }

    if (!payload.qualifications) {
      payload.qualifications = payload.qualification || 'M.C.A.';
    }
    if (!payload.qualification) {
      payload.qualification = payload.qualifications;
    }

    if (!payload.id || !payload.id.trim()) {
      const count = await Faculty.countDocuments();
      payload.id = 'faculty-0' + (count + 1);
    } else {
      payload.id = payload.id.trim();
    }

    if (payload.order !== undefined && payload.order !== null && payload.order !== '') {
      payload.order = Number(payload.order) || 1;
    } else {
      payload.order = payload.role === 'HOD' ? 1 : (await Faculty.countDocuments()) + 1;
    }

    if (!payload.roleTitle) {
      payload.roleTitle = payload.designation;
    }
    if (!payload.email) {
      payload.email = 'faculty.mca@gtnartscollege.ac.in';
    }
    if (!payload.officeLocation) {
      payload.officeLocation = 'MCA Department Block, Ground Floor';
    }
    if (!payload.summary) {
      payload.summary = payload.bio || '';
    }
    if (typeof payload.specializations === 'string') {
      payload.specializations = payload.specializations.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
    }
    if (typeof payload.courses === 'string') {
      payload.courses = payload.courses.split(/[\n,]/).map(c => c.trim()).filter(Boolean);
    }

    const newItem = await Faculty.create(payload);
    return res.status(201).json({ success: true, message: 'Faculty member created successfully in MongoDB.', data: newItem });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update faculty member (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.order !== undefined && updates.order !== null && updates.order !== '') {
      updates.order = Number(updates.order) || 1;
    }
    if (typeof updates.specializations === 'string') {
      updates.specializations = updates.specializations.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
    }
    if (typeof updates.courses === 'string') {
      updates.courses = updates.courses.split(/[\n,]/).map(c => c.trim()).filter(Boolean);
    }

    const updated = await Faculty.findOneAndUpdate({ id }, updates, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ success: false, message: 'Faculty member not found.' });
    return res.json({ success: true, message: 'Faculty member updated successfully in MongoDB.', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE faculty member (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Faculty.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Faculty member deleted successfully.' });
    return res.json({ success: true, message: 'Faculty member deleted successfully from MongoDB.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
