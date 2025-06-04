import { readConfig } from "../config";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerFollowing(cmdName: string, ...args: string[]) {
  try {
    const feedsForCurrentUser = await getFeedFollowsForUser(
      (await getUserByName(readConfig().currentUserName)).id,
    );
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
