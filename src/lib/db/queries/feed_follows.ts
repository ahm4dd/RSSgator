import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { sql, getTableColumns } from "drizzle-orm";
import { getFeedByUrl, getFeedById } from "./feeds";

export async function createFeedFollow(feed_id: string, user_id: string) {
  const [newFeedFollow] = await db
    .insert(feed_follows)
    .values({ user_id: user_id, feed_id: feed_id })
    .returning();
  const [result] = await db
    .select({
      userName: users.name,
      feedName: feeds.name,
      feedUrl: feeds.url,
      ...getTableColumns(feed_follows),
    })
    .from(feed_follows)
    .innerJoin(users, sql`${feed_follows.user_id} = ${users.id}`)
    .innerJoin(feeds, sql`${feed_follows.feed_id} = ${feeds.id}`)
    .where(sql`${feed_follows.id} = ${newFeedFollow.id}`);
  return result;
}

export async function getFeedFollowsForUser(user_id: string) {
  const result = await db
    .select({
      userName: users.name,
      ...getTableColumns(feeds),
    })
    .from(feed_follows)
    .innerJoin(feeds, sql`${feed_follows.feed_id} = ${feeds.id}`)
    .innerJoin(users, sql`${feed_follows.user_id} = ${users.id}`)
    .where(sql`${feed_follows.user_id} = ${user_id}`);
  return result;
}

export async function deleteFeedFollowForUser(
  user_id: string,
  feed_url: string,
) {
  const feed = await getFeedByUrl(feed_url);
  await db
    .delete(feed_follows)
    .where(
      sql`${feed_follows.user_id} = ${user_id} AND ${feed_follows.feed_id}= ${feed.id}`,
    );
}
