const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(inputString) {
  return inputString
    .split("\n")
    .map((line) => line.split(" "))
    .map(([cards, bid]) => ({ cards, bid }));
}

const HAND_TYPES = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

const typeStrengthMap = {
  5: HAND_TYPES.FIVE_OF_A_KIND,
  "4,1": HAND_TYPES.FOUR_OF_A_KIND,
  "3,2": HAND_TYPES.FULL_HOUSE,
  "3,1,1": HAND_TYPES.THREE_OF_A_KIND,
  "2,2,1": HAND_TYPES.TWO_PAIR,
  "2,1,1,1": HAND_TYPES.ONE_PAIR,
  "1,1,1,1,1": HAND_TYPES.HIGH_CARD,
};

const orderStrengthMap = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

function determineOrderStrength(hand) {
  return hand
    .split("")
    .map((card) => orderStrengthMap[card])
    .reduce((str, value) => str + value.toString().padStart(2, "0"), "");
}

function determineTypeStrength(hand) {
  const cardCounts = {};
  for (const card of hand) {
    cardCounts[card] = (cardCounts[card] || 0) + 1;
  }

  if (cardCounts["J"]) {
    const jokerCount = cardCounts["J"];
    delete cardCounts["J"];

    if (Object.keys(cardCounts).length === 0) {
      return HAND_TYPES.FIVE_OF_A_KIND;
    }

    const mostFrequentCard = Object.entries(cardCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    cardCounts[mostFrequentCard] += jokerCount;
  }

  const counts = Object.values(cardCounts)
    .sort((a, b) => b - a)
    .toString();

  return typeStrengthMap[counts];
}

function sortHands(hands) {
  return hands
    .map((hand) => ({
      ...hand,
      typeStrength: determineTypeStrength(hand.cards),
      orderStrength: determineOrderStrength(hand.cards),
    }))
    .sort((a, b) => {
      const typeComparison = a.typeStrength - b.typeStrength;
      return typeComparison !== 0
        ? typeComparison
        : a.orderStrength - b.orderStrength;
    });
}

function run() {
  const parsedInput = parseInput(text);

  const sortedHands = sortHands(parsedInput);

  return sortedHands.reduce((res, hand, index) => {
    return res + hand.bid * (index + 1);
  }, 0);
}

console.log(run());
