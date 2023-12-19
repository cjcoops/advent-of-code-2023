const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

const cards = text.split("\n");

function splitString(str) {
  const substrings = [];
  for (let i = 0; i < str.length; i += 3) {
    substrings.push(str.slice(i, i + 3));
  }
  return substrings;
}

function solvePartOne() {
  let result = 0;

  cards.forEach((card) => {
    const [cardAndWinners, myNumbers] = card.split("|");
    const [_, winners] = cardAndWinners.split(":");

    let numberOfWinners;

    splitString(myNumbers).forEach((number) => {
      if (winners.includes(number)) {
        numberOfWinners = numberOfWinners ? numberOfWinners * 2 : 1;
      }
    });

    result += numberOfWinners ?? 0;
  });

  return result;
}

function solvePartTwo() {}

console.log("Part 1: " + solvePartOne());
console.log("Part 2: " + solvePartTwo());
