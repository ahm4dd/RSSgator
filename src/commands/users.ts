import { readConfig, setUser } from "./../config";
import { getUserByName, createUser, getUsers } from "../lib/db/queries/users";
export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length != 1 || args[0] === undefined) {
    console.log("The login handler expects a single arguement, the username.");
    process.exit(1);
  }
  try {
    const userExists = await getUserByName(args[0]);
    if (userExists) {
      setUser(args[0]);
      console.log(`${args[0]} has been set`);
    } else {
      console.log(`${args[0]} doesn't exist in the database`);
      process.exit(1);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length != 1 || args[0] === undefined) {
    console.log(
      "The register handler expects a single arguement, the username",
    );
    process.exit(1);
  }
  try {
    const userExists = await getUserByName(args[0]);
    if (userExists) {
      console.log(`${args[0]} already exists in the database.`);
      process.exit(1);
    }
    setUser((await createUser(args[0])).name);
    console.log(`${args[0]} has been set`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export async function handlerUsers(cmdName: string, ...args: string[]) {
  try {
    const users = await getUsers();
    for (const user of users) {
      if (user.name === readConfig().currentUserName)
        console.log(`* ${user.name} (current)`);
      else console.log(`* ${user.name}`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
