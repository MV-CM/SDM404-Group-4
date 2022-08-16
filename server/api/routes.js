const express = require("express")
const mongoose = require("mongoose")
const User = require("../schemas/user.js")
const Schedule = require("../schemas/schedule.js")


const apiRouter = express.Router()


apiRouter.post("/api/login", (req, res) => {
	const query = {
		email: req.body.email,
		password: req.body.password
	}

	User
		.find(query)
		.then(result => {
			res.status(200).json(result)
		})
})

apiRouter.post("/api/getuser", (req, res) => {
	User
		.find({ email: req.body.email })
		.then(result => {
			res.status(200).json(result)
		})
})

apiRouter.post("/api/createuser", (req, res) => {
	User
		.create({
			email: req.body.email,
			password: req.body.password
		})
		.then(result => {
			res.status(200).json(result)
		})
})

apiRouter.post("/api/getschedule", (req, res) => {
	const query = {
		email: req.body.email,
		name: req.body.name
	}
	Schedule
		.find(query)
		.then(result => {
			console.log(result);
			res.status(200).json(result)
		})
})

apiRouter.post("/api/getschedules", (req, res) => {
	const query = {
		email: req.body.email
	}
	Schedule
		.find(query)
		.then(result => {
			res.status(200).json(result)
		})
})

apiRouter.post("/api/createschedule", (req, res) => {
	Schedule
		.create(req.body)
		.then(result => {
			res.status(200).json(result)
		})
})

apiRouter.post("/api/deleteschedule", (req, res) => {
	Schedule
		.deleteOne({
			email: req.body.email,
			name: req.body.name
		})
		.then(result => {
			res.status(200).json(result)
		})
})

apiRouter.post("/api/updateschedule", (req, res) => {
	Schedule
		.updateOne({ email: req.body.email },
			{
				$set: req.body
			}
		)
		.then(result => {
			res.status(200).json(result)
		})
})

module.exports = apiRouter