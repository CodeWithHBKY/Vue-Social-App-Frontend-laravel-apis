<script setup>
import { reactive } from 'vue';
const emits = defineEmits(['changePassword']);

const { errors } = defineProps(['errors']);

const passwordData = reactive({})

const changePassword = () => {
    emits('changePassword', passwordData);
}
</script>

<template>
    <div class="py-4">
        <div class="space-y-4">
            <h1 class="font-semibold">Change Password</h1>
            <div>
                <label class="block text-sm text-gray-800">Current Password</label>
                <input
                    v-model="passwordData.current_password"
                    type="password"
                    class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
                    placeholder="Current Password"
                />
                <small class="text-red-500" v-if="errors.current_password">{{ errors.current_password[0] }}</small>
            </div>
            <div>
                <label class="block text-sm text-gray-800">New Password</label>
                <input
                    v-model="passwordData.password"
                    type="password"
                    class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
                    placeholder="New Password"
                />
                <small class="text-red-500" v-if="errors.password">{{ errors.password[0] }}</small>
            </div>
            <div>
                <label class="block text-sm text-gray-800">Confirm New Password</label>
                <input
                    v-model="passwordData.password_confirmation"
                    type="password"
                    class="rounded-lg px-4 py-2 border border-gray-600 shadow leading-6 w-full"
                    placeholder="New Password Confirmation"
                />
                <small class="text-red-500"></small>
            </div>
            <div class=" text-center">
                <button type="button" @click="changePassword" class="py-2 px-4 bg-blue-500 rounded text-white">Change Password</button>
            </div>
        </div>
    </div>
</template>