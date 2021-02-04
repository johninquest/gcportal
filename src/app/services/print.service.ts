import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class PrintService {
  constructor() {}

  createInvoiceImageFromHTML(targetDiv: HTMLElement) {
    html2canvas(targetDiv).then((canvas: any) => {
      let ctx = canvas.getContext("2d");
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas
        .toDataURL("image/jpeg", 1.0)
        .replace("image/png", "image/octet-stream");
      let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
      let finalJPEG = saveAs(imageGened, `QN-${datetimeNow}.JPEG`);
      return finalJPEG;
    });
  }

  createInvoicePdfFromData(invoiceData: object) {
    let payment_number: string = invoiceData["paymentNumber"].toString(),
      payment_location: string = invoiceData["paymentLocation"],
      payment_amount_before_tax: string = invoiceData[
        "paymentAmountBeforeTax"
      ].toString(),
      payment_tax_percentage: string = invoiceData[
        "paymentTaxPercentage"
      ].toString(),
      payment_amount_after_tax: string = invoiceData[
        "paymentAmountAfterTax"
      ].toString(),
      payment_for: string = invoiceData["paymentFor"],
      payment_by: string = invoiceData["paymentBy"],
      payment_extra_details: string = invoiceData["paymentExtraDetails"];
    let dateOnPdf: string = dayjs().format("DD.MM.YYYY"); // Date generated
    let doc = new jsPDF();

    let customLine = function (
      lineColor: string,
      xStartPos: number,
      xEndPos: number,
      yPos: number
    ) {
      doc.setDrawColor(lineColor);
      doc.setLineWidth(0.2);
      doc.line(xStartPos, yPos, xEndPos, yPos);
    };

    doc.setFont("helvetica");
    let page_title: string = "QUITTUNG";
    doc.setFontSize(20);
    doc.setTextColor("#808080");
    doc.text(page_title, 155, 80, "center");

    doc.setFontSize(15);
    doc.setTextColor("#808080");
    doc.text("AUSSTELLER", 10, 100, "left");
    doc.setTextColor("#000000");
    doc.text(getSavedData()[0], 10, 105, "left");
    doc.text(getSavedData()[1], 10, 110, "left");
    doc.text(getSavedData()[2], 10, 115, "left");
    doc.text(getSavedData()[3], 10, 120, "left");

    doc.setTextColor("#808080");
    doc.text("NUMMER: ", 110, 100, "left");
    customLine("#C0C0C0", 110, 200, 104);
    // grayLine(104);
    doc.text("NETTOBETRAG: ", 110, 110, "left");
    doc.text("MwSt.: ", 110, 115, "left");
    doc.text("GESAMTBETRAG: ", 110, 120, "left");
    // grayLine(122);
    customLine("#C0C0C0", 110, 200, 122);
    // doc.text("DATUM / ORT", 110, 130, "left");

    doc.setTextColor("#000000");
    doc.text(`${payment_number}`, 200, 100, "right");
    // grayLine(119);
    doc.text(`${payment_amount_before_tax} EUR`, 200, 110, "right");
    doc.text(`${payment_tax_percentage} %`, 200, 115, "right");
    doc.text(`${payment_amount_after_tax} EUR`, 200, 120, "right");

    customLine("#64B5F6", 10, 200, 130);

    doc.setTextColor("#808080");
    doc.text("VON", 10, 136, "left");
    customLine("#C0C0C0", 10, 200, 137);
    doc.text("FÜR", 10, 143, "left");
    customLine("#C0C0C0", 10, 200, 144);
    // doc.text("VERMERK", 10, 162, "left");
    customLine("#C0C0C0", 10, 200, 151);

    doc.setTextColor("#000000");
    doc.text(`${payment_by}`, 200, 136, "right");
    doc.text(`${payment_for}`, 200, 143, "right");
    // doc.text(`${payment_extra_details}`, 200, 162, "right");
    // doc.text("dankend erhalten.", 200, 150, "right");

    doc.setTextColor("#808080");
    doc.text(`ERHALTEN AM / ORT`, 10, 176, "left");
    doc.text(`UNTERSCHRIFT DES EMPFÄNGERS`, 200, 176, "right");
    customLine("#C0C0C0", 10, 80, 177);
    customLine("#C0C0C0", 100, 200, 177);

    doc.setTextColor("#000000");
    doc.text(
      `${dateOnPdf} / ${payment_location.toUpperCase()}`,
      10,
      183,
      "left"
    );

    doc.setTextColor("#808080");
    doc.text("VERMERK", 10, 230, "left");
    customLine("#C0C0C0", 10, 200, 231);
    doc.setTextColor("#000000");
    doc.text(`${payment_extra_details}`, 10, 236, "left");

    let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`QN-${datetimeNow}.PDF`);
    return finalPDF;
  }
}

const getSavedData = function () {
  let rawData = localStorage.getItem("belego_app_data");
  if (rawData) {
    let parsedRawData = JSON.parse(rawData);
    // console.log(parsedRawData.business_name);
    return [
      parsedRawData.business_name,
      parsedRawData.business_address,
      parsedRawData.business_phone,
      parsedRawData.business_email,
    ];
  } else {
    return ["", "", "", ""];
  }
};
