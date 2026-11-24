import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { feeds, users } from "../schema.js";


export async function createFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ 
    name: name,
    url: url,
    user_id: user_id
  }).returning();
  return result;
}

export async function listFeeds() {
  const result = await db.select({
    feedName: feeds.name,
    feedUrl: feeds.url,
    userName: users.name
  }).from(feeds).leftJoin(users, eq(feeds.user_id, users.id));

  return result;
}