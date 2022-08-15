<template>
	<div class="main-pannel">
		<div v-if="!signUpSuccess" class="m-6">
			<input class="input is-small mb-2" type="text" placeholder="E-mail" v-model="email">
			<input class="input is-small mb-2" type="password" placeholder="Password" v-model="password">
			<div class="has-text-danger">{{ failMessage }}</div>
			<button class="button is-small" @click="signUp">Sign Up</button>
		</div>
		<div v-else class="m-6">
			<div class="has-text-success is-size-4">
				Successfully created account for {{ email }}
			</div>
			<button class="button ml-6 mt-4" @click="goToDashboard">Log in with new account</button>
		</div>
	</div>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useUserStore } from "../stores/user"
import { useScheduleStore } from "../stores/schedule"

export default {
	name: "SignupScreen",
	created() {
		const userStore = useUserStore()
		const { loggedIn } = storeToRefs(userStore)
		if (loggedIn.value) {
			const router = useRouter()
			router.push('/dashboard')
		}
	},
	setup() {
		const router = useRouter()

		const userStore = useUserStore()
		const { addUser } = userStore
		const { loggedIn } = storeToRefs(userStore)

		const scheduleStore = useScheduleStore()
		const { getScheduleList } = scheduleStore

		const email = ref("")
		const password = ref("")

		const signUpSuccess = ref(false)
		const failMessage = ref("")

		const signUp = async () => {
			if (email.value && password.value) {
				await addUser(email.value, password.value)
				if (loggedIn.value) {
					await getScheduleList(email.value)
					signUpSuccess.value = true
				} else {
					failMessage.value = "An account with this E-mail already exists"
				}
			} else {
				failMessage.value = "Invalid E-mail or Password"
			}
		}

		const goToLogin = () => {
			router.push('/login')
		}

		const goToDashboard = () => {
			router.push('/dashboard')
		}

		return {
			email,
			failMessage,
			goToLogin,
			goToDashboard,
			password,
			signUp,
			signUpSuccess,
		}
	}
}
</script>

<style scoped lang="scss">
@import "bulma/css/bulma.css";

div {
	font-family: "Comic Sans MS", "Comic Sans";
}

.input {
	width: 50%;
}

.main-pannel {
	border: 0.2rem solid black;
}
</style>