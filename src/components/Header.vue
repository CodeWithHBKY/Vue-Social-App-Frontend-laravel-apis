<script setup>
import { Settings, LogOut, Bell } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const navigateTo = (path) => {
	router.push(path);
};

const logout = async () => {
	try {
		await authStore.logout();
		router.push("/login");
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div
		class="sticky top-0 z-10 bg-gray-200 flex justify-between h-16 w-full border-b-2 shadow-sm py-2 px-4 border-gray-300"
	>
		<router-link to="/timeline"><img class="w-12 h-12" src="../assets/logo.svg" alt="" /></router-link>
		<div class="mt-3 flex gap-4">
			<button class="relative" @click="navigateTo('/notifications')">
				<Bell />
				<div
					v-if="authStore.user.notifications.length > 0"
					class="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"
				></div>
			</button>
			<button @click="navigateTo('/settings')">
				<Settings />
			</button>
			<button @click="logout"><LogOut /></button>
		</div>
	</div>
</template>
