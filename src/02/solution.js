const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

const lines = text.split("\n");

const CONFIGURATION = {
  red: 12,
  green: 13,
  blue: 14,
};

function solvePartOne() {
  let result = 0;

  lines.forEach((line, index) => {
    const tooManyReds = [...line.matchAll(new RegExp(/(\d+) red/, "g"))].some(
      (match) => parseInt(match[1], 10) > CONFIGURATION.red
    );

    if (tooManyReds) {
      return;
    }

    const tooManyBlue = [...line.matchAll(new RegExp(/(\d+) blue/, "g"))].some(
      (match) => parseInt(match[1], 10) > CONFIGURATION.blue
    );

    if (tooManyBlue) {
      return;
    }

    const tooManyGreen = [
      ...line.matchAll(new RegExp(/(\d+) green/, "g")),
    ].some((match) => parseInt(match[1], 10) > CONFIGURATION.green);

    if (tooManyGreen) {
      return;
    }

    const gameId = index + 1;

    result += parseInt(gameId, 10);
  });

  return result;
}

function solvePartTwo() {
  let result = 0;

  lines.forEach((line) => {
    const reds = [...line.matchAll(new RegExp(/(\d+) red/, "g"))].map((match) =>
      parseInt(match[1], 10)
    );

    const blues = [...line.matchAll(new RegExp(/(\d+) blue/, "g"))].map(
      (match) => parseInt(match[1], 10)
    );

    const greens = [...line.matchAll(new RegExp(/(\d+) green/, "g"))].map(
      (match) => parseInt(match[1], 10)
    );

    result += Math.max(...reds) * Math.max(...blues) * Math.max(...greens);
  });

  return result;
}

console.log("Part 1: " + solvePartOne());
console.log("Part 2: " + solvePartTwo());
