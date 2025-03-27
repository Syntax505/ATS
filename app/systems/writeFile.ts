 export async function writeData(data: any, dataToWrite: any) {
  try {
    console.log("Writing..");
    dataToWrite.forEach((d) => {
      data.events[d.index].date = d.time.date;
      data.events[d.index].hour = d.time.hour;
      data.events[d.index].minute = d.time.minute;
    });
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (err) {
    return err;
  }
}
