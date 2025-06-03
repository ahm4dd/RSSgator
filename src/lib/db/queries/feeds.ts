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
  console.log(feed.id);
  console.log(feed.url);
  console.log(feed.name);
  console.log(feed.user_id);
  console.log(feed.createdAt);
  console.log(feed.updatedAt);
  console.log(user.id);
  console.log(user.name);
  console.log(user.createdAt);
  console.log(user.updatedAt);
}
