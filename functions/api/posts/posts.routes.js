const { Router } = require("express");
const router = Router();
const { createPost, findPosts, findSinglePost, updatePost, deletePost } = require('./post.controllers')

// create
router.post("/posts", createPost );

// read all
router.get("/posts", findPosts);

// read by ID
router.get("/posts/:post_id", findSinglePost);

router.patch("/posts/:post_id", updatePost);

// delete
router.delete("/posts/:post_id", deletePost);

module.exports = router;
