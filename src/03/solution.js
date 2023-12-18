const path = "/example.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

const lines = text.split("\n");

function solvePartOne() {
  function isSymbol(value) {
    return isNaN(value) && value !== ".";
  }

  let result = 0;

  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i];
    for (const match of numbers.matchAll(/\d+/g)) {
      for (let j = match.index; j < match.index + match[0].length; j++) {
        const surrounding = [
          (lines[i - 1] ?? "")[j - 1] ?? ".",
          (lines[i - 1] ?? "")[j] ?? ".",
          (lines[i - 1] ?? "")[j + 1] ?? ".",
          (lines[i] ?? "")[j - 1] ?? ".",
          (lines[i] ?? "")[j] ?? ".",
          (lines[i] ?? "")[j + 1] ?? ".",
          (lines[i + 1] ?? "")[j - 1] ?? ".",
          (lines[i + 1] ?? "")[j] ?? ".",
          (lines[i + 1] ?? "")[j + 1] ?? ".",
        ];

        if (surrounding.some((x) => isSymbol(x))) {
          result += parseInt(match[0]);
          break;
        }
      }
    }
  }

  return result;
}

function solvePartTwo() {
  let result = 0;
  const maybeGears = new Map();

  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i];
    for (const match of numbers.matchAll(/\d+/g)) {
      for (let j = match.index; j < match.index + match[0].length; j++) {
        const surrounding = [
          (lines[i - 1] ?? "")[j - 1] ?? ".",
          (lines[i - 1] ?? "")[j] ?? ".",
          (lines[i - 1] ?? "")[j + 1] ?? ".",
          (lines[i] ?? "")[j - 1] ?? ".",
          (lines[i] ?? "")[j] ?? ".",
          (lines[i] ?? "")[j + 1] ?? ".",
          (lines[i + 1] ?? "")[j - 1] ?? ".",
          (lines[i + 1] ?? "")[j] ?? ".",
          (lines[i + 1] ?? "")[j + 1] ?? ".",
        ];

        const surroundingIndices = [
          `${i - 1},${j - 1}`,
          `${i - 1},${j}`,
          `${i - 1},${j + 1}`,
          `${i},${j - 1}`,
          `${i},${j}`,
          `${i},${j + 1}`,
          `${i + 1},${j - 1}`,
          `${i + 1},${j}`,
          `${i + 1},${j + 1}`,
        ];

        surrounding.forEach((x, index) => {
          if (x === "*") {
            const starIndex = surroundingIndices[index];
            console.log(match[0], surroundingIndices[index]);

            const prev = maybeGears.get(starIndex);

            console.log(prev);

            if (prev) {
              console.log(prev);
              prev.add(match[0]);
            } else {
              maybeGears.set(starIndex, new Set([match[0]]));
            }
          }
        });
      }
    }
  }

  console.log(maybeGears);

  return result;
}

console.log(solvePartTwo());
