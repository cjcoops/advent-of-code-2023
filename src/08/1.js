const path = "/example.txt";
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

function run() {
  const { instructions, map } = parseInput(text);

  let currentNode = "AAA";
  let steps = 0;

  while (currentNode !== "ZZZ") {
    const direction = instructions[steps % instructions.length];
    currentNode = map[currentNode][direction];
    steps++;
  }

  return steps;
}

console.log(run());
