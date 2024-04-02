<script setup>
import { reactive } from "vue";
import CommentItem from "./CommentItem.vue";
import { X } from "lucide-vue-next";
import CardBody from "./Card/CardBody.vue";
import CardHeader from "./Card/CardHeader.vue";

const emits = defineEmits(["postComment", "commentPosted", "close"]);

const { post } = defineProps(["post"]);

const form = reactive({
	post_id: post.id,
	content: "",
});

const emitComment = () => {
	if (form.content == "") return;
	emits("postComment", form);
	setTimeout(() => {
		form.content = "";
	}, 500);
};
</script>
<template>
	<div class="fixed inset-0 w-full h-full flex justify-center items-center flex-col bg-black/40">
		<div class="w-[90%] md:w-[50%] bg-gray-200 pt-2 rounded-md">
			<div class="border-gray-500 border-b-2 mb-2 text-center flex justify-between">
				<div class="py-2 px-8">
					<span class="text-xl text-center font-semibold">HBilal Khan's Post</span>
				</div>
				<button @click="$emit('close')" class="text-white bg-gray-500 hover:bg-gray-700 rounded-full p-1 m-2">
					<X />
				</button>
			</div>
			<div class="overflow-y-auto max-h-[600px] min-h-96 px-2">
				<div v-if="post.id">
					<CardHeader :post="post" />
					<CardBody :post="post" />
					<CommentItem v-for="comment in post.comments" :comment="comment" :key="comment.id" />
				</div>
			</div>

			<div class="flex justify-center w-full mt-2 px-3">
				<textarea
					v-model="form.content"
					class="w-full p-2 resize-none rounded-l-lg"
					placeholder="Write a comment..."
				></textarea>
				<button
					@click="emitComment"
					class="bg-blue-500 text-white p-2 rounded-r-lg"
					:disabled="form.content == ''"
				>
					Post
				</button>
			</div>
		</div>
	</div>
</template>
