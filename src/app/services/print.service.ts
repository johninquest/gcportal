import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import moment from "moment";

@Injectable({
  providedIn: "root",
})
export class PrintService {
  constructor() {}

  htmlToImage(targetDiv: HTMLElement) {
    html2canvas(targetDiv).then((canvas: any) => {
      let ctx = canvas.getContext("2d");
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas
        .toDataURL("image/jpeg", 1.0)
        .replace("image/png", "image/octet-stream");
      let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
      let finalJPEG = saveAs(imageGened, `BN-${datetimeNow}.JPEG`);
      return finalJPEG; // saveAs(imageGened, `TN-${datetimeNow}.JPEG`);
    });
  }

  dataToPDF(formData: object) {
    let guestNames: string = formData["guestnames"].toUpperCase(),
      guestPhone: string = formData["guestphone"],
      guestEmail: string = formData["guestemail"].toLowerCase(),
      arrivedAt: string = formData["guestarrived"],
      departedAt: string = formData["guestdeparted"],
      tableNumber: string = formData["tablenumber"].toString(),
      businessName: string = formData["businessname"].toUpperCase(),
      businessAddress: string = formData["businessaddress"].toUpperCase(),
      businessPhone: string = formData["businessphone"],
      businessEmail: string = formData["businessemail"].toLowerCase();
    let timestampOnPdf = moment().locale("de").format("LLL");

    let doc = new jsPDF();
    doc.text(timestampOnPdf, 100, 90);
    doc.text(`${guestNames}`, 100, 100);
    doc.text(`${guestPhone}`, 100, 110);
    doc.text(`${guestEmail}`, 100, 120);
    doc.text(`${arrivedAt}`, 100, 130);
    doc.text(`${tableNumber}`, 100, 140);
    doc.text(`${departedAt}`, 100, 150);
    doc.text(`${businessName}`, 100, 160);
    doc.text(`${businessAddress}`, 100, 170);
    doc.text(`${businessPhone}`, 100, 180);
    doc.text(`${businessEmail}`, 100, 190);

    let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`BN-${datetimeNow}.PDF`);
    return finalPDF;
  }

  htmlToPDF(targetDiv: HTMLElement) {
    let doc = new jsPDF();
    // let doc = new jsPDF("p", "pt", "a4");
    doc.fromHTML(targetDiv, 20, 20, {});
    doc.save("testdoc.pdf");
  }
}
