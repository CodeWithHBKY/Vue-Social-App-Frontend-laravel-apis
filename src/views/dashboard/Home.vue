<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
	<div class="bg-gray-200 w-full md:w-[50%] flex flex-col">
		<Header />
		<div class="py-4">
			<router-view />
		</div>
	</div>
</template>
