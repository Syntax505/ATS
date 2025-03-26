import { readFileSync } from "fs";

export async function parseData(path: string) {
  try {
    let data = readFileSync(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return err;
  }
}
