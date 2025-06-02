import { setUser, readConfig } from "./config";
function main() {
  setUser("ahm4dd");
  let cfg = readConfig()!;
  for (let key of Object.keys(cfg)) {
    console.log(key);
  }
  for (let value of Object.values(cfg)) {
    console.log(value);
  }
}

main();
