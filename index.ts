import { detectConflicts } from "./app/countConflicts";
import { findFreeSession } from "./app/findFreeSession";
import { parseData } from "./app/parseFile";
import { writeData } from "./app/writeFile";

type dataWriteType = {
  index: number;
  time: {
    date: string;
    hour: string;
    minute: string;
  };
};

const conflictingIndices: Object[] = [];
let dataToWrite: dataWriteType[] = [];

const data: any = await parseData("./data/schedules/schedule.json");
if (data.hasOwnProperty("code")) throw console.error(data);

// Run the conflict detection and log the results
detectConflicts(data)
  .then(async (result) => {
    console.log("Conflict Detection Result:", result);

    if (result.totalConflicts > 0) {
      result.conflictIndices.forEach((conflict) => {
        conflictingIndices.push(conflict);
      });

      if (conflictingIndices.length > 0) {
        conflictingIndices.forEach((conflict) => {
          findFreeSession(data, conflict).then((result) => {
            console.log(`Free Session Result:`, result);
            // @ts-ignore
            dataToWrite.push({ index: conflict.index1, time: result.time });

            if (
              conflictingIndices.indexOf(conflict) ===
              conflictingIndices.length - 1
            ) {
              try {
                writeData("./data/schedules/schedule.json", data, dataToWrite);
                console.log("Data written successfully!");
              } catch (err) {
                console.error(err);
              }
            }
          });
        });
      }
    }
  })
  .catch((error) => {
    console.error("Error detecting conflicts:", error);
  });
