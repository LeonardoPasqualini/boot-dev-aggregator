import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { users } from "../schema.js";

export async function createUser(name: string) {
  // Array destructuring gets the first item from the returned array.
  // Drizzle returns an array of results even when there's only one row.
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

// this is bad at production, but will be handy at development
export async function deleteUsersData() {
  await db.delete(users);
}

export async function getUsers(): Promise<{name: string}[]> {
  const names: {name: string}[] = await db.select({name: users.name}).from(users);
  return names;
}