const mongoose = require("mongoose")

const scheduleSchema = new mongoose.Schema({
	email: String,
	name: String,
	description: String,
	startDate: Date,
	endDate: Date,
})

module.exports = mongoose.model("Schedule", scheduleSchema)