import { RSSItem } from "../../../RSS/types";
import { db } from "..";
import { posts } from "../schema";
import { getUserByName, getUserById } from "./users";
import { readConfig } from "../../../config";
import { Feed, User, NewPost, Post } from "./.././../../lib/db/schema";
import { sql, asc } from "drizzle-orm";
export async function createPost(post: NewPost) {
  const [result] = await db.insert(posts).values(post).returning();
  return result;
}
