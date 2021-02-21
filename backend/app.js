const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://csmarton:mongodbpass123@cluster0.fnpdq.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "123431ada",
      title: "This is the first post title",
      content: "This is the content for the first post"
    },
    {
      id: "4654631ada",
      title: "This is the second post title",
      content: "This is the content for the second post"
    }
  ];

  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  })
});


module.exports = app;
