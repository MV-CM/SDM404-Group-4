import { defineStore } from "pinia"
import axios from "axios"

const APIURL = "http://localhost:3001/api"

export const useScheduleStore = defineStore({
	id: "schedule",
	state: () => ({
		scheduleList: null
	}),
	actions: {
		async getScheduleList(email) {
			const res = await axios.post(APIURL + "/getschedules", { email })
			res.data.forEach(s => {
				s.startDate = s.startDate.slice(0,16)
				s.endDate = s.endDate.slice(0,16)
			})
			this.scheduleList = res.data
		},
		async addSchedule(newSchedule) {
			// Do not create new schedule if schedule with same name exists
			const duplicateSchedules = await axios.post(APIURL + "/getschedule", { email: newSchedule.email, name: newSchedule.name }).data
			if (!duplicateSchedules?.length > 0) {
				await axios.post(APIURL + "/createschedule", newSchedule)
				this.scheduleList.push(newSchedule)
				return "success"
			} else {
				return "error_name"
			}
		},
		async updateSchedule(oldName, updatedSchedule) {
			// Do not update a schedule name if name already belonds to another schedule
			let duplicateSchedules = []
			if (updatedSchedule.name != oldName) {
				duplicateSchedules = await axios.post(APIURL + "/getschedule", { email: updatedSchedule.email, name: updatedSchedule.name }).data
			}
			if (!duplicateSchedules?.length > 0) {
				await axios.post(APIURL + "/updateschedule", updatedSchedule)
				const updateIndex = this.scheduleList.findIndex((s) => s.name === oldName)
				this.scheduleList[updateIndex] = updatedSchedule
				return "success"
			} else {
				return "error_name"
			}
		},
		async removeSchedule(email, schedule) {
			await axios.post(APIURL + "/deleteschedule", { email, name: schedule.name })
			this.scheduleList = this.scheduleList.filter((s) => s.name !== schedule.name)
		},
		clearScheduleList() {
			this.scheduleList = null
		}
	}
})