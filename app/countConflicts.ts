import { parseData } from "./parseFile";

type IndexType = {
  index0: number;
  index1: number;
};

type ConflictResult = {
  totalConflicts: number;
  conflictIndices: IndexType[];
};

export async function detectConflicts(): Promise<ConflictResult> {
  const data: any = await parseData("./data/schedules/schedule.json");
  if (data.hasOwnProperty("code")) throw console.error(data);

  const dateArray: string[] = [];
  const hourArray: string[] = [];
  const minuteArray: string[] = [];
  const conflicts: ConflictResult = {
    totalConflicts: 0,
    conflictIndices: [],
  };

  // Populate arrays with event data
  data.events.forEach((e: any) => {
    dateArray.push(e.date);
    hourArray.push(e.hour);
    minuteArray.push(e.minute);
  });

  // Detect conflicts
  for (let i = 0; i < dateArray.length; i++) {
    for (let j = i + 1; j < dateArray.length; j++) {
      if (
        dateArray[i] === dateArray[j] && // Same date
        hourArray[i] === hourArray[j] && // Same hour
        minuteArray[i] === minuteArray[j] // Same minute
      ) {
        conflicts.totalConflicts += 1;
        conflicts.conflictIndices.push({ index0: i, index1: j });
      }
    }
  }

  return conflicts;
}
