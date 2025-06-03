import { exitCode } from "node:process";
import { setUser } from "./config";
import { createUser, getUserByName } from "./lib/db/queries/users";
import { create } from "node:domain";

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;
export type CommandsRegistry = Record<string, CommandHandler>;

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
  }
}

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  if (cmdName in registry) {
    throw new Error(`${cmdName} already exists in the commands registry.`);
  }
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  if (cmdName in registry) {
    registry[cmdName](cmdName, ...args);
  }
}
