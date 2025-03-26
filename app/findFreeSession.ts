import { detectConflicts } from "./countConflicts";

type freeSession = {
  time: { date: string; hour: string; minute: string };
};

export async function findFreeSession(data, conflict): Promise<freeSession> {

  let sessionToReturn : freeSession = { time: { date: "", hour: "", minute: "" } };
  let conflictIndex1 : number = conflict.index1;
  let endTimeEpoch = Date.parse(data.events[conflictIndex1].date + "T" + data.events[conflictIndex1].hour + ":" + data.events[conflictIndex1].minute + ":00") + Number(data.events[conflictIndex1].duration) * 60000;
  let foundSession : boolean = false;
  let foundDate : string;
  let foundHour : string;
  let foundMinute : string;
  let count : number = 1;

  let timeToAdd = {
    startingValue: 60000,
    currentValue: 60000
  }

    sessionToReturn.time = {date: "", hour: "", minute: ""};

    while (foundSession == false) {

      let newTime = endTimeEpoch + timeToAdd.currentValue;
      let newDate = new Date(newTime);

      console.log("newDate is " + Number(newDate.getUTCMonth() + 1));
    
      data.events[conflictIndex1].date = newDate.getUTCFullYear() + "-" + ((newDate.getUTCMonth() + 1) < 10 ? "0" + Number(newDate.getUTCMonth() + 1) : newDate.getUTCMonth() + 1) + "-"+ (newDate.getUTCDate() < 10 ? "0" + newDate.getUTCDate() : newDate.getUTCDate());
      data.events[conflictIndex1].hour = newDate.getUTCHours() < 10 ? "0" + newDate.getUTCHours() : newDate.getUTCHours();
      data.events[conflictIndex1].minute = newDate.getUTCMinutes() < 10 ? "0" + newDate.getUTCMinutes() : newDate.getUTCMinutes();
    
      let result = await detectConflicts(data);
    
      if (result.totalConflicts == 0) {
    
        foundDate = newDate.getUTCFullYear() + "-" + ((newDate.getUTCMonth() + 1) < 10 ? "0" + Number(newDate.getUTCMonth() + 1) : newDate.getUTCMonth() + 1) + "-"+ (newDate.getUTCDate() < 10 ? "0" + newDate.getUTCDate() : newDate.getUTCDate());
        foundHour = newDate.getUTCHours() < 10 ? "0" + newDate.getUTCHours().toString() : newDate.getUTCHours().toString();
        foundMinute = newDate.getUTCMinutes() < 10 ? "0" + newDate.getUTCMinutes().toString() : newDate.getUTCMinutes().toString();
    
        timeToAdd.currentValue = timeToAdd.startingValue;
        count = 1;
        foundSession = true;
    
      sessionToReturn.time.date = foundDate;
      sessionToReturn.time.hour = foundHour;
      sessionToReturn.time.minute = foundMinute;
    
      } else {
    
        count += 1;
        timeToAdd.currentValue = timeToAdd.startingValue * count;
        continue;
    
      }
    
      }

  return sessionToReturn;

}
