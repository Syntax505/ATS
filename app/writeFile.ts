import { writeFileSync } from "fs";

export async function writeData(path: string, data: any) {
  try {
    writeFileSync(path, data);
   
  } catch (err) {
    return err;
  }
}
