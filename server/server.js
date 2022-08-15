const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const apiRouter = require("./api/routes.js")

// Marcus' password, do not abuse ;P
const password = "I1cAmsKxZIFxuIKx"

console.log("connecting to MongoDB...")
mongoose
    .connect(
		`mongodb+srv://marcusV:${ password }@mycluster.roprcyi.mongodb.net/test`,
		{useNewUrlParser: true, useUnifiedTopology: true})
    .then(_ => {
        console.log("connected to MongoDB!")
    })
    .catch(error => {
        console.log("error connecting to MongoDB: ", error.message)
    })

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(apiRouter)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})