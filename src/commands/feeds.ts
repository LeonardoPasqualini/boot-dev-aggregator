import { readConfig } from "../config.js";
import { createFeed, listFeeds } from "../lib/db/queries/feeds.js";
import { getUser } from "../lib/db/queries/users.js";
import { printFeed } from "../printFeed.js";


export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if(args.length < 2) {
    throw new Error("addfeed command expect a two argument, the feed's name and url");
  }

  const name = args[0]
  const url = args[1]
  
  if( typeof name !== "string" ) {
    throw new Error("feed's name must be a string");
  }
  if( typeof url !== "string" ) {
    throw new Error("feed's url must be a string");
  }

  const currentUserName = readConfig().currentUserName
  if(currentUserName === undefined) {
    throw new Error("No user logged in");
  }
  const user = await getUser(currentUserName);
  if(!user) throw new Error("user not found");
  const feed = await createFeed(name, url, user.id)
  console.log(`${name} has been created succeffully`)
  printFeed(feed, user)
}

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const feedPrint = await listFeeds();
  feedPrint.map((result) => {
    console.log(`- ${result.feedName} - ${result.feedUrl} (${result.userName})`);
  })
}