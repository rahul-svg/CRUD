const router = require("express").Router();
const {getPosts,createPost} = require('../controller/post')

router.get("/",(req,res) => {
    res.send("Let's build a CRUD API!");
})

router.post("/create/post", createPost);
router.get("/get/posts", getPosts);


module.exports = router;