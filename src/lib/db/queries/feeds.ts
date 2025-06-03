import { db } from "..";
import { feeds } from "../schema";
import { getUserByName } from "./users";
import { readConfig } from "../../../config";

export async function addFeed(name: string, url: string) {
  await db.insert(feeds).values({
    name: name,
    url: url,
    user_id: (await getUserByName(readConfig().currentUserName)).id,
  });
}
