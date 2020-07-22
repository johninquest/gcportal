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
    let guestTitle: string = "GAST INFORMATION";
    let businessTitle: string = "GASTSTÄTTE INFORMATION";

    let doc = new jsPDF();
    doc.text(timestampOnPdf, 80, 80);
    doc.text(guestTitle, 80, 95);
    doc.text(`${guestNames}`, 80, 100);
    doc.text(`${guestPhone}`, 80, 105);
    doc.text(`${guestEmail}`, 80, 110);
    doc.text(`${arrivedAt}`, 80, 120);
    doc.text(`${tableNumber}`, 80, 125);
    doc.text(`${departedAt}`, 80, 130);
    doc.text(businessTitle, 80, 140);
    doc.text(`${businessName}`, 80, 145);
    doc.text(`${businessAddress}`, 80, 150);
    doc.text(`${businessPhone}`, 80, 155);
    doc.text(`${businessEmail}`, 80, 160);

    let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`BN-${datetimeNow}.PDF`);
    return finalPDF;
  }

  htmlToPDF(targetDiv: HTMLElement) {
    console.log(targetDiv);
    let doc = new jsPDF();
    // let doc = new jsPDF("p", "pt", "a4");
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
