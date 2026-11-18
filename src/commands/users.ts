import { readConfig, setUser } from "../config.js";
import { createUser, deleteUsersData, getUsers } from "../lib/db/queries/users.js";


export async function handlerRegister(cmdName: string, ...args: string[]) {
  if(args.length === 0) {
    throw new Error("register command expect a single argument, the username");
  }
  const username = args[0]
  if( typeof username !== "string" ) {
    throw new Error("username must be a string");
  }

  await createUser(username);
  setUser(username);
  console.log(`${username} has been register succeffully`)
}

export async function handlerReset(cmdName: string, ...args: string[]) {
  await deleteUsersData();
  console.log("Users table was reset");
}

export async function handlerUsers(cmdName: string, ...args: string[]){
  const config = readConfig();
  const users = await getUsers();
  for(let user of users) {
    let current = config.currentUserName === user.name ? " (current)" : ""
    console.log(`* ${user.name}${current}`)
  }
}