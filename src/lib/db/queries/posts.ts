import { db } from "..";
import { feeds, posts, users } from "../schema";
import { NewPost } from "./.././../../lib/db/schema";
import { sql, getTableColumns } from "drizzle-orm";

export async function createPost(post: NewPost) {
  const [result] = await db.insert(posts).values(post).returning();
  return result;
}

export async function getPostsForUser(user_id: string) {
  const result = db
    .select({
      ...getTableColumns(posts),
      feed_name: feeds.name,
    })
    .from(posts)
    .innerJoin(feeds, sql`${posts.feed_id} = ${feeds.id}`)
    .innerJoin(users, sql`${feeds.user_id} = ${users.id}`)
    .where(sql`${users.id} = ${user_id}`);
  return result;
}
