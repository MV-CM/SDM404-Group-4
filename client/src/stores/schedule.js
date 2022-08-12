import { defineStore } from "pinia"
import axios from "axios"

//! CHANGE change the port and/or address based onback-end
const APIURL = "http://localhost:3001/api"

export const useScheduleStore = defineStore({
	id: "schedule",
	state: () => ({
		scheduleList: null
	}),
	actions: {
		async getScheduleList(userEmail) {
			//! CHANGE "/getschedules" routes based on back-end
			// const res = await axios.post(APIURL + "/getschedules", { userEmail })
			const res = { // Delete this after
				data: [
					{
						name: "schedule_1",
						description: "description...",
						startDate: "2021-05-04T15:00",
						endDate: "2022-05-04T13:06",
					},
					{
						name: "schedile_2",
						description: "description2...",
						startDate: "2022-05-04T13:06",
						endDate: "2023-05-04T13:06",
					},
					{
						name: "schedile_3",
						description: "description3...",
						startDate: "2023-05-04T13:06",
						endDate: "2024-05-04T13:06",
					},
					{
						name: "schedile_4",
						description: "description4...",
						startDate: "2024-05-04T13:06",
						endDate: "2025-05-04T13:06",
					}
				]
			}

			this.scheduleList = res.data
		},
		async addSchedule(userEmail, newSchedule) {
			// Do not create new schedule if schedule with same name exists
			//! CHANGE "/getschedule" routes based on back-end
			// const duplicateSchedules = await axios.post(APIURL + "/getschedule", { userEmail, name }).data
			const duplicateSchedules = [
				// {
				// 	name: "schedile_4",
				// 	description: "description4...",
				// 	startDate: "2024-05-04T13:06",
				// 	endDate: "2025-05-04T13:06",
				// }
			]

			if (duplicateSchedules.length === 0) {
				//! CHANGE "/createschedule" route based on back-end
				// await axios.post(APIURL + "/createschedule", newSchedule)
				this.scheduleList.push(newSchedule)
				return "success"
			} else {
				return "error_name"
			}
		},
		async updateSchedule(userEmail, oldName, updatedSchedule) {
			// Do not update a schedule name if name already belonds to another schedule
			let duplicateSchedules = []
			if (updatedSchedule.name != oldName) {
				//! CHANGE "/getschedule" routes based on back-end
				// duplicateSchedules = await axios.post(APIURL + "/getschedule", { userEmail, updatedSchedule.name }).data
				duplicateSchedules = [
					{
						name: "schedile_4",
						description: "description4...",
						startDate: "2024-05-04T13:06",
						endDate: "2025-05-04T13:06",
					}
				]
			}
			if (duplicateSchedules.length === 0) {
				//! CHANGE "/updateschedule" route based on back-end
				// await axios.post(APIURL + "/updateschedule", { userEmail, name, newSchedule})
				const updateIndex = this.scheduleList.findIndex((s) => s.name === oldName)
				this.scheduleList[updateIndex] = updatedSchedule
				return "success"
			} else {
				return "error_name"
			}
		},
		async removeSchedule(userEmail, schedule) {
			//! CHANGE "/deleteschedule" routes based on back-end
			// await axios.post(APIURL + "/deleteschedule", { userEmail, name })
			this.scheduleList = this.scheduleList.filter((s) => s.name !== schedule.name)
		},
		clearScheduleList() {
			this.scheduleList = null
		}
	}
})