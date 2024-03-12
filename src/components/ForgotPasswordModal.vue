<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
	open: Boolean,
	close: Function,
	loader: Boolean,
	step: {
		default: "step-1",
	},
	errors: Object,
});
const emits = defineEmits(["sendOTP", "changePassword"]);

const data = reactive({
	email: "",
	code: "",
	password: "",
	password_confirmation: "",
});

const handleClose = () => {
	props.close();
	data.email = "";
	data.code = "";
	data.password = "";
	data.password_confirmation = "";
};

const handleSendOTP = () => {
	emits("sendOTP", data);
};

const handleChangePassword = () => {
	emits("changePassword", data);
};
</script>
<template>
	<div v-if="open" class="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
		<div class="bg-gray-200 min-w-[36rem] w-auto min-h-[300px] rounded-lg px-6 py-4 flex flex-col justify-between">
			<div id="step-1" v-if="step == 'step-1'">
				<h1 class="text-2xl text-gray-600 font-semibold text-center">Forgot Password ?</h1>
				<div class="py-8">
					<label for="email" class="block text-sm text-gray-800 py-3">Email</label>
					<input
						v-model="data.email"
						type="email"
						class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
						placeholder="Enter your email"
					/>
					<small class="text-red-500 text-sm" v-if="errors?.email">{{ errors.email[0] }}</small>
				</div>
			</div>
			<div v-else>
				<h1 class="text-2xl text-gray-600 font-semibold text-center">Forgot Password ?</h1>
				<div class="py-8">
					<div>
						<label class="block text-sm text-gray-800 py-3">Code</label>
						<input
							v-model="data.code"
							type="number"
							class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
							placeholder="Enter OTP"
						/>
						<small class="text-red-500 text-sm" v-if="errors?.code">{{ errors.code[0] }}</small>
					</div>
					<div>
						<label class="block text-sm text-gray-800 py-3">New Password</label>
						<input
							v-model="data.password"
							type="password"
							class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
							placeholder="Enter new password"
						/>
						<small class="text-red-500 text-sm" v-if="errors?.password">{{ errors.password[0] }}</small>
					</div>
					<div>
						<label class="block text-sm text-gray-800 py-3">Confirm Password</label>
						<input
							v-model="data.password_confirmation"
							type="password"
							class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
							placeholder="Enter confirm password"
						/>
					</div>
				</div>
			</div>
			<div>
				<div class="flex gap-1 justify-end">
					<button
						:disabled="loader"
						@click="handleClose"
						class="rounded-lg text-gray-600 hover:text-gray-900 px-4 py-2"
					>
						Cancel
					</button>
					<button
						v-if="step == 'step-1'"
						:disabled="loader"
						@click="handleSendOTP"
						class="rounded-lg text-white bg-gray-500 hover:bg-gray-700 px-4 py-2"
					>
						{{ loader ? "Sending..." : "Send" }}
					</button>
					<button
						v-else
						:disabled="loader"
						@click="handleChangePassword"
						class="rounded-lg text-white bg-gray-500 hover:bg-gray-700 px-4 py-2"
					>
						{{ loader ? "Submitting..." : "Submit" }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
