<script setup>
import { computed } from "vue";
import { timeAgo } from "@/composables/moment";
const props = defineProps(["comment"]);

const fullName = computed(() => {
	return props.comment.user.first_name + " " + props.comment.user.last_name;
});
</script>

<template>
	<div class="flex items-center gap-2 bg-gray-500/70 py-2 my-2 px-6 rounded-lg text-white">
		<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user" class="w-8 h-8 rounded-full" />
		<div class="flex flex-col">
			<p class="font-semibold">
				{{ fullName }}
				<span class="text-xs text-gray-200">{{ timeAgo(comment.created_at) }}</span>
			</p>
			<p></p>
			<p class="text-sm">{{ comment.content }}</p>
		</div>
	</div>
</template>
