const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const verifyToken = require('../middleware/authmiddleware');

// ➕ Create Item
router.post('/', verifyToken, async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      userId: req.user.id,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📄 Get All Items of User
router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Update Item
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ Delete Item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;