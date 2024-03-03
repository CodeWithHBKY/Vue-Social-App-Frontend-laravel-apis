<script setup>
import { Settings, LogOut } from "lucide-vue-next";
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
	<div class="flex justify-between h-16 w-full border-b-2 shadow-sm py-2 px-4 border-gray-300">
		<div><img class="w-12 h-12" src="../assets/logo.svg" alt="" /></div>
		<div class="mt-3 flex gap-2">
			<button @click="navigateTo('/settings')">
				<Settings />
			</button>
			<button @click="logout"><LogOut /></button>
		</div>
	</div>
</template>
