
const express = require('express')
const app = express()
const todos = require('./routes/todos')
const port = 8080
const connectDB = require('./db/connect')
require('dotenv').config()

app.use(express.static('public'))

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile("./public/index.html")
})

app.use('/api/v1/todos', todos)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {

    }
}

start()