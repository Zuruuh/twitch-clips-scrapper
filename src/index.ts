import puppeteer, { Browser, Page } from "puppeteer";
import { channels } from "./data/data";
import { parseStreamers } from "./utils/parseStreamers";

import type { Channel, Video } from "./types/types";

async function setupBrowser(): Promise<{ browser: Browser; page: Page }> {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1400,
    height: 800,
  });

  return {
    browser,
    page,
  };
}

async function main(channels: Channel[]) {
  const { browser, page } = await setupBrowser();

  const res = [];
  for (const channel of channels) {
    res.push(await parseStreamers(page, channel.streamers));
  }

  await browser.close();
  return Promise.resolve(res);
}

main(channels).then((videos) => {
  console.log(videos);
});
