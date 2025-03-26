import { detectConflicts } from "./countConflicts";

type freeSession = {
  time: { date: string; hour: string; minute: string };
};

export async function findFreeSession(data, conflict): Promise<freeSession> {

  let sessionToReturn : freeSession;
  let conflictIndex1 : number = conflict.index1;
  let endTimeEpoch = Date.parse(data.events[conflictIndex1].date + "T" + data.events[conflictIndex1].hour + ":" + data.events[conflictIndex1].minute + ":00") + Number(data.events[conflictIndex1].duration) * 60000;
  let foundSession : boolean = false;
  let foundDate : string;
  let foundHour : number;
  let foundMinute : number;
  let count : number = 1;

  let timeToAdd = {
    startingValue: 60000,
    currentValue: 60000
  }

  const sessionPromise: Promise<freeSession> = new Promise(async (resolve, reject) => {

    sessionToReturn.time = {date: "", hour: "", minute: ""};

    while (foundSession == false) {

      let newTime = endTimeEpoch + timeToAdd.currentValue;
      let newDate = new Date(newTime);
    
      data.events[conflictIndex1].date = newDate.getUTCFullYear() + "-" + newDate.getUTCMonth() + "-"+ newDate.getUTCDate();
      data.events[conflictIndex1].hour = newDate.getUTCHours();
      data.events[conflictIndex1].minute = newDate.getUTCMinutes();
    
      let result = await detectConflicts(data);
    
      if (result.totalConflicts == 0) {
    
        foundDate = newDate.getUTCFullYear() + "-" + newDate.getUTCMonth() + "-"+ newDate.getUTCDate();
        foundHour = newDate.getUTCHours().toString();
        foundMinute = newDate.getUTCMinutes().toString();
    
        timeToAdd.currentValue = timeToAdd.startingValue;
        count = 1;
        foundSession = true;
    
      sessionToReturn.time.date = foundDate;
      sessionToReturn.time.hour = foundHour;
      sessionToReturn.time.minute = foundMinute;

       resolve(sessionToReturn);
    
      } else {
    
        count += 1;
        timeToAdd.currentValue = timeToAdd.startingValue * count;
        continue;
    
      }
    
      }
  });

  sessionPromise.then((session) => {
    return session;
  })

}
