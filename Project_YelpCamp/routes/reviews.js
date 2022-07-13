const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../routes/campgrounds');
const ExpressError = require('../utils/ExpressError');
const {reviewSchema} = require('../schemas');

const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');

const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async(req, res) => {
    const{id, reviewId} = req.params;
    Campground.findByIdAndUpdate(id, {$pull:{ reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`);

}))

module.exports = router;