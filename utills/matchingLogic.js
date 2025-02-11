const LostItem = require('../models/lostItemModel');
const FoundItem = require('../models/foundItemModel');
const Matched = require('../models/matchedModel');
const cloudinary = require('cloudinary').v2;
const stringSimilarity = require('string-similarity');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function performMatching(newItem, itemType) {
  try {
    const oppositeItems = itemType === 'lost' ? await FoundItem.find() : await LostItem.find();
    let matchedItems = [];

    for (const item of oppositeItems) {
      let imageMatch = false;

      if (newItem.imageUrl && item.imageUrl) {
        const result = await cloudinary.search
          .expression(`similar: ${newItem.imageUrl}`)
          .execute();

        if (result.resources.some(r => r.public_id === item.imageUrl.split('/').pop().split('.')[0])) {
          imageMatch = true;
        }
      }

      const descriptionSimilarity = stringSimilarity.compareTwoStrings(
        newItem.description.toLowerCase(),
        item.description.toLowerCase()
      );

      const locationSimilarity = stringSimilarity.compareTwoStrings(
        newItem.location.toLowerCase(),
        item.location.toLowerCase()
      );

      if ((imageMatch || descriptionSimilarity > 0.7) && locationSimilarity > 0.6) {
        matchedItems.push(item._id);
      }
    }

    if (matchedItems.length > 0) {
      await Matched.create({
        lostItem: itemType === 'lost' ? newItem._id : null,
        foundItem: itemType === 'found' ? newItem._id : matchedItems,
      });
    }
  } catch (error) {
    console.error('Error in matching service:', error);
  }
}

module.exports = {
  performMatching,
};
