import { Feed, User } from "./lib/db/schema.js";

export function printFeed(feed: Feed, user: User) {
  console.log(user.name, ":");
  console.log(`\t- ${feed.name} - ${feed.url}`);
}