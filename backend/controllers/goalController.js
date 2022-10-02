const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc GET all goals
// @route /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    return res.status(200).json(goals)
})


// @desc POST a goal
// @route /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text value');
    }
    const { text } = req.body
    const goal = await Goal.create({ text })
    return res.status(200).json(goal)
})


// @desc Update a goal
// @route /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400);
        throw new Error('No Id provided !!')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedGoal)
})


// @desc Delete a goal
// @route /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400);
        throw new Error('No Id provided !!')
    }
    await goal.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = { setGoal, getGoal, updateGoal, deleteGoal }