const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Register a new user
exports.register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    let user;
    try {
        // const saltRounds = 10;
        // const salt  = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        console.log("user in login",user);
        const token = user.genToken();
        
        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Set to true in production
            sameSite: 'None',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });
        
        res.status(200).send("Login successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.usrid,{password:0});
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};