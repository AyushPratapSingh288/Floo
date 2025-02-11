const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const matches = await Matched.find()
          .populate('lostItem')
          .populate('foundItem');
        res.status(200).json(matches);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching matched items', error });
      }
}); 


module.exports = router;
