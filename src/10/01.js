const path = "/example.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(inputString) {
  const lines = inputString.split("\n");
  let animal;

  const grid = lines.map((line, rowIndex) => {
    const lineValues = [];
    line.split("").forEach((value, colIndex) => {
      lineValues.push(value);
      if (value === "S") {
        animal = [rowIndex, colIndex];
      }
    });
    return lineValues;
  });
  return { grid, animal };
}

function run() {
  // Parse input into a 2D grid
  // Find the S
  const { grid, animal } = parseInput(text);
  console.log(grid);
  console.log(animal);
  // Starting with S, find an adjacent pipe which also has 2 pipes connected to it (or 1 pipe and the S).
  // Keep going until we reach S again.
  // Push each pipe location into a pipes array
  // Furthest is the pipe at index array length / 2
}

console.log(run());
