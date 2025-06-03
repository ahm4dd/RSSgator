import process from "node:process";
import {
  registerCommand,
  handlerLogin,
  runCommand,
  handlerRegister,
} from "./commands";
import { type CommandHandler, type CommandsRegistry } from "./commands";

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, "login", handlerLogin);
  registerCommand(commands, "register", handlerRegister);

  const args = process.argv.slice(2);
  if (args.length == 0) {
    console.log("No arguements passed!");
    process.exit(1);
  }
  try {
    await runCommand(commands, args[0], args[1]);
    setTimeout(() => process.exit(0), 5000);
  } catch (e) {
    console.error(`${e}`);
  }
}

main();
