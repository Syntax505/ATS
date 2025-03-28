 import jsPDF from "jspdf";
 import autoTable from "jspdf-autotable";
 
 export async function writeData(data: any, dataToWrite: any) {
  try {
    console.log("Writing..");
    let bodyArray: string[][] = [];
    dataToWrite.forEach((d) => {
      data.events[d.index].date = d.time.date;
      data.events[d.index].hour = d.time.hour;
      data.events[d.index].minute = d.time.minute;
    });
    data.events.forEach((e) => {
      bodyArray.push([e.title, e.date, e.hour + ":" + e.minute]);
    });
    const date = new Date()
    const doc = new jsPDF();
    doc.text(`Timetable - Generated on ${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate}`,10,10,{align: "center", horizontalScale: 5});
    autoTable(doc, {startY: 20, head: [["Event Name", "Event Date", "Event Time"]], body: [bodyArray]});
    const jsonString = JSON.stringify(data, null, 2);
    const blob = doc.output("blob", )
    const url = URL.createObjectURL(blob);
    return url;
  } catch (err) {
    return err;
  }
}
