import ytdl from "ytdl-core";
import ytpl from "ytpl";

export const DOWNLOAD_VIDEO = async (req, res) => {
	try {
		const { url, quality } = req.body;

		const info = await ytdl.getInfo(url);
		const stream = info.formats.find((item) => item.qualityLabel === quality);
		const { title, thumbnails } = info.videoDetails;

		const video = {
			title,
			url,
			duration: stream.approxDurationMs,
			thumbnail: thumbnails[2],
			downloadedUrl: stream.url,
			quality: stream.qualityLabel,
		};
		res.status(200).send([video]);
	} catch (error) {
		console.log(error.message);
		res.status(404).json(`DOWNLOAD_VIDEO: ${error.message}`);
	}
};

export const DOWNLOAD_PLAYLIST = async (req, res) => {
	try {
		const { url, quality } = req.body;

		const playlistId = url.slice(url.indexOf("list=") + 5);
		const playlist = await ytpl(playlistId, { limit: Infinity });

		const items = playlist.items.map(async ({ title, url, shortUrl, duration, thumbnails }, i) => {
			const info = await ytdl.getInfo(url);
			const stream =
				info.formats.find((item) => item.qualityLabel === quality && item.hasAudio) ||
				info.formats.find((item) => item.qualityLabel === "360p" && item.hasAudio) ||
				info.formats.find((item) => item.qualityLabel === "480p" && item.hasAudio) ||
				info.formats.find((item) => item.qualityLabel === "720p");

			return {
				title: `${i >= 10 ? i : `0${i + 1}`} ${title}`,
				url: shortUrl,
				duration,
				thumbnail: thumbnails[2],
				downloadedUrl: stream?.url,
				quality: stream.qualityLabel,
			};
		});

		const result = await Promise.all(items);
		res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(404).json(`DOWNLOAD_PLAYLIST: ${error.message}`);
	}
};
