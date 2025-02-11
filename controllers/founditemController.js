const FoundItem = require('../models/foundItemModel');
const multer = require('multer');
const { performMatching } = require('../utills/matchingLogic');
const { storage } = require('../config/cloudnary-config');

const upload = multer({ storage });

exports.reportFoundItem = [
  upload.single('image'),
  async (req, res) => {
    try {
      const foundItem = new FoundItem({
        ...req.body,
        imageUrl: req.file ? req.file.path : null,
        user: req.user.userId,
      });
      await foundItem.save();

      // Perform matching after saving the found item
      await performMatching(foundItem, 'found');

      res.status(201).json(foundItem);
    } catch (error) {
      res.status(500).json({ message: 'Error reporting found item', error });
    }
  },
];

exports.getAllFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find();
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching found items', error });
  }
};

exports.deleteFoundItem = async (req, res) => {
  try {
    const { id } = req.params;
    await FoundItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Found item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting found item', error });
  }
};
