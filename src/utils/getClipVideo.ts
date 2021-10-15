import { Page } from "puppeteer";
import { Channel, Video } from "../types/types";

export async function getClipVideo(page: Page, channel: Channel) {
  const { videos, name, streamers } = channel;
  var videosList: Video[] = [];

  for (const video of videos) {
    const { link, author, category, streamer } = video;
    const path = `https://twitch.tv${link}`;
    console.log(`Fetching ${author}'s clip at ${path}`);

    await page.goto(path, {
      waitUntil: "networkidle2",
    });

    const source = await page.evaluate(() => {
      const videoElement = document.querySelector("video");
      return videoElement?.getAttribute("src");
    });

    videosList.push({
      author,
      category,
      streamer,
      link: source,
    } as Video);
  }
  return {
    name,
    streamers,
    videos: videosList,
  } as Channel;
}
