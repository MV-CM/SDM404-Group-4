<template>
	<div class="main-pannel">
		<div class="m-6">
			<div class="top-menu is-1 pb-3">
				<button class="logout button is-small" @click="logout">Logout</button>
			</div>
			<div class="schedule-list p-2">
				<div v-for="schedule in scheduleList">
					<Schedule :schedule="schedule" />
				</div>
				<div class="add-schedule button" @click="goToAddSchedule">Add new schedule</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useUserStore } from "../stores/user"
import { useScheduleStore } from "../stores/schedule"
import Schedule from "../components/Schedule.vue"

export default {
	name: "Dashboard",
	components: {
		Schedule
	},
	created() {
		const userStore = useUserStore()
		const { loggedIn } = storeToRefs(userStore)
		if (!loggedIn.value) {
			const router = useRouter()
			router.push('/login')
		}
	},
	setup() {
		const router = useRouter()

		const userStore = useUserStore()
		const { clearUser } = userStore

		const scheduleStore = useScheduleStore()
		const { scheduleList } = storeToRefs(scheduleStore)

		const goToAddSchedule = () => {
			router.push("/schedule/create")
		}

		const logout = () => {
			clearUser()
			router.push('/login')
		}

		return {
			scheduleList,
			goToAddSchedule,
			logout
		}
	}
}
</script>

<style scoped lang="scss">
@import "bulma/css/bulma.css";

div {
	font-family: "Comic Sans MS", "Comic Sans";
}

.main-pannel {
	border: 0.2rem solid black;
}

.schedule-list {
	max-height: 45rem;
	overflow-x: hidden;
	overflow-y: scroll;
	border: 0.1rem solid black;
	border-radius: 0.5rem;
}

.add-schedule {
	border: 0.1rem solid black;
	border-radius: 0.5rem;
}
</style>