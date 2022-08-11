import axiosInstance from "services/axios";

export const fetchLogs = () => {
	return axiosInstance.get(`/logs/get`).then(({ data }) => data.results);
};

export const fetchTags = () => {
	return axiosInstance.get(`/tags/get`).then(({ data }) => data.results);
};

export const addLog = (data) => {
	return axiosInstance.post(`/logs/add`, data);
};

export const addTag = (data) => {
	return axiosInstance.post(`/tags/add`, data);
};
