
import { fetchFeed } from "../fetchFeed.js"

export async function handlerAgg(cmdName: string, ...args: string[]) {
  // if(args.length === 0) {
  //   throw new Error("agg command expect a single argument, the URL");
  // }
  // await fetchFeed(args[0])
  console.log(
    JSON.stringify(await fetchFeed("https://www.wagslane.dev/index.xml"))
  )
}