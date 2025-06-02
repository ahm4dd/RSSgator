import { readFileSync, writeFileSync } from "node:fs";
import os from "os";
import path from "node:path";
export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string) {
  let cfg = readConfig();
  if (cfg !== undefined) {
    writeConfig({ dbUrl: cfg.dbUrl, currentUserName: userName });
  }
  writeConfig({ dbUrl: "postgres://example", currentUserName: userName });
}

export function readConfig(): Config | undefined {
  let file = readFileSync(getConfigFilePath(), { encoding: "utf8" });
  let cfg = JSON.parse(file);
  if (validateConfig(cfg)) {
    return { dbUrl: cfg.dbUrl, currentUserName: cfg.currentUserName };
  }
  return undefined;
}

// Helper functions

function getConfigFilePath(): string {
  return path.join(os.homedir(), "/.gatorconfig.json");
}

function writeConfig(cfg: Config) {
  let writableCfg = JSON.stringify(cfg);
  writeFileSync(getConfigFilePath(), writableCfg, { encoding: "utf8" });
}

function validateConfig(rawConfig: any): rawConfig is Config {
  return "dbUrl" in rawConfig;
}
