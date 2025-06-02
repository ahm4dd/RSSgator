import process from "node:process";
import { registerCommand, handlerLogin, runCommand } from "./commands";
import { type CommandHandler, type CommandsRegistry } from "./commands";
async function main() {
  const obj: CommandsRegistry = {};
  obj["login"] = handlerLogin;
  const args = process.argv.slice(2);
  if (args.length == 0) {
    console.error("No arguements passed!");
    process.exit(1);
  }
  await runCommand(obj, args[0], args[1]);
  process.exit(0);
}

main();
