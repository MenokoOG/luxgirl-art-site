require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const likeRoutes = require('./routes/likeRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_SECRET, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', likeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
