import { getDuration } from "../utils/index.js";
import sanitize from "sanitize-filename";
import ytdl from "@distube/ytdl-core";
import axios from "axios";

export const DOWNLOAD_VIDEO = async (req, res) => {
	try {
		const { url, quality } = req.body;

		const videoId = new URL(url).searchParams.get("v");
		const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

		const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
			params: { key: process.env.YOUTUBE_API_KEY, part: "snippet,contentDetails", id: videoId },
		});

		if (!data.items.length) return res.status(404).json({ error: "Video not found or restricted" });
		const { snippet, contentDetails } = data.items[0];

		const video = { duration: getDuration(contentDetails.duration), thumbnail: snippet.thumbnails.standard, title: snippet.title, url: videoUrl, quality };
		return res.status(200).json([video]);
	} catch (error) {
		console.log(error.message);
		res.status(404).json({ error: `DOWNLOAD_VIDEO: ${error.message}` });
	}
};

export const DOWNLOAD_PLAYLIST = async (req, res) => {
	try {
		const { url, quality } = req.body;
		const playlistId = new URL(url).searchParams.get("list");

		if (!playlistId) return res.status(400).json({ error: "Invalid playlist URL" });
		const playlist = { data: [], pageToken: "", hasMore: true };

		// Fetch all Playlist Items
		while (playlist.hasMore) {
			const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
				params: { key: process.env.YOUTUBE_API_KEY, maxResults: 50, part: "snippet", pageToken: playlist.pageToken, playlistId },
			});

			const data = response.data;
			playlist.data = playlist.data.concat(data.items);

			playlist.pageToken = data.nextPageToken;
			playlist.hasMore = !!playlist.pageToken;
		}

		const videos = playlist.data.map(({ snippet }) => {
			const videoId = snippet.resourceId.videoId;
			const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
			return { thumbnail: snippet.thumbnails.standard, url: videoUrl, duration: "0 m", title: snippet.title, quality };
		});

		return res.status(200).json(videos);
	} catch (error) {
		console.error(`DOWNLOAD_PLAYLIST: ${error.message}`);
		res.status(500).json({ error: `DOWNLOAD_PLAYLIST: ${error.message}` });
	}
};

export const DOWNLOAD_STREAM = async (req, res) => {
	try {
		const { url, quality } = req.query;
		const info = await ytdl.getInfo(url);

		const format = info.formats.find((f) => f.qualityLabel === quality && f.hasVideo && f.hasAudio);
		const altFormat = info.formats.find((f) => f.hasVideo && f.hasAudio);

		const title = sanitize(info.videoDetails.title) || "[hidden]";
		const filename = `${title}.mp4`;

		res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
		ytdl(url, { format: format || altFormat }).pipe(res);
	} catch (error) {
		console.log(error.message);
		res.status(404).json({ error: `DOWNLOAD_STREAM: ${error.message}` });
	}
};
