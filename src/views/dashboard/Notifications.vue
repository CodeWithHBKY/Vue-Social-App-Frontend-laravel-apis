<script setup>
import { useAuthStore } from "@/stores/authStore";
import {} from "vue";

const auth = useAuthStore();
</script>

<template>
	<div>
		<div class="flex justify-between items-center px-4">
			<h1 class="text-2xl font-bold">Notifications</h1>

			<button @click="auth.handleAllNotificationMarkComplete" class="bg-blue-500 text-white px-4 py-1 rounded">
				Mark All as Read
			</button>
		</div>

		<!-- Notifications List -->
		<div class="flex flex-col gap-4 mt-4">
			<router-link
				v-for="n in auth.user.notifications"
				:key="n.id"
				@click="auth.handleNotificationMarkComplete(n.id)"
				:to="`/timeline?post=${n.data.post_id}`"
				class="flex gap-4 items-center"
			>
				<img class="w-12 h-12 rounded-full" src="../assets/avatar.jpg" alt="" />
				<div>
					<!-- <h1 class="font-bold">Bilal Khan</h1> -->
					<p>{{ n.data.title }}</p>
				</div>
			</router-link>
		</div>
	</div>
</template>
