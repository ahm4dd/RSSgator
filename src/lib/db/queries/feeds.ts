import { db } from "..";
import { feeds } from "../schema";
import { getUserByName, getUserById } from "./users";
import { readConfig } from "../../../config";
import { Feed, User } from "./.././../../lib/db/schema";
import { sql, asc } from "drizzle-orm";

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

export async function markFeedFetched(feedId: string) {
  const result = await db
    .update(feeds)
    .set({
      last_fetched_at: new Date(),
    })
    .where(sql`${feeds.id} = ${feedId}`)
    .returning();
  return result;
}

export async function getNextFeedToFetch() {
  const [result] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.last_fetched_at} desc nulls first`)
    .limit(1);
  return result;
}

export async function getFeedByUrl(url: string) {
  const [feed] = await db
    .select()
    .from(feeds)
    .where(sql`${feeds.url} = ${url}`);
  return feed;
}

export async function getFeedById(feed_id: string) {
  const [feed] = await db
    .select()
    .from(feeds)
    .where(sql`${feeds.id} = ${feed_id}`);
  return feed;
}

export async function getAllFeeds() {
  const allFeeds = await db.select().from(feeds);
  return allFeeds;
}

export async function truncateFeeds() {
  await db.delete(feeds);
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
