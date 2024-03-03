<script setup>
import { reactive, ref } from "vue";
import { register } from "@/services/auth_service";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	password_confirmation: "",
});

const errors = ref({});
const handleRegister = async () => {
	try {
		const response = await register(user);
		toast.success("Account created.");

		user.first_name = "";
		user.last_name = "";
		user.email = "";
		user.password = "";
		user.password_confirmation = "";

		setTimeout(() => {
			router.push("/login");
		}, 1000);
	} catch (error) {
		errors.value = error.response.data.errors;
	}
};
</script>
<template>
	<div class="flex flex-col min-h-full justify-center px-6 py-12">
		<div class="">
			<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Create new account
			</h2>
		</div>
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form class="space-y-6" @submit.prevent="">
				<div>
					<label for="first_name" class="block text-sm text-gray-800">First Name</label>
					<input
						v-model="user.first_name"
						type="text"
						class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
						placeholder="enter your first name"
					/>
					<small class="text-red-500" v-if="errors.first_name">{{ errors.first_name[0] }}</small>
				</div>
				<div>
					<label for="first_name" class="block text-sm text-gray-800">Last Name</label>
					<input
						v-model="user.last_name"
						type="text"
						class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
						placeholder="enter your last name"
					/>
					<small class="text-red-500" v-if="errors.last_name">{{ errors.first_name[0] }}</small>
				</div>
				<div>
					<label for="first_name" class="block text-sm text-gray-800">Email</label>
					<input
						v-model="user.email"
						type="email"
						class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
						placeholder="enter your email"
					/>
					<small class="text-red-500" v-if="errors.email">{{ errors.email[0] }}</small>
				</div>
				<div>
					<label for="first_name" class="block text-sm text-gray-800">Password</label>
					<input
						v-model="user.password"
						type="password"
						class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
						placeholder="enter your password"
					/>
					<small class="text-red-500" v-if="errors.password">{{ errors.password[0] }}</small>
				</div>
				<div>
					<label for="first_name" class="block text-sm text-gray-800">Confirm Password</label>
					<input
						v-model="user.password_confirmation"
						type="password"
						class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
						placeholder="confirm password"
					/>
				</div>
				<div class="flex justify-center">
					<button @click="handleRegister" class="rounded-lg text-white bg-blue-700 px-4 py-2">
						Create Account
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
