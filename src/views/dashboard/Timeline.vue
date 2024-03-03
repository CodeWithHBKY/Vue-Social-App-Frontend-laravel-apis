<script setup>
import Card from "@/components/Card.vue";
import { usePostStore } from "@/stores/postStore";

const postStore = usePostStore();

postStore.getPosts();

const handleLikeUnlikePost = async (id) => {
	try {
		await postStore.likeUnlikePost(id);
	} catch (error) {}
};
</script>

<template>
	<div class="flex items-center flex-col gap-4">
		<Card v-for="post in postStore.posts" :key="post.id" :post="post" @likeUnlikePost="handleLikeUnlikePost" />
	</div>
</template>
