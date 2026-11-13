import { Config, setUser, readConfig } from "./config.js";


function main() {
  let config: Config = {
    dbUrl: "postgres://example"
  }

  setUser("Teste User", config);
  console.log(readConfig());

}

main();