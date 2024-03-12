<script setup>
import { reactive, ref } from "vue";
import { login } from "@/services/auth_service";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import ForgotPasswordModal from "@/components/ForgotPasswordModal.vue";
import { toast } from "vue3-toastify";

const router = useRouter();
const authStore = useAuthStore();

const user = reactive({
	email: "jon@gmail.com",
	password: "password",
});

const errors = ref({});
const handleLogin = async () => {
	try {
		const response = await login(user);
		authStore.setUser(response.data.user);
		authStore.setToken(response.data.access_token);
		router.push("/timeline");
	} catch (error) {
		errors.value = error.response.data.errors;
	}
};

const forgotPasswordModalIsOpen = ref(false);
const openForgotPasswordModal = () => {
	forgotPasswordModalIsOpen.value = true;
};

const loader = ref(false);
const step = ref("step-1");
const handleForgotPasswordRequest = async (data) => {
	try {
		loader.value = true;
		await authStore.handleForgotPasswordRequest(data);
		loader.value = false;
		step.value = "step-2";
	} catch (error) {
		loader.value = false;
		errors.value = error.response.data.errors;
	}
};
const handleForgotPassword = async (data) => {
	try {
		loader.value = true;
		await authStore.handleForgotPassword(data);
		loader.value = false;
		step.value = "step-2";
		forgotPasswordModalIsOpen.value = false;
		toast.success("Password successfully updated.");
	} catch (error) {
		loader.value = false;
		errors.value = error.response.data.errors;
	}
};
</script>
<template>
	<div class="fixed inset-0 flex flex-col min-h-full items-center justify-center px-32 py-12">
		<div class="bg-gray-200 py-10 w-[50%] rounded px-16">
			<div class="">
				<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>
			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form class="space-y-6" @submit.prevent="">
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
						<div class="flex justify-between">
							<label for="first_name" class="block text-sm text-gray-800">Password</label>
							<button
								@click="openForgotPasswordModal"
								class="block text-sm text-gray-800 hover:text-gray-950 hover:underline"
							>
								Forgot Password?
							</button>
						</div>
						<input
							v-model="user.password"
							type="password"
							class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
							placeholder="enter your password"
						/>
						<small class="text-red-500" v-if="errors.password">{{ errors.password[0] }}</small>
					</div>
					<small class="text-red-500" v-if="errors.message">{{ errors.message }}</small>
					<div class="flex justify-center">
						<button @click="handleLogin" class="rounded-lg text-white bg-blue-700 px-4 py-2">Login</button>
					</div>
				</form>

				<div class="flex justify-center mt-5">
					<span>Don't have account ?</span>
					<router-link class="ml-2 font-semibold hover:text-blue-500" to="/register">Create New</router-link>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<ForgotPasswordModal
			:loader="loader"
			:errors="errors"
			:step="step"
			@sendOTP="handleForgotPasswordRequest"
			@changePassword="handleForgotPassword"
			:open="forgotPasswordModalIsOpen"
			:close="() => (forgotPasswordModalIsOpen = false)"
		/>
	</div>
</template>
