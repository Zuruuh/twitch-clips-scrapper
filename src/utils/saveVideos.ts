import { writeFile } from "fs";
import { Channel } from "../types/types";
import { resolve } from "path";
// See https://github.com/node-fetch/node-fetch/issues/1279#issuecomment-915063354
const _importDynamic = new Function("modulePath", "return import(modulePath)");
async function fetch(...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
}

export async function saveVideos(channel: Channel) {
  const { videos } = channel;
  for (let i = 0; i < videos?.length; ++i) {
    const video = videos[i];
    const res = await fetch(video.link);

    const buffer = await res.buffer();
    const path = resolve(
      `${__dirname}../../../videos/${i + 1}-${video.streamer}`
    );

    writeFile(`${path}.mp4`, buffer, () => {
      console.log(`Writing file at ${path}.mp4`);
    });
  }
}
