import { setUser } from "./config";

type CommandHandler = (cmdName: string, ...args: string[]) => void;
type CommandsRegistry = {
  [key: string]: CommandHandler;
};

function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(
      "The login handler expects a single arguement, the username.",
    );
  }
  setUser(args[0]);
  console.log(`${args[0]} has been set`);
}

function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {}

function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {}
