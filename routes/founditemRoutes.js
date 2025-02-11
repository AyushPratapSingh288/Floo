const express = require('express');
const router = express.Router();
const {
  reportFoundItem,
  getAllFoundItems,
  deleteFoundItem,
} = require('../controllers/founditemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, reportFoundItem);
router.get('/', getAllFoundItems);
router.delete('/:id', authMiddleware, deleteFoundItem);

module.exports = router;
