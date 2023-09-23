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

const updatePost = async (req,res) => {
  if(!req.body.name && !req.body.title){
    res.status(400).json({error: 'Invalid update data'})
  }
  const updateData = {};

  if(req.body.name){
    updateData.name = req.body.name;
  }


  if(req.body.title){
    updateData.title = req.body.title;
  }

  console.log(updateData,"updatedata")

  console.log(req.params._id,"req.params._id")

  try{
    const response = await Post.findByIdAndUpdate(req.params._id,updateData);
    res.status(200).json({msg:"Post Update Successfully",data:response})
  }catch(error){
    console.log(error)

  }
 
  // Post.findOneAndUpdate(
  //  { _id:req.params._id},
  //  {$set:updateData},
  //  {new :false},
  // ).then(updatePost => {
  //   if(!updatePost){
  //     return res.status(404).json({error: 'Post not found' })
  //   }
  //   res.json(updatePost);
    
  // }).catch(error => {
  //   res.status(500).json({ error: 'An error occurred while updating the post' });
  // })
}


module.exports = {
  getPosts,
  createPost,
  updatePost,
};
