const crypto = require("crypto");

function createMerkleTree(hashes) {
  // Ensure the number of hashes is even
  if (hashes.length % 2 !== 0) {
    hashes.push(hashes[hashes.length - 1]);
  }

  const merkleTree = [];

  // Iterate until only one hash remains
  while (hashes.length > 1) {
    const levelHashes = [];

    // Pair adjacent hashes and compute parent hash
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = hashes[i + 1];
      const combined = left + right;
      const parentHash = crypto
        .createHash("sha256")
        .update(combined)
        .digest("hex");
      levelHashes.push(parentHash);
    }

    merkleTree.push(levelHashes);
    hashes = levelHashes;
  }

  return merkleTree;
}

// Example usage
const hashes = [
  "hash1",
  "hash2",
  "hash3",
  "hash4",
  "hash5",
  "hash6",
  "hash7",
  "hash8",
];

const merkleTree = createMerkleTree(hashes);
console.log("Merkle Tree:", merkleTree);
