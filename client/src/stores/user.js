import { defineStore } from "pinia"
import axios from "axios"

//! CHANGE change the port and/or address based onback-end
const APIURL = "http://localhost:3001/api"

export const useUserStore = defineStore({
	id: "user",
	state: () => ({
		loggedIn: false,
		email: null
	}),
	actions: {
		async login(email, password) {
			//! CHANGE "/login" route based on back-end
			// const res = await axios.post(APIURL + "/login", { email, password })
			const res = { // Delete this after
				data: [
					{
						email: "asd@qwe.com",
						password: "123"
					}
				]
			}

			if (res.data.length > 0) {	
				const user = res.data[0] 
				this.loggedIn = true
				this.email = user.email
				this.schedules = user.schedules
			}
		},
		async addUser(email, password) {
			// Do not create new account if account with same e-mail exists
			//! CHANGE "/getuser" routes based on back-end
			// const getRes = await axios.post(APIURL + "/getuser", { email })
			const getRes = { // Delete this after
				data: []
			}

			if (getRes.data.length === 0) {
				//! CHANGE "/createuser" routes based on back-end
				// const createRes = await axios.post(APIURL + "/createuser", { email, password })
				const createRes = { // Delete this after
					data: {
						email: "asd@qwe.com",
						password: "123"
					}
				}

				const user = createRes.data
				if (user) {
					this.loggedIn = true
					this.email = user.email
				}
			}
		},
		clearUser() {
			this.loggedIn = false
			this.email = null
			this.schedules = null
		}
	}
})