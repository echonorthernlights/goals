const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
const goalRoutes = require('./routes/goalRoutes')
const app = express();

app.use(express.json())
app.use('/api/goals', goalRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port :${PORT}...`)
})