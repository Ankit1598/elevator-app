import { format } from "date-fns";

const formatDate = (date) => {
	return {
		primary: format(new Date(date), "EEE do LLL y p"),
		secondary: format(new Date(date), "LLL d, p"),
		tertiary: format(new Date(date), "EEE do LLL y"),
		chat: format(new Date(date), "p"),
	};
};

export default formatDate;
