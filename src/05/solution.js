const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function solvePartOne() {
  const sections = text.split(/\n\s*\n/);
  const [seedsLine, ...mapStrings] = sections;

  function parseMap(inputString) {
    const resultMap = new Map();

    inputString.split("\n").forEach((rule) => {
      let [destinationRangeStart, sourceRangeStart, rangeLength] = rule
        .split(" ")
        .map((value) => parseInt(value, 10));

      for (let x = sourceRangeStart; x < sourceRangeStart + rangeLength; x++) {
        resultMap.set(x, destinationRangeStart);
        destinationRangeStart++;
      }
    });

    return resultMap;
  }

  const mapResults = mapStrings.map((mapString) => {
    return parseMap(mapString.split(":\n")[1]);
  });

  function getLocationBySeed(seedNumber) {
    return mapResults.reduce((source, map) => {
      return map.has(source) ? map.get(source) : source;
    }, seedNumber);
  }

  const locationsBySeed = seedsLine
    .split(": ")[1]
    .split(" ")
    .map((seedNumber) => getLocationBySeed(parseInt(seedNumber, 10)));

  return Math.min(...locationsBySeed);
}

function solvePartTwo() {}

console.log("Part 1: " + solvePartOne());
console.log("Part 2: " + solvePartTwo());
