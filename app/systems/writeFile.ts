import { writeFileSync } from "fs";

export async function writeData(path: string, data: any, dataToWrite: any) {
  try {
    console.log("Writing..");
    dataToWrite.forEach((d) => {
      data.events[d.index].date = d.time.date;
      data.events[d.index].hour = d.time.hour;
      data.events[d.index].minute = d.time.minute;
    });
    writeFileSync(path, JSON.stringify(data));
    return true;
  } catch (err) {
    return err;
  }
}
