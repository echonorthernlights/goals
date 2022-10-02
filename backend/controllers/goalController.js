const asyncHandler = require('express-async-handler')

// @desc GET all goals
// @route /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get request' })
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
    console.log(text)
    res.status(200).json({ message: 'set request' })
})


// @desc Update a goal
// @route /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    res.status(200).json({ message: `update request/ id : ${id}` })
})


// @desc Delete a goal
// @route /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    res.status(200).json({ message: `delete request/ id : ${id}` })
})

module.exports = { setGoal, getGoal, updateGoal, deleteGoal }