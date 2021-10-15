import puppeteer, { Browser, Page } from "puppeteer";
import { Channel as ChannelData } from "./data/data";
import { parseChannels } from "./utils/parseChannels";
import { saveVideos } from "./utils/saveVideos";
import { getClipVideo } from "./utils/getClipVideo";

import type { Channel } from "./types/types";

async function setupBrowser(): Promise<{ browser: Browser; page: Page }> {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome-stable", // MUST use chrome, see https://github.com/puppeteer/puppeteer/issues/5697#issuecomment-639450469
  });
  const page = await browser.newPage();

  console.log("Browser started");

  return {
    browser,
    page,
  };
}

async function main(channels: Channel): Promise<Channel> {
  const { browser, page } = await setupBrowser();

  const res = await parseChannels(page, channels);

  const clips = await getClipVideo(page, res);

  await browser.close();
  return Promise.resolve(clips);
}

main(ChannelData).then(async (channels) => {
  await saveVideos(channels);
});
