import { addFeed, getAllFeeds } from "../lib/db/queries/feeds";
import { Feed, User } from "./../lib/db/schema";
import { getUserById } from "../lib/db/queries/users";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2 || args[1] === undefined) {
    console.log(
      "The addFeed command expects 2 arguements, the name, and the url.",
    );
    process.exit(1);
  }
  try {
    await addFeed(args[0], args[1]);
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
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
    console.log(`-------------------------------`);
  }
}
