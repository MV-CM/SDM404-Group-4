import { createRouter, createWebHistory } from "vue-router"
import LoginScreen from "../views/LoginScreen.vue"
import SignupScreen from "../views/SignupScreen.vue"
import Dashboard from "../views/Dashboard.vue"
import CreateScheduleScreen from "../views/CreateScheduleScreen.vue"
import UpdateScheduleScreen from "../views/UpdateScheduleScreen.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: { name: "login" }
		},
		{
			path: "/login",
			name: "login",
			component: LoginScreen
		},
		{
			path: "/signup",
			name: "signup",
			component: SignupScreen
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard
		},
		{
			path: "/schedule",
			redirect: { name: "createSchedule"}
		},
		{
			path: "/schedule/create",
			name: "createSchedule",
			component: CreateScheduleScreen
		},
		{
			path: "/schedule/update/:scheduleName",
			name: "updateSchedule",
			component: UpdateScheduleScreen
		},
	]
})

export default router
