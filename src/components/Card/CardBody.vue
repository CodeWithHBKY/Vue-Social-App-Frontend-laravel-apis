<script setup>
import { useCommonStore } from "@/stores/commonStore";
const { post } = defineProps(["post"]);
const commonStore = useCommonStore();
</script>

<template>
	<div class="flex flex-col justify-center pt-4 pb-2 gap-2">
		<p class="text-sm">
			{{ post.text }}
		</p>
		<img v-if="post.image" class="rounded-lg" :src="commonStore.mediaUrl + post.image" alt="" />
	</div>
</template>
