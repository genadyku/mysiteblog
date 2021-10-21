const Article = require('../models/articles');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
/*
const getArticles = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Article.find(), req.query);
  const articles = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
});
*/
const getArticles= catchAsync(async (req, res, next) => {
  const keyword = req.query.keyword
  
    ? {
      title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    

 const features = new APIFeatures(Article.find({ ...keyword }), req.query);
  const articles = await features.query;
  
  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
});

const getArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findOne({ slug: req.params.slug }).exec();

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

const addArticle = catchAsync(async (req, res, next) => {
  const {type ,title, titleShort, slug, textf } = req.body;
   
  let result;
  
    const foundArticle = await Article.findOne({ slug: slug });

  if (foundArticle) {
    return next(new AppError('Cтатья с таким названием уже существует.', 404));
  }

  const newArticle = new Article({type , title, titleShort, slug, textf });
  result = await newArticle.save();

  res.status(200).json({
    status: 'success',
    data: {
      newArticle ,
    },
  });
});


const updateArticle = catchAsync(async (req, res, next) => {
   
  const post = await Article.findByIdAndUpdate(  req.params.id,    {$set:req.body} );
 

  res.status(200).json({
    status: 'success',
    data: {
      post ,
    },
  });
});

const deleteArticle = catchAsync(async (req, res, next) => {
  
  
  
  const foundArticle = await Article.findById(  req.params.id );

  if (!foundArticle) {
    return next(new AppError('Cтатии с таким названием не существует.', 404));
  }
  
   await foundArticle.remove();
  

  res.status(200).json({
    status: 'success'
    
  });
});
module.exports = {
  getArticles,
  getArticle,
  addArticle ,
  deleteArticle ,
  updateArticle
  
};
