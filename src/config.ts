import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string,
  currentUserName?: string
}

export function setUser(userName: string, config: Config) {
  config.currentUserName = userName;
  writeConfig(config);
}

export function readConfig(): Config | null {
  const filePath = getConfigFilePath();

  const jsonConfig = fs.readFileSync(filePath, {encoding: 'utf-8'})
  try {

    const configObject = JSON.parse(jsonConfig);
    return validateConfig(configObject);

  } catch (err) {
    if (err) {
      console.log(`${err}: Trying to parce the config`);
    }
    return null;
  };
}

function writeConfig(config: Config): void {
  const snakeObj = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName
  }

  const jsonConfig = JSON.stringify(snakeObj);
  const filePath = getConfigFilePath();

  fs.writeFileSync(filePath, jsonConfig);
}

function getConfigFilePath(): string {
  const homePath = os.homedir();
  const configPath = path.join(homePath, '.gatorconfig.json')
  
  return configPath 
}

// JSON.parse is typed as any because it can return any type of object. 
// We need to validate the object to ensure it has the correct structure.
function validateConfig(rawConfig: any): Config {
  if (rawConfig === null || typeof rawConfig !== "object") {
    throw new Error("Config must be an object");
  }
  if (typeof rawConfig.db_url !== "string") {
    throw new Error("dbUrl must be a string");
  }
  if (rawConfig.current_user_name !== undefined &&
       typeof rawConfig.current_user_name !== "string") {
    throw new Error("currentUserName must be a string or undefined");
  }
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name
  };
}