import { addFeed, getAllFeeds } from "../lib/db/queries/feeds";
import { getUserById, getUserByName } from "../lib/db/queries/users";
import { handlerFollow } from "./follow";
import { readConfig } from "../config";
import { User } from "../lib/db/schema";

export async function handlerAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 2 || args[1] === undefined) {
    console.log(
      "The addFeed command expects 2 arguements, the name, and the url.",
    );
    process.exit(1);
  }
  try {
    await addFeed(args[0], args[1]);
    await handlerFollow("follow", user, args[1]);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const allFeeds = await getAllFeeds();
  for (const feed of allFeeds) {
    const user = await getUserById(feed.user_id);
    console.log(`-------------------------------`);
    console.log(`* Name:          ${feed.name}`);
    console.log(`* URL :          ${feed.url}`);
    console.log(`* User:          ${user.name}`);
    console.log(`-------------------------------`);
  }
}
