<template>
	<div class="main-pannel">
		<div class="m-6">
			<input class="input is-small mb-2" type="text" placeholder="E-mail" v-model="email">
			<input class="input is-small mb-2" type="password" placeholder="Password" v-model="password">
			<div class="has-text-danger">{{ failMessage }}</div>
			<button class="button is-small" @click="doLogin">Login</button>
			<div class="columns mt-6 ml-0">
				<div class="column is-3 p-0 mr-2 has-text-centered">Don't have an account?</div>
				<button class="column is-1 p-0 button is-small" @click="goToSignup">Sign Up</button>
			</div>
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
	name: "LoginScreen",
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
		const { login } = userStore
		const { loggedIn } = storeToRefs(userStore)

		const scheduleStore = useScheduleStore()
		const { getScheduleList } = scheduleStore

		const email = ref("")
		const password = ref("")
		const failMessage = ref("")

		const doLogin = async () => {
			await login(email.value, password.value)
			if (loggedIn.value) {
				await getScheduleList(email.value)
				router.push('/dashboard')
			} else {
				failMessage.value = "Wrong E-mail or Password"
			}
		}

		const goToSignup = () => {
			router.push('/signup')
		}

		return {
			email,
			password,
			failMessage,
			doLogin,
			goToSignup
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