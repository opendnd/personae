const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const doc = new PDFDocument();

const sheet1 = fs.readFileSync(path.join(assetsDir, 'sheet1.svg'), 'utf-8');
const sheet2 = fs.readFileSync(path.join(assetsDir, 'sheet2.svg'), 'utf-8');
const sheet3 = fs.readFileSync(path.join(assetsDir, 'sheet3.svg'), 'utf-8');
const sheet4 = fs.readFileSync(path.join(assetsDir, 'sheet4.svg'), 'utf-8');
const sheet5 = fs.readFileSync(path.join(assetsDir, 'sheet5.svg'), 'utf-8');

// add svg to doc
PDFDocument.prototype.addSVG = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this; // eslint-disable-line no-sequences
};

doc.pipe(fs.createWriteStream('test.pdf'));

const PDFOptions = {
  preserveAspectRatio: 'xMaxYMax',
};

doc.addSVG(sheet1, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet2, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet3, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet4, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet5, 0, 0, PDFOptions);

doc.end();
