const debounce = (func, wait) => {
	let timer;
	return (...args) => {
		const ctx = this;
		clearTimeout(timer);
		timer = setTimeout(() => { timer = null; func.apply(ctx, args) }, wait);
	};
};

export default debounce;
