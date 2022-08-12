<template>
	<div class="schedule p-2 mb-2">
		<div class="columns mb-0">
			<div class="column is-6">
				{{ schedule.name }}
			</div>
			<div class="column">
				{{ formatDate(new Date(schedule.startDate)) }}
			</div>
			<div class="column">
				{{ formatDate(new Date(schedule.endDate)) }}
			</div>
			<div class="column columns m-0">
				<button class="column button is-small p-1" @click="goToEditSchedule">Edit</button>
				<button class="column button is-small p-1" @click="deleteSchedule">Delete</button>
			</div>
		</div>
		<div>
			{{ schedule.description }}
		</div>
	</div>
</template>

<script>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useUserStore } from "../stores/user"
import { useScheduleStore } from "../stores/schedule"

export default {
	name: "Dashboard",
	props: [
		"schedule"
	],
	setup(props) {
		const router = useRouter()

		const userStore = useUserStore()
		const { email } = storeToRefs(userStore)

		const scheduleStore = useScheduleStore()
		const { removeSchedule } = scheduleStore

		const formatDate = (date) => {
			return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
		}

		const goToEditSchedule = () => {
			router.push(`/schedule/update/${props.schedule.name}`)
		}

		const deleteSchedule = () => {
			removeSchedule(email.value, props.schedule)
		}

		return {
			formatDate,
			goToEditSchedule,
			deleteSchedule
		}
	}
}
</script>

<style scoped lang="scss">
@import "bulma/css/bulma.css";

div {
	font-family: "Comic Sans MS", "Comic Sans";
}

.schedule {
	border: 0.1rem solid black;
	border-radius: 0.5rem;
}
</style>