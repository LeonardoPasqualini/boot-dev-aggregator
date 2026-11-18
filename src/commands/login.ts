import { setUser } from "../config.js";
import { getUser } from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if(args.length === 0) {
    throw new Error("login command expect a single argument, the username");
  }
  const name = args[0]
  if( typeof name !== "string" ) {
    throw new Error("username must be a string");
  }
  const username = await getUser(name);
  if(!username) {
    throw new Error(`${name} not found.`);
  }
  setUser(username.name);
  console.log(`${username.name} logged in.`);
}