<script setup>
const { user } = defineProps({
    user: Object,
})
const emits = defineEmits(['updateProfile']);

const updateProfile = () => {
    emits('updateProfile', user);
}
</script>

<template>
    <div class="py-4">
		<h1 class="text-2xl py-4">Profile</h1>
        <form class="space-y-4">
            <div>
                <label for="first_name" class="block text-sm text-gray-800">First Name</label>
                <input
                    v-model="user.first_name"
                    type="text"
                    class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
                    placeholder="enter your firstname"
                />
                <small class="text-red-500"></small>
            </div>
            <div>
                <label for="last_name" class="block text-sm text-gray-800">Last Name</label>
                <input
                    v-model="user.last_name"
                    type="text"
                    class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
                    placeholder="enter your lastname"
                />
                <small class="text-red-500"></small>
            </div>
            <div>
                <label for="email" class="block text-sm text-gray-800">Email</label>
                <input
                    v-model="user.email"
                    type="email"
                    class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
                    placeholder="enter your email"
                />
            </div>
            <div class=" text-center">
                <button type="button" @click="updateProfile" class="py-2 px-4 bg-blue-500 rounded text-white">Save</button>
            </div>
        </form>
    </div>
</template>