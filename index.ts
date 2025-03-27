import { detectConflicts } from "./app/systems/countConflicts";
import { findFreeSession } from "./app/systems/findFreeSession";
import { writeData } from "./app/systems/writeFile";

type dataWriteType = {
  index: number;
  time: {
    date: string;
    hour: string;
    minute: string;
  };
};

export async function run(data) {

const conflictingIndices: Object[] = [];
let dataToWrite: dataWriteType[] = [];

detectConflicts(data)
  .then(async (result) => {
    console.log("Conflict Detection Result:", result);

    if (result.totalConflicts > 0) {
      result.conflictIndices.forEach((conflict) => {
        conflictingIndices.push(conflict);
      });

      if (conflictingIndices.length > 0) {
        conflictingIndices.forEach((conflict) => {
          findFreeSession(data, conflict).then(async (result) => {
            console.log(`Free Session Result:`, result);
            // @ts-ignore
            dataToWrite.push({ index: conflict.index1, time: result.time });

            if (
              conflictingIndices.indexOf(conflict) ===
              conflictingIndices.length - 1
            ) {
              try {
               writeData(data, dataToWrite).then((url) => {
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "schedule.json";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  const button = document.getElementById("buttonToAnimate") as HTMLElement;
                  button.innerText = "File Downloaded!";
                })
                  .catch((err) => {
                    console.error("Error writing data:", err);
                  });
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


}