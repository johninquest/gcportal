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

    doc.setFont("helvetica");
    // doc.setFontSize(10);

    doc.text(`${timestampOnPdf}`, 200, 100, "right");

    doc.setTextColor("#808080");
    doc.text("GAST INFORMATION", 10, 110, "left");

    doc.setTextColor("#000000");
    doc.text(`${guestNames}`, 10, 115, "left");
    doc.text(`${guestPhone}`, 10, 120, "left");
    doc.text(`${guestEmail}`, 10, 125, "left");

    doc.setTextColor("#808080");
    doc.text("GASTSTÄTTE INFORMATION", 200, 110, "right");

    doc.setTextColor("#000000");
    doc.text(`${businessName}`, 200, 115, "right");
    doc.text(`${businessAddress}`, 200, 120, "right");
    doc.text(`${businessPhone}`, 200, 125, "right");
    doc.text(`${businessEmail}`, 200, 130, "right");

    doc.setDrawColor("#64B5F6");
    doc.setLineWidth(0.4);
    doc.line(10, 140, 200, 140);

    doc.setTextColor("#808080");
    doc.text("BEGINN DES BESUCHS", 10, 150, "left");
    doc.text("TISCHNUMMER", 10, 160, "left");
    doc.text("ENDE DES BESUCHS", 10, 170, "left");

    doc.setTextColor("#000000");
    doc.text(`${arrivedAt}`, 200, 150, "right");
    doc.text(`${tableNumber}`, 200, 160, "right");
    doc.text(`${departedAt}`, 200, 170, "right");

    doc.setDrawColor("#64B5F6");
    doc.setLineWidth(0.4);
    doc.line(10, 175, 200, 175);

    doc.setFontSize(5);
    doc.text("ERSTELLT MIT BELEGO", 100, 250, "center");

    let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`BN-${datetimeNow}.PDF`);
    return finalPDF;
  }

  htmlToPDF(targetDiv: HTMLElement) {
    console.log(targetDiv);
    let doc = new jsPDF();
    let myElementHandler = {
      "#editor": function (element, renderer) {
        return true;
      },
    };
    doc.fromHTML(targetDiv, 0, 0, {
      width: 100,
      elementHandlers: myElementHandler,
    });
    doc.save("testdoc.pdf");
  }
}
