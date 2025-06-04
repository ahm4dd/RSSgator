import { readConfig } from "../config";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length != 1 || args[0] === undefined) {
    console.log(
      "The follow command expects at least a single argument, the url",
    );
    process.exit(1);
  }
  try {
    const feed_follow = await createFeedFollow(
      args[0],
      (await getUserByName(readConfig().currentUserName)).id,
    );
    console.log(`-------------------------------`);
    console.log(`* Username :          ${feed_follow.userName}`);
    console.log(`* Feed name:          ${feed_follow.feedName}`);
    console.log(`* URL:          ${feed_follow.feedUrl}`);
    console.log(`-------------------------------`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
