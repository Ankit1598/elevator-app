import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://elevator-costing.herokuapp.com/",
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
