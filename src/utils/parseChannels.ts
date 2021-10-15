import { Page } from "puppeteer";
import { parseClips } from "./parseClips";
import type { Channel, Video } from "../types/types";

export async function parseChannels(
  page: Page,
  channel: Channel
): Promise<Channel> {
  const videosList: Video[] = [];
  const { streamers, name } = channel;

  for (let j = 0; j < streamers.length; ++j) {
    const streamer = streamers[j];
    const path = `https://twitch.tv/${streamer}/clips?filter=clips&range=7d`;
    console.log(`Fetching ${path} ...`);
    await page.goto(path, {
      waitUntil: "networkidle2",
    });

    const clips = await parseClips(page);

    const Videos: Video[] = clips.map((clip) => {
      return {
        link: clip[0]?.split("?")[0],
        streamer,
        author: clip[2],
        category: clip[3],
      } as Video;
    });
    videosList.push(...Videos);
  }

  return {
    name,
    streamers,
    videos: videosList,
  } as Channel;
}
