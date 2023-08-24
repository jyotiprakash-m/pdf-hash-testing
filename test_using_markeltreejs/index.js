const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

const leaves = ["a", "b", "c", "g", "t"].map((x) => SHA256(x));

const tree = new MerkleTree(leaves, SHA256);
const leaf = SHA256("g");
const root = tree.getRoot().toString("hex");
console.log(tree);
const proof = tree.getProof(leaf);
console.log("Root is: ", root);
console.log("Is a is in the merkle tree: ", tree.verify(proof, leaf, root));
