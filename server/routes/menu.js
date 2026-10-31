const router = require('express').Router();
const MenuItem = require('../models/MenuItem');
const adminAuth = require('../middleware/adminAuth');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new menu item (admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;