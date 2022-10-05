const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc GET all goals
// @route /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    const { _id: userID } = req.user
    const goals = await Goal.find({ user: userID });
    return res.status(200).json(goals)
})


// @desc POST a goal
// @route /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    const { text } = req.body
    const { _id: userID } = req.user

    if (!text) {
        res.status(400);
        throw new Error('Please add a text value');
    }

    const goal = await Goal.create({ user: userID, text })
    return res.status(200).json(goal)
})


// @desc Update a goal
// @route /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const { id: goalID } = req.params
    const { _id: userID } = req.user
    const goal = await Goal.findById(goalID)
    //const user = await User.findById(userID)
    // Goal not found
    if (!userID) {
        res.status(400);
        throw new Error('User not found !!')
    }
    if (!goal) {
        res.status(400);
        throw new Error('No Id provided !!')
    }
    // Goal user matches logged user 
    if (goal.user.toString() !== userID.toString()) {
        res.status(401);
        throw new Error('User not authorized !!')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goalID, req.body, { new: true })
    res.status(200).json(updatedGoal)
})


// @desc Delete a goal
// @route /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    const goal = await Goal.findById(id)
    const { _id: userID } = req.user

    if (!goal) {
        res.status(400);
        throw new Error('No Id provided !!')
    }
    if (goal.user.toString() !== userID.toString()) {
        res.status(401);
        throw new Error('User not authorized !!')
    }
    await goal.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = { setGoal, getGoal, updateGoal, deleteGoal }