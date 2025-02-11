const LostItem = require('../models/lostItemModel');
const multer = require('multer');
const { performMatching } = require('../utills/matchingLogic');
const { storage } = require('../config/cloudnary-config');

const upload = multer({ storage });

exports.reportLostItem = [
  upload.single('image'),
  async (req, res) => {
    try {
      const lostItem = new LostItem({
        ...req.body,
        imageUrl: req.file ? req.file.path : null,
        user: req.user.userId,
      });
      await lostItem.save();

      await performMatching(lostItem, 'lost');

      res.status(201).json(lostItem);
    } catch (error) {
      res.status(500).json({ message: 'Error reporting lost item', error });
    }
  },
];

exports.getAllLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lost items', error });
  }
};

exports.deleteLostItem = async (req, res) => {
  try {
    const { id } = req.params;
    await LostItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Lost item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lost item', error });
  }
};
