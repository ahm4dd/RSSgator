import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./types";
export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response = await fetch(feedURL, {
    method: "GET",
    mode: "cors",
    headers: {
      "User-Agent": "ParticlePhoton",
      "Content-Type": "text/xml",
    },
  });
  const responseText = await response.text();
  const xmlParser = new XMLParser();

  const parsedXML = xmlParser.parse(responseText);
  const parsedRSS = parsedXML.rss;
  const result: RSSFeed = {
    channel: {
      title: "",
      link: "",
      description: "",
      item: [],
    },
  };
  if (parsedRSS.channel) {
    const parsedResponse: RSSFeed = parsedRSS;
    if (
      parsedResponse.channel.title &&
      parsedResponse.channel.link &&
      parsedResponse.channel.description
    ) {
      result.channel.title = parsedResponse.channel.title;
      result.channel.link = parsedResponse.channel.link;
      result.channel.description = parsedResponse.channel.description;
      if (parsedResponse.channel.item) {
        if (Array.isArray(parsedResponse.channel.item)) {
          for (const item of parsedResponse.channel.item) {
            if (item.title && item.link && item.description && item.pubDate) {
              result.channel.item.push(item);
            }
          }
        }
      }
    }
  }
  return result;
}
