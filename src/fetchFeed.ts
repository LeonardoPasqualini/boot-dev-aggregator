import { XMLParser } from "fast-xml-parser";

export async function fetchFeed(feedURL: string) {
  const headers = new Headers({ "User-Agent": "gator" })

  try {
    const response = await fetch(feedURL, {
      method: "GET",
      mode: "cors",
      headers: headers
    });

    if (response.ok) {
      let obj = XMLToRSSFeed(await response.text())
      return validateRSSFeed(obj);
    } else {
      throw new Error(`Fetching RSS failed: ${response.status} - ${response.statusText}`)
    }

  } catch (err) {
    console.error(err);
    throw new Error(`Fetching RSS failed: ${(err as Error).message}`);
  }

}

function XMLToRSSFeed(text: string) {
  const parcer = new XMLParser({ processEntities: false });
  const obj: RSSFeed = parcer.parse(text);

  return obj;
}

function validateRSSFeed(rawObj: unknown) {
  const validationFailed = "RSSFeed validation failed:"
  if (typeof rawObj !== "object" || rawObj === null) {
    throw new Error(`${validationFailed} object is null`);
  }

  if (!("rss" in rawObj)) {
    throw new Error(`${validationFailed} object rss is missing`);
  }
  const obj = rawObj.rss

  if (typeof obj !== "object" || obj === null) {
    throw new Error(`${validationFailed} rss object is null`);
  }
  if (!("channel" in obj)) {
    throw new Error(`${validationFailed} object channel is missing`);
  }
  const channel = obj.channel;

  if (typeof channel !== "object" || channel === null) {
    throw new Error(`${validationFailed} object is null`);
  }
  if (!("title" in channel) || typeof channel.title !== "string") {
    throw new Error(`${validationFailed} object channel's title is null or not a string`);
  }
  if (!("link" in channel) || typeof channel.link !== "string") {
    throw new Error(`${validationFailed} object channel's link is null or not a string`);
  }
  if (!("description" in channel) || typeof channel.description !== "string") {
    throw new Error(`${validationFailed} object channel's description is null or not a string`);
  }
  let items: RSSItem[] = [];

  if (("item" in channel) && channel.item !== null) {

    let rawItems: unknown[] = Array.isArray(channel.item) ? channel.item : [channel.item]
  
    for (let item of rawItems) {
      try {
        let validItem = validateRSSItems(item);
        items.push(validItem);
      } catch (err) {
        console.log(`RSSItem failed validating. Skiping...: ${(err as Error).message}`)
        continue;
      }
    }

  }

  return {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: items
    }
  }

}

function validateRSSItems(obj: unknown) {
  const validationFailed = "RSSItem validation failed:"
  if (typeof obj !== "object" || obj === null) {
    throw new Error(`${validationFailed} not an object`);
  }
  if (!("title" in obj) || typeof obj.title !== "string") {
    throw new Error(`${validationFailed} object's title is not present or not a string`);
  }
  if (!("link" in obj) || typeof obj.link !== "string") {
    throw new Error(`${validationFailed} object's link is not present or not a string`);
  }
  if (!("description" in obj) || typeof obj.description !== "string") {
    throw new Error(`${validationFailed} object's description is not present or not a string`);
  }
  if (!("pubDate" in obj) || typeof obj.pubDate !== "string") {
    throw new Error(`${validationFailed} object's pubDate is not present or string`);
  }
  return {
    title: obj.title,
    link: obj.link,
    description: obj.description,
    pubDate: obj.pubDate,
  }
}

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};