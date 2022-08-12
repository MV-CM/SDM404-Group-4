<template>
	<div class="main-pannel">
		<div class="m-6">
			<label for="input-name">Name:</label>
			<input id="input-name" class="input is-small mb-2" type="text" v-model="schedule.name">
			<label for="input-start-date">Start Date:</label>
			<input id="input-start-date" class="input is-small mb-2" type="datetime-local" v-model="schedule.startDate">
			<label for="input-end-date">End Date:</label>
			<input id="input-end-date" class="input is-small mb-2" type="datetime-local" v-model="schedule.endDate">
			<label for="input-description">Description:</label>
			<textarea id="input-description" class="input is-small mb-2" v-model="schedule.description" />
			<div class="columns m-0 mt-2">
				<button class="column is-1 p-0 mr-3 button is-small" @click="saveSchedule">Update</button>
				<button class="column is-1 p-0 mr-3 button is-small" @click="goToDashboard">Back</button>
				<div class="error-message column p-0">{{ errorMessage }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useUserStore } from "../stores/user"
import { useScheduleStore } from "../stores/schedule"

export default {
	name: "UpdateScheduleScreen",
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
		const route = useRoute()

		const userStore = useUserStore()
		const { email } = storeToRefs(userStore)

		const scheduleStore = useScheduleStore()
		const { updateSchedule } = scheduleStore
		const { scheduleList } = storeToRefs(scheduleStore)

		const scheduleName = route.params.scheduleName
		const schedule = { ...scheduleList.value.find((s) => s.name === scheduleName) }

		const errorMessage = ref("")

		const saveSchedule = async () => {
			let r = await updateSchedule(email.value, scheduleName, schedule)
			if (r === "success") {
			router.push("/dashboard")
			} else if (r === "error_name") {
				errorMessage.value = "ERROR: Another schedule with this name already exists"
			}
		}

		const goToDashboard = () => {
			router.push("/dashboard")
		}

		return {
			schedule,
			errorMessage,
			saveSchedule,
			goToDashboard
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
	overflow-x: hidden;
	overflow-y: scroll;
}

.add-schedule {
	border: 0.1rem solid black;
	border-radius: 0.5rem;
}

.error-message {
	color: red;
	font-size: large;
}
</style>