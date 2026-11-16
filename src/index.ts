import { exit } from "node:process";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commandHandler.js";
import { handlerLogin } from "./commands/login.js";
import { readConfig } from "./config.js";


function main() {
  const commands: CommandsRegistry = {}
  registerCommand(commands, "login", handlerLogin)

  const cleanArgs = process.argv.slice(2)

  if(cleanArgs.length === 0) {
    console.log("Not enough arguments were provided.");
    exit(1);
  }

  const cmdName = cleanArgs[0];
  const args = cleanArgs.slice(1)

  try {
    runCommand(commands, cmdName, ...args);
  } catch (err) {
    console.log((err as Error).message);
    exit(1);
  }

  console.log(readConfig());

}

main();