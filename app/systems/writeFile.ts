 import jsPDF from "jspdf";
 import autoTable from "jspdf-autotable";
 
 export async function writeData(data: any, dataToWrite: any) {
  try {
    console.log("Writing..");
    let bodyArray: string[][] = [];
    let sortArray: Object[] = [];
    dataToWrite.forEach((d) => {
      data.events[d.index].date = d.time.date;
      data.events[d.index].hour = d.time.hour;
      data.events[d.index].minute = d.time.minute;
    });
    data.events.forEach((e, x)=> {
      sortArray.push({index: x, value: e, date: Date.parse(
        e.date + "T" + e.hour + ":" + e.minute + ":00")});
    });
    // @ts-ignore
    sortArray.sort((a , b) => { return a.date - b.date})
    sortArray.forEach((e) => {
      // @ts-ignore
      bodyArray.push([e.value.title, e.value.date, e.value.hour + ":" + e.value.minute]);
    });
    console.log(bodyArray); 
    const date = new Date();
    // const year = date.getUTCFullYear();
    // const month = date.getUTCMonth() + 1;
    // const dateDisplay = date.getUTCDate()
    const doc = new jsPDF();
    doc.text(`Schedule - Generated on ${date.getUTCFullYear()}-${date.getUTCMonth() + 1 < 10
      ? "0" + Number(date.getUTCMonth() + 1)
      : date.getUTCMonth() + 1}-${date.getUTCDate() < 10
        ? "0" + date.getUTCDate()
        : date.getUTCDate()}`,15,10);
    autoTable(doc, {startY: 20, head: [["Event Name", "Event Date", "Event Time"]], body: bodyArray});
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    return url
  } catch (err) {
    return err;
  }
}
