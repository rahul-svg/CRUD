const Post = require("../models/post");

const getPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.send(error);
    });
};

const createPost = (req, res) => {
  const post = new Post({
    name: req.body.name,
    title: req.body.title,
  });

  post
    .save()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.send(error);
    });
};

module.exports = {
  getPosts,
  createPost,
};
