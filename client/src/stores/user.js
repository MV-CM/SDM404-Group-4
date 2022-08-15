import { defineStore } from "pinia"
import axios from "axios"

const APIURL = "http://localhost:3001/api"

export const useUserStore = defineStore({
	id: "user",
	state: () => ({
		loggedIn: false,
		email: null
	}),
	actions: {
		async login(email, password) {
			const res = await axios.post(APIURL + "/login", { email, password })
			if (res.data.length > 0) {	
				const user = res.data[0] 
				this.loggedIn = true
				this.email = user.email
				this.schedules = user.schedules
			}
		},
		async addUser(email, password) {
			// Do not create new account if account with same e-mail exists
			const getRes = await axios.post(APIURL + "/getuser", { email })
			if (getRes.data.length === 0) {
				const createRes = await axios.post(APIURL + "/createuser", { email, password })
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