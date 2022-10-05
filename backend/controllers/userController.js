const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// @desc POST a user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        res.status(400);
        throw new Error('Please add required fields')
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        console.log(userExists)
        res.status(400);
        throw new Error('User already exists !!')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)

        })
    } else {
        res.status(400);
        throw new Error('Invalid data')
    }
})

// @desc POST a user
// @route /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password })
    // check for email user
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials !!')
    }
})
// @desc POST a user
// @route /api/users
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user
    res.status(200).json({
        id: _id,
        name,
        email
    })

})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}
module.exports = { registerUser, loginUser, getMe }