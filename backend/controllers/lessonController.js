const Chapter = require('../models/chapter');
const Lesson = require('../models/lesson');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/AppError');

const getChapters = catchAsync(async (req, res, next) => {
  const chapters = await Chapter.find({}).exec();
  res.json(chapters);
});

const getChapter = catchAsync(async (req, res, next) => {
  const chapter = await Chapter.findOne({ slug: req.params.slug })
    .populate('lessons')
    .exec();

  if (!chapter) {
    return next(new AppError('Нет урока с таким названием.', 404));
  }
  res.status(200).json(chapter);
});

const getChapterSlug = catchAsync(async (req, res, next) => {
  const lessons = await Chapter.findOne({ slug: req.params.slug })
    .populate('lessons', ['title', '_id', 'slug', 'num'])
    .exec();

  if (!lessons) {
    return next(new AppError('Нет урока с таким названием.', 404));
  }

  res.status(200).json(lessons);
});

const getLessons = catchAsync(async (req, res, next) => {
  const lessons = await Chapter.find({}).populate('lessons').exec();
  
  res.json(lessons);
});

const getLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug })
    .populate('chapterId')
    .exec();

  if (!lesson) {
    return next(new AppError('Нет урока с таким названием.', 404));
  }

  res.status(200).json(lesson);
});

const  addLesson = catchAsync(async (req, res, next)=> {
  const { chapterId, num, slug, title, titleShort, textf } = req.body;
  
  let chapter;
  
    const foundLesson = await Lesson.findOne({ slug: slug });
    if (foundLesson) {
      return next(new AppError('Урок с таким названием уже существует.', 404));
    }

    
    const newLesson = new Lesson({ chapterId, num, slug, title, titleShort, textf });
     await newLesson.save();
     chapter = await Chapter.findById({ "_id": chapterId }).exec();
     chapter.lessons.push(newLesson);
      await chapter.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        newLesson ,
      },
    });
  });   

module.exports = {
  getChapters,
  getChapter,
  getChapterSlug,
  getLessons,
  getLesson,
  addLesson
};
