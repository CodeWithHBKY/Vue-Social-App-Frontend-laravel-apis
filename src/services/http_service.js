import axios from "axios";

export function http() {
	return axios.create({
		baseURL: "http://localhost:8000/api/",
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}
