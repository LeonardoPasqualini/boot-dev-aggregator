import { handlerAgg } from "./commands/agg.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commandHandler.js";
import { handlerAddFeed, handlerFeeds } from "./commands/feeds.js";
import { handlerLogin } from "./commands/login.js";
import { handlerRegister, handlerReset, handlerUsers } from "./commands/users.js";


async function main() {
  const commands: CommandsRegistry = {}
  registerCommand(commands, "login", handlerLogin);
  registerCommand(commands, "register", handlerRegister);
  registerCommand(commands, "reset", handlerReset);
  registerCommand(commands, "users", handlerUsers);
  registerCommand(commands, "agg", handlerAgg);
  registerCommand(commands, "addfeed", handlerAddFeed);
  registerCommand(commands, "feeds", handlerFeeds);
  
  const cleanArgs = process.argv.slice(2)

  if(cleanArgs.length === 0) {
    console.log("Not enough arguments were provided.");
    process.exit(1);
  }

  const cmdName = cleanArgs[0];
  const args = cleanArgs.slice(1)

  try {
    await runCommand(commands, cmdName, ...args);
  } catch (err) {
    console.log((err as Error).message);
    process.exit(1);
  }
  process.exit(0);

}

main();