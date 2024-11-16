const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(inputString) {
  const [instructions, mapLines] = inputString.split("\n\n");

  const map = {};

  for (const line of mapLines.split("\n")) {
    const [node, destinations] = line.split(" = ");

    const [L, R] = destinations.replace("(", "").replace(")", "").split(", ");

    map[node] = { L, R };
  }

  return { instructions, map };
}

function findCycleLength(startingNode, instructions, map) {
  let currentNode = startingNode;
  let steps = 0;

  while (!currentNode.endsWith("Z")) {
    const direction = instructions[steps % instructions.length];
    currentNode = map[currentNode][direction];
    steps++;
  }

  return steps;
}

function greatestCommonDivisor(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function leastCommonMultiple(a, b) {
  return (a * b) / greatestCommonDivisor(a, b);
}

function run() {
  const { instructions, map } = parseInput(text);

  const cycleLengths = Object.keys(map)
    .filter((node) => node.endsWith("A"))
    .map((node) => findCycleLength(node, instructions, map));

  return cycleLengths.reduce((acc, curr) => {
    return leastCommonMultiple(acc, curr);
  }, 1);
}

console.log(run());
