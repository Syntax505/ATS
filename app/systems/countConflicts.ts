type IndexType = {
  index0: number;
  index1: number;
};

type ConflictResult = {
  totalConflicts: number;
  conflictIndices: IndexType[];
};

export async function detectConflicts(data): Promise<ConflictResult> {
  const dateArray: string[] = [];
  const hourArray: string[] = [];
  const minuteArray: string[] = [];
  const durationArray: string[] = [];
  const conflicts: ConflictResult = {
    totalConflicts: 0,
    conflictIndices: [],
  };

  // Populate arrays with event data
  data.events.forEach((e: any) => {
    dateArray.push(e.date);
    hourArray.push(e.hour);
    minuteArray.push(e.minute);
    durationArray.push(e.duration);
  });

  // Detect conflicts
  for (let i = 0; i < dateArray.length; i++) {
    for (let j = i + 1; j < dateArray.length; j++) {
      if (
        (dateArray[i] === dateArray[j] && // Same date
          hourArray[i] === hourArray[j] && // Same hour
          minuteArray[i] === minuteArray[j]) ||
        (Date.parse(
          dateArray[i] + "T" + hourArray[i] + ":" + minuteArray[i] + ":00"
        ) +
          Number(durationArray[i]) * 60000 >=
          Date.parse(
            dateArray[j] + "T" + hourArray[j] + ":" + minuteArray[j] + ":00"
          ) &&
          Date.parse(
            dateArray[i] + "T" + hourArray[i] + ":" + minuteArray[i] + ":00"
          ) +
            Number(durationArray[i]) * 60000 <
            Date.parse(
              dateArray[j] + "T" + hourArray[j] + ":" + minuteArray[j] + ":00"
            ) +
              Number(durationArray[j]) * 60000) // Overlapping events
      ) {
        conflicts.totalConflicts += 1;
        conflicts.conflictIndices.push({ index0: i, index1: j });
      }
    }
  }
console.log(conflicts);
  return conflicts;
}
