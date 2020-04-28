const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParsaer = require('body-parser');
const cors  = require('cors');
require('dotenv/config');

/* app.use('/posts', () => {
    console.log('this is middlware');
}); */
app.use(cors());
app.use(bodyParsaer.json());

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const userRoute = require('./routes/users');
app.use('/user', userRoute);

app.get('/', (req,res) => {
    res.send('We are on home');
});


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => 
    console.log('Connected to DB')
);

app.listen(3000);