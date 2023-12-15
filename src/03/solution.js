const path = "/example.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function isSymbol(value) {
  return isNaN(value) && value !== ".";
}

const schematic = text.split("\n");

console.log(schematic);

const lineIndex = 0;
const numbers = schematic[lineIndex].matchAll(new RegExp(/\d+/g));
console.log([...numbers].map((m) => ({ m, index: m.index })));

const number = 467;
const columnIndex = 0;

console.log(schematic[1][3]);
