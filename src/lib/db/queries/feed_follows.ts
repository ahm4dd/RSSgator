import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { sql, getTableColumns } from "drizzle-orm";

export async function createFeedFollow(feed_id: string, user_id: string) {
  const [newFeedFollow] = await db
    .insert(feed_follows)
    .values({ user_id: user_id, feed_id: feed_id })
    .returning();
  const [result] = await db
    .select({
      userName: users.name,
      feedName: feeds.name,
      ...getTableColumns(feed_follows),
    })
    .from(feed_follows)
    .innerJoin(users, sql`${feed_follows.user_id} = ${users.id}`)
    .innerJoin(feeds, sql`${feed_follows.user_id} = ${feeds.id}`)
    .where(sql`${feed_follows.id} = ${newFeedFollow.id}`);
  return result;
}
