import { detectConflicts } from "./app/countConflicts";
import { findFreeSession } from "./app/findFreeSession";
import { parseData } from "./app/parseFile";

const data: any = await parseData("./data/schedules/schedule.json");
if (data.hasOwnProperty("code")) throw console.error(data);

const conflictingIndices: Object[] = [];

// Run the conflict detection and log the results
detectConflicts(data)
  .then((result) => {

    console.log("Conflict Detection Result:", result);

    if (result.totalConflicts > 0) {
      result.conflictIndices.forEach((conflict) => {
        conflictingIndices.push(conflict);
      });

    if (conflictingIndices.length > 0) {
      conflictingIndices.forEach((conflict) => {
      findFreeSession(data, conflict).then((result) => {
        console.log("Free Session Result:", result);
      });
    });
    }
  }})
  .catch((error) => {
    console.error("Error detecting conflicts:", error);
  });
