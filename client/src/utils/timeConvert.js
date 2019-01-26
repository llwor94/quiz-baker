const timeConverter = num => {
	let minutes = Math.floor(num / 60);
	let seconds = num % 60;
	if (seconds === 0) return minutes + ':00';
	else return minutes + ':' + seconds;
};

export default timeConverter;
