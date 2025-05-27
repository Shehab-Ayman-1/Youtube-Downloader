import sanitize from "sanitize-filename";
import ytdl from "@distube/ytdl-core";
import axios from "axios";

export const DOWNLOAD_VIDEO = async (req, res) => {
	try {
		const { url, quality } = req.body;
		if (!ytdl.validateURL(url)) return res.status(400).json({ error: "Invalid video URL" });

		const info = await ytdl.getInfo(url);
		const format = info.formats.find((f) => f.qualityLabel === quality && f.hasVideo && f.hasAudio);

		const availableQualities = info.formats.reduce((acc, format) => {
			const available = format.hasVideo && format.hasAudio && !acc.includes(format.qualityLabel);
			return available ? acc.concat(format.qualityLabel) : acc;
		}, []);

		if (!format) return res.status(404).json({ error: `The Available Qualities Are: [ ${availableQualities.join(" | ")} ]` });

		return res.status(200).json([
			{
				duration: Math.round(info.videoDetails.lengthSeconds / 60) + " m",
				thumbnail: info.videoDetails.thumbnails.at(-1),
				title: info.videoDetails.title,
				quality: format.qualityLabel,
				downloadedUrl: format.url,
				url,
			},
		]);
	} catch (error) {
		console.log(error);
		res.status(404).json(`DOWNLOAD_VIDEO: ${error.message}`);
	}
};

export const DOWNLOAD_STREAM = async (req, res) => {
	try {
		const { url, quality } = req.query;
		const info = await ytdl.getInfo(url);

		const format = info.formats.find((f) => f.qualityLabel === quality && f.hasVideo && f.hasAudio);
		const availableQualities = info.formats.reduce((acc, format) => {
			const available = format.hasVideo && format.hasAudio;
			return available && !acc.includes(format.qualityLabel) ? acc.concat(format.qualityLabel) : acc;
		}, []);

		if (!format) return res.status(404).json({ error: `The Available Qualities Are: [ ${availableQualities.join(" | ")} ]` });

		const title = sanitize(info.videoDetails.title) || "video";
		const filename = `${title}.mp4`;

		res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
		ytdl(url, { format }).pipe(res);
	} catch (error) {
		console.log(error.message);
		res.status(404).json(`DOWNLOAD_STREAM: ${error.message}`);
	}
};

export const DOWNLOAD_PLAYLIST = async (req, res) => {
	const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

	try {
		const { url, quality } = req.body;
		const playlistId = new URL(url).searchParams.get("list");

		if (!playlistId) return res.status(400).json({ error: "Invalid playlist URL" });
		const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
			params: {
				key: YOUTUBE_API_KEY,
				maxResults: 3,
				part: "snippet",
				playlistId,
			},
		});

		const videos = await Promise.all(
			data.items.map(async (item) => {
				const videoId = item.snippet.resourceId.videoId;
				const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

				try {
					const info = await ytdl.getInfo(videoUrl);
					const format = info.formats.find((f) => f.qualityLabel === quality && f.hasVideo && f.hasAudio);
					const altFormat = info.formats.find((f) => f.hasVideo && f.hasAudio);

					if (!format)
						return {
							duration: Math.round(info.videoDetails.lengthSeconds / 60) + " m",
							thumbnail: info.videoDetails.thumbnails.at(-1),
							title: info.videoDetails.title,
							quality: altFormat.qualityLabel,
							downloadedUrl: altFormat.url,
							url: videoUrl,
						};

					return {
						duration: Math.round(info.videoDetails.lengthSeconds / 60) + " m",
						thumbnail: info.videoDetails.thumbnails.at(-1),
						title: info.videoDetails.title,
						quality: format.qualityLabel,
						downloadedUrl: format.url,
						url: videoUrl,
					};
				} catch (err) {
					console.warn("Fail to fetch video:", videoUrl);
					return {
						duration: "0 m",
						thumbnail: "",
						title: "Fail to fetch video",
						quality: "----",
						downloadedUrl: "",
						url: "",
					};
				}
			})
		);

		res.status(200).json(videos);
	} catch (error) {
		console.error(error.message);
		res.status(500).json(`DOWNLOAD_PLAYLIST: ${error.message}`);
	}
};
