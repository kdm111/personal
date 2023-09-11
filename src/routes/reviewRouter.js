const express = require('express');
const reviewRouter = express.Router();
const controller = require('../controllers/reviewController');

reviewRouter.get('/myreviews', controller.getMyReviews);
reviewRouter.patch('/myreviews/:review_id', controller.editReview);
reviewRouter.delete('/myreviews/:review_id', controller.deleteReview);
reviewRouter.get('/:restaurant_id', controller.getAllReviews);
reviewRouter.post('/:restaurant_id', controller.postReview);
reviewRouter.post('/:review_id/usefulness', controller.recommendReview);

module.exports = reviewRouter;
