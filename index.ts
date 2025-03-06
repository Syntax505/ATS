import { parseData } from "./app/parseFile";

type lastDateType = {
  date: any;
  conflicts: number;
  indices: Object[];
};

let dates: string[] = [];
let hour: string[] = [];
let minute: string[] = [];
let lastDate: lastDateType = {
  date: { date: "", index: 0 },
  conflicts: 0,
  indices: [],
};

const data: any = await parseData("./data/schedules/schedule.json");
if (data.hasOwnProperty("code")) throw console.error(data);

data.events.forEach((e) => {
  dates.push(e.date);
  hour.push(e.hour);
  minute.push(e.minute);
});

for (const e of dates) {
  if (!lastDate.date.date) {
    lastDate.date.date = e; // @ts-ignore
    lastDate.date.index = dates.findIndex(e);
    continue;
  }
  if (lastDate.date.date == e) {
    lastDate.conflicts += 1;
    lastDate.indices.push({
      // @ts-ignore
      index0: dates.findIndex(e),
      index1: lastDate.date.index,
    });
  }

  lastDate.date.date = e;
}
