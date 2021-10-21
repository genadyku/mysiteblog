const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
mongoose.set('useCreateIndex', true);
console.log('MONGO_URI:',process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo connected');
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`App running on port ${port}...`);
});
