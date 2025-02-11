const express = require('express');
const router = express.Router();
const {
  reportLostItem,
  getAllLostItems,
  deleteLostItem,
} = require('../controllers/lostitemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, reportLostItem); 
router.get('/', getAllLostItems);
router.delete('/:id', authMiddleware, deleteLostItem); 

module.exports = router;
