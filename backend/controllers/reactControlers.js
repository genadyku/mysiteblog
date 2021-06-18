const ReactArticle = require('../models/react');
const APIFeatures = require('../utils/apiFeatures');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const getArticles = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(ReactArticle.find(), req.query);
  const articles = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
});

const getArticle = catchAsync(async (req, res, next) => {
  const article = await ReactArticle.findOne({ slug: req.params.slug }).exec();
  if (!article) {
    return next(new AppError('Нет статьи с таким названием.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

module.exports = {
  getArticles,
  getArticle,
};
