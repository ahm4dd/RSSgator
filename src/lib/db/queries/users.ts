import { db } from "..";
import { users } from "../schema";
import { sql } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(sql`${users.name} = ${name}`);
  return result;
}

export async function truncateUsers() {
  await db.delete(users);
}

export async function getUsers() {
  const result = db.select().from(users);
  return result;
}

export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`);
  return user;
}
