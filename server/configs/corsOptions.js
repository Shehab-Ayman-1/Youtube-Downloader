const whiteList = ["http://localhost:5173", "https://youtube-downloader-client.netlify.app"];

export const corsOrigins = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: (origin, callback) => {
		// origin = undefined -> on localhost
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable || origin === undefined) callback(null, origin);
		else callback(`${origin}: Not Allowed By CORS`);
	},
};
