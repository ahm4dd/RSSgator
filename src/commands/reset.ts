import { truncateFeeds } from "../lib/db/queries/feeds";
import { truncateUsers } from "../lib/db/queries/users";
export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length != 0) {
    console.log("The reset handler expects no arguements.");
    process.exit(1);
  } else {
    await truncateUsers();
    await truncateFeeds();
  }
}
