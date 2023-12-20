const path = "/example.txt";
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
  const numberOfWinnersByCard = new Map();
  const numberOfWinnersArray = [];

  cards.forEach((card) => {
    const [cardAndWinners, myNumbers] = card.split("|");
    const [cardNumber, winners] = cardAndWinners.split(":");

    let numberOfWinners = 0;

    splitString(myNumbers).forEach((number) => {
      if (winners.includes(number)) {
        numberOfWinners += 1;
      }
    });

    numberOfWinnersByCard.set(cardNumber, numberOfWinners ?? 0);
    numberOfWinnersArray.push(numberOfWinners);
  });

  console.log(numberOfWinnersByCard);
  console.log(numberOfWinnersArray);
  const numberOfCardsArray = new Array(cards.length).fill(1);

  let result = 0;

  // this needs to be recursive
  numberOfWinnersArray.forEach((cardScore, cardIndex) => {
    for (
      let index = cardIndex + 1;
      index < cardIndex + cardScore + 1;
      index++
    ) {
      console.log(index);
      numberOfCardsArray[index] += 1;
    }
  });

  console.log(numberOfCardsArray);

  return result;
}

console.log("Part 1: " + solvePartOne());
console.log("Part 2: " + solvePartTwo());
