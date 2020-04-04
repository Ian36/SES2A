const express = require('express');
const router = express.Router();
const users = require('../../Users');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) res.status(404).send('The user was not found')//404 Object not found
    res.send(user);
});

router.post('/register', (req, res) => {
    const { error } = validateRegistration(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const user = {
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType
    };
    users.push(user);

    let payload = {subject: user.id};
    let token = jwt.sign(payload, 'secretKey');

    res.send({token});
});

router.post('/login', (req, res) => {
    const user = users.find(user => user.username === req.body.username && user.password === req.body.password);
    if(!user) {
        res.status(404).send('The user was not found');
        return;
    }

    //Do something
    let payload = {subject: user.id};
    let token = jwt.sign(payload, 'secretKey');

    res.send({token});
});


//change user password
router.put('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) {
        res.status(404).send('The user was not found');
        return;
    }

    //Validate
    //If invalid, return 400 - Bad request

    const { error } = validateUser(req.body); //result.error

    if (error) {
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update course
    user.password = user.body.password;
    res.send(user);
    //Return the updated course
});

function validateRegistration(user) {
    const schema = {
        //TODO: check for username is already used
        username: Joi.string().min(3).required(),
        password: Joi.string().required(),
        //TODO: Check if userType is only staff or student
        userType: Joi.string().required()
    };
    return Joi.validate(user, schema);
}


router.delete('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) {
        res.status(404).send('The user was not found');
        return;
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(users);
});

router.post('/token', (req, res) => {
    let payload = jwt.verify(token, 'secretKey');
    if(!payload) {
        return res.stats(401).send('Invalid Token');
    }
    const user = users.find(user => user.id === payload.subject);
    if(!user) {
        return res.status(404).send('The user was not found');
    }
    res.send(user);
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.stats(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.stats(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload) {
        return res.stats(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

module.exports = router;
