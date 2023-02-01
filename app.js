
require('dotenv').config();
const express  = require('express');
const app      = express();
const bodyParser = require('body-parser');


const productRoutes = require('./routes/productRouter');
const userRoutes    = require('./routes/userRouter');
const myMongoDbManager = require('./services/myDataBaseManager');

const path = require('path');



//app.use('/images', express.static(path.join(__dirname, 'uploads/img')));
myMongoDbManager.connect(process.env.ID_BDD);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', process.env.METHODS);
  next();
});

app.use(bodyParser.json());

app.use(express.json());

app.use('/api',productRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;
