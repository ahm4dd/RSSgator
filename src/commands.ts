import { exitCode } from "node:process";
import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => void;
export type CommandsRegistry = Record<string, CommandHandler>;

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length != 1 || args[0] === undefined) {
    console.error(
      "The login handler expects a single arguement, the username.",
    );
    process.exit(1);
  }
  setUser(args[0]);
  console.log(`${args[0]} has been set`);
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

export function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  if (cmdName in registry) {
    registry[cmdName](cmdName, ...args);
  }
}
