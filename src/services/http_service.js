import axios from "axios";

export function http() {
	return axios.create({
		baseURL: "http://localhost:8000/api/",
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

export function httpFile() {
	return axios.create({
		baseURL: "http://localhost:8000/api/",
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}
