import { readConfig } from "../config";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows";
import { getUserByName } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  try {
    const feedsForCurrentUser = await getFeedFollowsForUser(user.id);
    setTimeout(() => {
      for (const feed of feedsForCurrentUser) {
        console.log(`-------------------------------`);
        console.log(`* Username :          ${feed.userName}`);
        console.log(`* Feed name:          ${feed.name}`);
        console.log(`* URL      :          ${feed.url}`);
        console.log(`-------------------------------`);
      }
    }, 1000);
  } catch (e) {
    console.log(e);
  }
}
