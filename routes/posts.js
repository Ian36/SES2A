const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json({posts});
    }catch(err){
        res.json({messsage:err});
    }
});

router.get('/:userId', async (req,res) => {
    try{
        const post = await Post.find({ userId: req.params.userId });
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
    
})

router.post('/', async (req,res) => {
    const post = new Post({
        userId: req.body.userId,
        title: req.body.title,
        link: req.body.link
    });
    try{
        const savePost = await post.save();
        res.json(savePost);
    } catch (err) {
        res.json({message: err});
    }
    
});

router.delete('/:postId', async(req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch (err) {
        res.json({message: err});
    }
});

router.patch('/:postId', async(req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId },
            {$set: {link: req.body.link}}
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});


module.exports = router;