import process from "node:process";
import { registerCommand, handlerLogin, runCommand } from "./commands";
import { type CommandHandler, type CommandsRegistry } from "./commands";
function main() {
  const obj: CommandsRegistry = {};
  obj["login"] = handlerLogin;
  runCommand(obj, process.argv[2], process.argv[3]);
}

main();
