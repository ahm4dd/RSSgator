import { deleteFeedFollowForUser } from "../lib/db/queries/feed_follows";
import { User } from "../lib/db/schema";

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length != 1 || args[0] === undefined) {
    console.log(
      "The unfollow command expects at least a single argument, the url",
    );
    process.exit(1);
  }
  await deleteFeedFollowForUser(user.id, args[0]);
}
