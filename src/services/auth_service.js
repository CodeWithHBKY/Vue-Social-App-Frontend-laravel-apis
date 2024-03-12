import { http } from "./http_service";

export function register(data) {
	return http().post("auth/register", data);
}
export function login(data) {
	return http().post("auth/login", data);
}

export function updateProfile(data) {
	return http().post("auth/update-profile", data);
}

export function changePassword(data) {
	return http().post("auth/change-password", data);
}

export function logOut() {
	return http().get("auth/logout");
}

export function forgotPasswordRequest (data) {
	return http().post('auth/forget-password-request', data);
}

export function forgotPassword (data) {
	return http().post('auth/forget-password', data);
}