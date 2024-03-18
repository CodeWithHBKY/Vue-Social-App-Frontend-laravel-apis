<script setup>
import Card from "@/components/Card.vue";
import { usePostStore } from "@/stores/postStore";
import CommentModal from "@/components/CommentModal.vue";
import { ref, onMounted } from "vue";
import PostModal from "@/components/Post/PostModal.vue";

const postStore = usePostStore();

postStore.getPosts();

onMounted(() => {
	Echo.private("post").listen("PostEvent", (e) => {
		postStore.addToPostArray(e.data);
	});
	Echo.private("comment").listen("CommentEvent", (e) => {
		postStore.addToCommentArray(e.data);
	});
	Echo.private("like").listen("LikeEvent", (e) => {
		console.log(e);
		postStore.addToLikeArray(e.data);
	});
});

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

const postModalIsOpen = ref(false);
const _openPostModal = () => {
	postModalIsOpen.value = true;
};

const errors = ref({});
const handleCreatePost = async (data) => {
	try {
		const formData = new FormData();
		if (data.image) {
			formData.append("image", data.image);
		}
		formData.append("text", data.text);
		await postStore.createPost(formData);
		postModalIsOpen.value = false;
	} catch (error) {
		errors.value = error.response.data.errors;
	}
};
</script>

<template>
	<div class="flex items-center flex-col gap-4 relative">
		<button
			@click="_openPostModal"
			class="sticky top-20 bg-white shadow-md px-2 py-4 rounded-full text-center font-semibold w-[90%] cursor-pointer"
		>
			What's in your mind
		</button>
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

		<PostModal @createPost="handleCreatePost" :isOpen="postModalIsOpen" :close="() => (postModalIsOpen = false)" />
	</div>
</template>
