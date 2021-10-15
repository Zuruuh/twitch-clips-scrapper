import { Page } from "puppeteer";
import { parseClips } from "./parseClips";
import type { Video } from "../types/types";

export async function parseStreamers(
  page: Page,
  streamers: string[]
): Promise<Video[][]> {
  const list: Video[][] = [];
  for (let i = 0; i < streamers.length; ++i) {
    await page.goto(
      `https://twitch.tv/${streamers[i]}/clips?filter=clips&range=7d`,
      {
        waitUntil: "networkidle2",
      }
    );

    const clips = await parseClips(page);

    const Videos: Video[] = clips.map((clip) => {
      return {
        link: clip[0]?.split("?")[0],
        category: clip[3]?.replace("%20", " "),
      } as Video;
    });
    list.push(Videos);
  }
  return list;
}
