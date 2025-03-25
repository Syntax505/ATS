import { detectConflicts } from "./app/countConflicts";

// Run the conflict detection and log the results
detectConflicts()
  .then((result) => {
    console.log("Conflict Detection Result:", result);
  })
  .catch((error) => {
    console.error("Error detecting conflicts:", error);
  });
