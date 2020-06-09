const express = require ('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const doc = require('./pdf');

//Express
const app = express();
app.use(express.json());
app.use(cors());

//PDFKit
const doc = new PDFDocument();

app.get('/', (req, res) => {
    console.log('Received GET request');
    let filename = 'response.pdf';
    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    // const content = 'Hallo welt';
    // doc.y = 300
    doc.text('Documenta', 200, 100).fontSize(30).fillColor('orange')
    doc.text('Lebena unda lebena lassena', 200, 150).fontSize(10).fillColor('black')
    doc.pipe(res)
    doc.end()
});

app.post('/', (req, res) => {
    console.log('Received POST request');
    let filename = 'response.pdf';
    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    // const content = 'Hallo welt';
    doc.y = 300
    doc.text(req.body.title, 50, 50).fontSize(30).fillColor('orange');
    doc.text(req.body.passenger, 100, 100).fontSize(20).fillColor('black');
    doc.pipe(res)
    doc.end()

});

// const doc = new PDFDocument();

const port = 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));