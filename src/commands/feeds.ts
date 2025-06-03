import { addFeed } from "../lib/db/queries/feeds";
import { Feed, User } from "./../lib/db/schema";
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
