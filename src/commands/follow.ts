import { readConfig } from "../config";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length != 1 || args[0] === undefined) {
    console.log(
      "The follow command expects at least a single argument, the url",
    );
    process.exit(1);
  }
  try {
    const feed_follow = await createFeedFollow(
      (await getFeedByUrl(args[0])).id,
      user.id,
    );
    setTimeout(() => {
      console.log(`-------------------------------`);
      console.log(`* Username :          ${feed_follow.userName}`);
      console.log(`* Feed name:          ${feed_follow.feedName}`);
      console.log(`* URL      :          ${feed_follow.feedUrl}`);
      console.log(`-------------------------------`);
    }, 1000);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
