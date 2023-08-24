const { PDFDocument, PDFName, PDFString } = require("pdf-lib");
const fs = require("fs");
const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

async function addMetadataToPDF() {
  const pdfBytes = fs.readFileSync("input.pdf");

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Convert JSON object to string

  // Create and Add merkle tree

  const leaves = ["a", "b", "c", "g", "t"].map((x) => SHA256(x));

  const tree = new MerkleTree(leaves, SHA256);

  const merkleTree = JSON.stringify({
    merkle_tree: tree,
  });

  // Access the info dictionary
  const infoDict = pdfDoc.getInfoDict();

  // Set the custom metadata property
  infoDict.set(PDFName.of("merkleTree"), PDFString.of(merkleTree));

  // Serialize the PDF document
  const modifiedPdfBytes = await pdfDoc.save();

  // Write the modified PDF to the output file
  fs.writeFileSync("output.pdf", modifiedPdfBytes);
}

addMetadataToPDF()
  .then(() => {
    console.log("Metadata added successfully.");
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
