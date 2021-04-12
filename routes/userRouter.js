const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {

    const { username, email, password, passwordVerify } = req.body;

    if (!username || !password || !passwordVerify || !email) return res.status(400).json({status: 400, message: "Please fill all inputs"});
    if (password !== passwordVerify) return res.status(400).json({status: 400, message: "Password mismatch"});
    if (password.length < 6) return res.status(400).json({status: 400, message: "Password must be at least 6 characters"});

    const user = await User.findOne({email});

    if (user) return res.status(400).json({status: 400, message: "User already exists with that email"});

    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await new User({ username, email, passwordHash });

    const savedUser = await newUser.save()

    const token = jwt.sign({
        user: savedUser._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }).send()

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({status: 400, message: "Please fill all inputs"});

    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(401).json({status: 401, message: "Wrong email or password"});

    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

    if(!passwordCorrect) return res.status(401).json({status: 401, message: "Wrong password"});

    const token = jwt.sign({
        user: existingUser._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }).send()
    
})

router.get('/logout', async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(0)
    }).send()
})

router.get('/loggedIn', async (req, res) => {
    try{
        const token = req.cookies.token;
        console.log(req.cookies)
        console.log(token)
        if(!token) return res.json(false);


        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);


    }catch(err) { res.json(false) }
})

module.exports = router