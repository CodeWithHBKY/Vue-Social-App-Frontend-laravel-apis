<script setup>
import CardHeader from "./Card/CardHeader.vue";
import CardFooter from "./Card/CardFooter.vue";
import CardBody from "./Card/CardBody.vue";

const { post } = defineProps(["post"]);
</script>
<template>
	<div class="bg-white w-[90%] rounded-lg flex flex-col px-4 py-2">
		<CardHeader :post="post" />
		<CardBody :post="post" />
		<CardFooter
			:post="post"
			@likeUnlikePost="$emit('likeUnlikePost', $event)"
			@openCommentModal="$emit('openCommentModal', post)"
		/>
	</div>
</template>
