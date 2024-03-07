<script setup>
import { X, Image } from "lucide-vue-next";
import { ref } from "vue";

const { isOpen, close } = defineProps(["isOpen", "close"]);

const selectedImage = ref(null);
const selectImage = (event) => {
	selectedImage.value = event.target.files[0];
};

const previewImage = (img) => {
	return URL.createObjectURL(img);
};
</script>

<template>
	<div v-if="isOpen" class="fixed z-50 inset-0 w-full h-full bg-black/50 flex items-center justify-center">
		<div class="bg-gray-200 w-[50%] max-h-[500px] rounded-lg">
			<div class="flex justify-between border-b-2 border-gray-500">
				<div class="py-2 px-8">
					<span class="text-xl text-center font-semibold">Create Post</span>
				</div>
				<button @click="close" class="text-white bg-gray-500 hover:bg-gray-700 rounded-full p-1 m-2">
					<X />
				</button>
			</div>
			<div class="p-4 h-full">
				<textarea
					:class="selectedImage ? 'min-h-12' : ' min-h-36 h-full'"
					class="w-full p-2 resize-none bg-transparent text-xl outline-none"
					placeholder="Write something..."
					autofocus
				></textarea>
				<img v-if="selectedImage" class="w-full h-32 object-cover" :src="previewImage(selectedImage)" />
				<div>
					<div>
						<label
							for="image"
							class="flex justify-center py-2 text-xl font-semibold cursor-pointer rounded-lg border-2 text-gray-700 border-gray-300"
						>
							Add To Your Post
							<Image class="text-green-500 mx-6 h-8 w-8" />
						</label>
						<input @change="selectImage" id="image" type="file" accept="image/png,jpeg,jpg" hidden />
					</div>
				</div>
				<button class="bg-blue-500 text-white p-2 rounded-lg w-full my-2">Post</button>
			</div>
		</div>
	</div>
</template>
