<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";
import Profile from '@/components/settings/Profile.vue'
import ChangePassword from '@/components/settings/ChangePassword.vue'

const authStore = useAuthStore();

const user = reactive(authStore.user);

const activeTab = ref("profile");
const changeTab = (tab) => {
	activeTab.value = tab;
};

const updateProfile = async (data) => {
	try {
		await authStore.handleUpdateProfile(data);
		toast.success('Profile updated');
	} catch (error) {
		console.log(error)
	}
}

const errors = ref({});
const changePassword = async (passwordData) => {
	errors.value = {};
	try {
		await authStore.handleChangePassword(passwordData);
		toast.success('Password updated');
		passwordData.current_password = ''
		passwordData.password = ''
		passwordData.password_confirmation = ''
	} catch (error) {
		errors.value = error.response.data.errors;
	}
}
</script>

<template>
	<div>
		<div class="flex justify-center gap-4 py-4 font-semibold">
			<button @click="changeTab('profile')" :class="activeTab == 'profile' && 'border-b-4 border-gray-600'">Profile</button>
			<button @click="changeTab('change-password')" :class="activeTab == 'change-password' && 'border-b-4 border-gray-600'">Change Password</button>
		</div>

		<div class="flex justify-center">
			<Profile
			    v-if="activeTab == 'profile'"
			    :user="user"
			    @updateProfile="updateProfile"
			/>
			<ChangePassword
			    v-if="activeTab == 'change-password'"
			    :errors="errors"
			    @changePassword="changePassword"
			/>
		</div>
	</div>
</template>
