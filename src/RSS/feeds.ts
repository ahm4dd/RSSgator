import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./types";
import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds";
import { Feed, NewPost } from "../lib/db/schema";
import { createPost } from "../lib/db/queries/posts";
export async function fetchFeed(feedURL: string) {
  const res = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
      accept: "application/rss+xml",
    },
  });
  if (!res.ok) {
    throw new Error(`failed to fetch feed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const parser = new XMLParser();
  let result = parser.parse(xml);

  const channel = result.rss?.channel;
  if (!channel) {
    throw new Error("failed to parse channel");
  }

  if (
    !channel ||
    !channel.title ||
    !channel.link ||
    !channel.description ||
    !channel.item
  ) {
    throw new Error("failed to parse channel");
  }

  const items: any[] = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];

  const rssItems: RSSItem[] = [];

  for (const item of items) {
    if (!item.title || !item.link || !item.description || !item.pubDate) {
      continue;
    }

    rssItems.push({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate,
    });
  }

  const rss: RSSFeed = {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: rssItems,
    },
  };
  return rss;
}

// export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
//   const response = await fetch(feedURL, {
//     method: "GET",
//     mode: "cors",
//     headers: {
//       "User-Agent": "ParticlePhoton",
//       "Content-Type": "text/xml",
//     },
//   });
//   const responseText = await response.text();
//   const xmlParser = new XMLParser();
//
//   const parsedXML = xmlParser.parse(responseText);
//   const parsedRSS = parsedXML.rss;
//   const result: RSSFeed = {
//     channel: {
//       title: "",
//       link: "",
//       description: "",
//       item: [],
//     },
//   };
//   if (parsedRSS.channel) {
//     const parsedResponse: RSSFeed = parsedRSS;
//     if (
//       parsedResponse.channel.title &&
//       parsedResponse.channel.link &&
//       parsedResponse.channel.description
//     ) {
//       result.channel.title = parsedResponse.channel.title;
//       result.channel.link = parsedResponse.channel.link;
//       result.channel.description = parsedResponse.channel.description;
//       if (parsedResponse.channel.item) {
//         if (Array.isArray(parsedResponse.channel.item)) {
//           for (const item of parsedResponse.channel.item) {
//             if (item.title && item.link && item.description && item.pubDate) {
//               result.channel.item.push(item);
//             }
//           }
//         }
//       }
//     }
//   }
//   return result;
// }

export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();
  if (!feed) {
    console.log(`No feeds to fetch.`);
    return;
  }
  console.log(`Found a feed to fetch!`);
  scrapeFeed(feed);
}

async function scrapeFeed(feed: Feed) {
  await markFeedFetched(feed.id);

  const feedData = await fetchFeed(feed.url);
  for (let item of feedData.channel.item) {
    console.log(`Found post: %s`, item.title);

    const now = new Date();

    await createPost({
      url: item.link,
      feed_id: feed.id,
      title: item.title,
      createdAt: now,
      updatedAt: now,
      description: item.description,
      published_at: new Date(item.pubDate),
    } satisfies NewPost);
  }

  console.log(
    `Feed ${feed.name} collected, ${feedData.channel.item.length} posts found`,
  );
}
