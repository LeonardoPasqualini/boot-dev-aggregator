import { setUser } from "../config.js";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if(args.length === 0) {
    throw new Error("login command expect a single argument, the username");
  }
  const userName = args[0]
  if( typeof userName !== "string" ) {
    throw new Error("username must be a string");
  }
  setUser(args[0])
  console.log(`${args[0]} has been set.`)
}