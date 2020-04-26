const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req,res) => {
    try{
        const users = await User.find();
        res.json({users});
    }catch(err){
        res.json({messsage:err});
    }
});

router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username,
                password: req.body.password
            }
        );
        res.json(user);
    } catch (err) {
        res.json({message: err});
    }
    
})

router.post('/register', async (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType
    });
    try{
        const newUser = await user.save();
        res.json(newUser);
    } catch (err) {
        res.json({message: err});
    }
    
});

router.delete('/:userId', async(req,res) => {
    try{
        const removedUser = await User.remove({_id: req.params.userId});
        res.json(removedUser);
    } catch (err) {
        res.json({message: err});
    }
});

router.patch('/password/:userId', async(req,res) => {
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId },
            {$set: {password: req.body.password}}
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({message: err});
    }
});

router.patch('/userType/:userId', async(req,res) => {
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId },
            {$set: {userType: req.body.userType}}
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({message: err});
    }
});




module.exports = router;