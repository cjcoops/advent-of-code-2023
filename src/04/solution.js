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

function solvePartTwo() {
  const numberOfWinnersArray = [];

  cards.forEach((card) => {
    const [cardAndWinners, myNumbers] = card.split("|");
    const [_, winners] = cardAndWinners.split(":");

    let numberOfWinners = 0;

    splitString(myNumbers).forEach((number) => {
      if (winners.includes(number)) {
        numberOfWinners += 1;
      }
    });

    numberOfWinnersArray.push(numberOfWinners);
  });

  const numberOfCardsArray = new Array(cards.length).fill(1);

  numberOfWinnersArray.forEach((cardScore, cardIndex) => {
    for (
      let index = cardIndex + 1;
      index < cardIndex + cardScore + 1;
      index++
    ) {
      numberOfCardsArray[index] += numberOfCardsArray[cardIndex];
    }
  });

  const result = numberOfCardsArray.reduce((sum, current) => {
    return sum + current;
  }, 0);

  return result;
}

console.log("Part 1: " + solvePartOne());
console.log("Part 2: " + solvePartTwo());
