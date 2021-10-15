export type Channel = {
  name: string;
  streamers: string[];
  videos: Video[];
};

export type Video = {
  link: string;
  author: string;
  streamer: string;
  category: string;
};
