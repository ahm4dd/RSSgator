import { setUser, readConfig } from "./config";
function main() {
  setUser("ahm4dd");
  let cfg = readConfig()!;
  console.log(cfg);
}

main();
