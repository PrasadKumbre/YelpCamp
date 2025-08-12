const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isReviewAuthor } = require('../middleware/auth');
const { validateReview } = require('../middleware/review');
const review = require('../controllers/reviews');

// Add Review
router.post('/', isLoggedIn, validateReview, catchAsync(review.addReview));

// Delete Review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview));

module.exports = router;