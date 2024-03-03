<script setup>
import { computed } from "vue";
import { timeAgo } from "@/composables/moment";
const { post } = defineProps(["post"]);

const fullName = computed(() => {
	return post.user.first_name + " " + post.user.last_name;
});
</script>

<template>
	<div class="h-18 flex justify-start">
		<span class="w-12 h-12 bg-gray-400 rounded-full text-white flex justify-center items-center">HB</span>
		<div class="px-2 py-1 flex flex-col">
			<span class="font-semibold">{{ fullName }}</span>
			<span class="text-gray-400 text-sm">{{ timeAgo(post.created_at) }}</span>
		</div>
	</div>
</template>
