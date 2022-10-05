const colors = require('colors')
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDb } = require('./config/db')
const dotenv = require('dotenv').config();
const path = require('path')
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

// Serve frontend
if (process.env.NODE_ENV === "production") {
    // serve static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    // point any route (besides API routes) to the "index.html" path
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Set env to production')
    })
}
app.use(errorHandler)

const start = async () => {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server running on port :${PORT}...`)
    })
}
start();