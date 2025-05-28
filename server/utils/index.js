export const getDuration = (isoDuration) => {
	const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
	const [, hours, minutes, seconds] = isoDuration.match(regex) || [];

	const totalMinutes = parseInt(hours || "0") * 60 + parseInt(minutes || "0") + Math.round(parseInt(seconds || "0") / 60);
	return `${totalMinutes} m`;
};
