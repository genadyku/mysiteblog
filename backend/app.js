const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/*
app.options('*', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
*/
const articleRoute = require('./routes/articleRoutes');
const reactRoute = require('./routes/reactRoutes');
const lessonsRoutes = require('./routes/lessonsRoutes');
const authRoutes = require('./routes/authRoute');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api', articleRoute);
app.use('/api', reactRoute);
app.use('/api', lessonsRoutes);
app.use('/api', authRoutes);
app.use(globalErrorHandler);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
