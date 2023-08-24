const { PDFDocument, PDFName, PDFString } = require("pdf-lib");
const fs = require("fs");

async function extractMetadataFromPDF() {
  const pdfBytes = fs.readFileSync("output.pdf");

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Access the info dictionary
  const infoDict = pdfDoc.getInfoDict();

  // Retrieve the custom metadata entry
  const customMetadataEntry = infoDict.get(PDFName.of("merkleTree"));

  let metadata = {};

  // If the custom metadata entry exists
  if (customMetadataEntry instanceof PDFString) {
    const jsonMetadata = customMetadataEntry.decodeText();
    metadata = JSON.parse(jsonMetadata);
  }

  console.log("Merkle Tree:", metadata);
}

extractMetadataFromPDF().catch((error) => {
  console.log("An error occurred:", error);
});
