import { Page } from "puppeteer";

export async function parseClips(page: Page) {
  return await page.evaluate(() => {
    const videoElement = Array.from(
      document.querySelectorAll(`.ScTower-sc-1dei8tr-0.jyKeul.tw-tower div`)
    ).slice(0, 3);
    return videoElement.map((video) =>
      Array.from(video.querySelectorAll("a")).map((link) => {
        return link.getAttribute("href");
      })
    );
  });
}
