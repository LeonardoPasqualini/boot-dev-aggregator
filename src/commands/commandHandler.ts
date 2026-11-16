import { handlerLogin } from "./login.js";

export type CommandHandler = (cmnName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>

export function registerCommand(
  registry: CommandsRegistry, 
  cmdName: string, 
  handler: CommandHandler) {
    registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){
  const command = registry[cmdName]
  if(!command) {
    throw new Error(`Unknown command: ${cmdName}`);
  }
  command(cmdName, ...args);
}