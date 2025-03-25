import { parseData } from "./parseFile";

type freeSession = {
    time: {date: "", hour: "", minute: ""}
}

export async function findFreeSession(): Promise<freeSession> {
     const data: any = await parseData("./data/schedules/schedule.json");
      if (data.hasOwnProperty("code")) throw console.error(data);

const sessionToReturn : freeSession = {
    time: {date: "", hour: "", minute: ""}
} 

return sessionToReturn
}