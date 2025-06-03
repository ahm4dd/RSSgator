import { db } from "..";
import { feeds } from "../schema";
import { getUserByName } from "./users";
import { readConfig } from "../../../config";
import { Feed, User } from "./.././../../lib/db/schema";
import { sql } from "drizzle-orm";

export async function addFeed(name: string, url: string) {
  const user = await getUserByName(readConfig().currentUserName);
  await db.insert(feeds).values({
    name: name,
    url: url,
    user_id: user.id,
  });
  const feed = await getFeedByUrl(url);
  printFeed(feed, user);
}

export async function getFeedByUrl(url: string) {
  const [result] = await db
    .select()
    .from(feeds)
    .where(sql`${feeds.url} = ${url}`);
  return result;
}

// Helper functions

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
