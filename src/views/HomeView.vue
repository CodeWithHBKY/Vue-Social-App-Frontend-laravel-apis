<script setup>
import { useCommonStore } from "@/stores/commonStore";

const store = useCommonStore();
</script>

<template>
	<main>
		{{ store.test }}
		<div class="text-2xl text-red-500">Hello World</div>
	</main>
</template>
