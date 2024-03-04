<script setup>
import Card from "@/components/Card.vue";
import { usePostStore } from "@/stores/postStore";
import CommentModal from "@/components/CommentModal.vue";
import { ref } from "vue";

const postStore = usePostStore();

postStore.getPosts();

const handleLikeUnlikePost = async (id) => {
	try {
		await postStore.likeUnlikePost(id);
	} catch (error) {}
};

const selectedPost = ref({});
const commentModalIsOpen = ref(false);
const openCommentModal = (post) => {
	selectedPost.value = post;
	commentModalIsOpen.value = true;
};

const handlePostComment = async (data) => {
	try {
		postStore.postComment(data);
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="flex items-center flex-col gap-4">
		<Card
			v-for="post in postStore.posts"
			:key="post.id"
			:post="post"
			@likeUnlikePost="handleLikeUnlikePost"
			@openCommentModal="openCommentModal"
		/>
		<CommentModal
			@postComment="handlePostComment"
			:post="selectedPost"
			v-if="commentModalIsOpen"
			@close="() => (commentModalIsOpen = false)"
		/>
	</div>
</template>
