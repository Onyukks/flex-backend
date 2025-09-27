const express = require('express');
const { getHostawayReviews,getPropertyReviews, addReviewToSite, getPropertyDetail, getAllPropertyReviews } = require('../controllers/reviewsController'); 
const router = express.Router();


router.get('/hostaway', getHostawayReviews);  
router.get('/', getPropertyReviews); 
router.get('/:listingName', getPropertyDetail);
router.patch('/:listingName/reviews/:reviewId/add', addReviewToSite)
router.get('/:listingName/all-reviews', getAllPropertyReviews);



module.exports = router;
