const path = require('path');
const { Review, ReviewImage, ReviewUsefulness } = require('../models');

exports.getAllReviews = async (req, res) => {
  const user_id = req.session ? req.session.userId : null;
  const { restaurant_id } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { restaurant_id },
      include: [
        {
          model: ReviewImage,
          attributes: ['image_url'],
          as: 'images',
        },
        {
          model: ReviewUsefulness,
          attributes: ['review_id', 'user_id'],
          as: 'ReviewUsefulness',
        },
      ],
    });

    const reviewsWithUsefulness = reviews.map(review => {
      const totalRecommendations = review.ReviewUsefulness.length;
      let didIRecommend = false;

      if (user_id) {
        didIRecommend = !!review.ReviewUsefulness.find(
          data => data.user_id === user_id,
        );
      }

      return {
        ...review.get(),
        totalRecommendations,
        is_useful: didIRecommend,
      };
    });

    res.json({ status: 'success', data: reviewsWithUsefulness });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 가져오는 동안 오류가 발생했습니다.',
    });
  }
};

exports.postReview = async (req, res) => {
  const { restaurant_id } = req.params;
  const { title, content, rating, user_id } = req.body;

  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.userId) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  try {
    const newReview = await Review.create({
      title,
      content,
      rating,
      user_id,
      restaurant_id,
    });

    const imagePromises = (req.files || []).map(file => {
      const filePath = path.join('/static/images/reviewImages', file.filename);
      return ReviewImage.create({
        review_id: newReview.review_id,
        image_url: filePath,
      });
    });

    await Promise.all(imagePromises);

    res.status(201).json({
      status: 'success',
      message: '성공적으로 리뷰를 등록했습니다.',
    });
  } catch (error) {
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 등록하는 동안 오류가 발생했습니다.',
    });
  }
};

exports.recommendReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.userId) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.userId;
  const { review_id } = req.params;

  try {
    const existingUsefulness = await ReviewUsefulness.findOne({
      where: {
        review_id,
        user_id,
      },
    });

    if (existingUsefulness) {
      return res.json({
        isSuccess: false,
        message: '이미 해당 리뷰에 추천을 하셨습니다.',
      });
    }

    await ReviewUsefulness.create({
      review_id,
      user_id,
    });

    res.json({ message: '성공적으로 리뷰를 추천하셨습니다.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: '해당 리뷰를 추천하는 것에 오류가 발생했습니다.' });
  }
};

exports.getMyReviews = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.userId) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.userId;

  try {
    const reviews = await Review.findAll({
      where: { user_id },
      include: [
        {
          model: ReviewImage,
          attributes: ['image_url'],
          as: 'images',
        },
      ],
    });

    if (reviews.length === 0) {
      return res.json({
        status: 'success',
        message: '사용자가 작성한 리뷰가 없습니다.',
        data: [],
      });
    }

    res.json({ status: 'success', data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 가져오는 동안 오류가 발생했습니다.',
    });
  }
};

exports.editReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.userId) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.userId;
  const { review_id } = req.params;
  const { title, content, rating } = req.body;

  try {
    const review = await Review.findOne({
      where: { review_id, user_id },
    });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: '해당 리뷰를 찾을 수 없거나 사용자가 작성한 리뷰가 아닙니다.',
      });
    }

    review.title = title;
    review.content = content;
    review.rating = rating;

    await review.save();

    res.json({
      status: 'success',
      message: '리뷰가 성공적으로 업데이트되었습니다.',
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 업데이트하는 동안 오류가 발생했습니다.',
    });
  }
};

exports.deleteReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || (!userInfo.userId && !userInfo.isAdmin)) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.userId;
  const { review_id } = req.params;

  try {
    const review = await Review.findOne({
      where: { review_id },
    });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: '해당 리뷰를 찾을 수 없습니다.',
      });
    }

    // 리뷰 작성자 또는 관리자만 리뷰를 삭제할 수 있도록 함
    if (review.user_id !== user_id && !userInfo.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: '리뷰를 삭제할 권한이 없습니다.',
      });
    }

    await ReviewUsefulness.destroy({ where: { review_id } });
    await ReviewImage.destroy({ where: { review_id } });
    await review.destroy();

    res.json({
      status: 'success',
      message: '리뷰가 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 삭제하는 동안 오류가 발생했습니다.',
    });
  }
};
