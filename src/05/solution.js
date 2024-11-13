const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function solvePartOne() {
  const sections = text.split(/\n\s*\n/);
  const [seedsLine, ...mapStrings] = sections;

  function parseMap(inputString) {
    const ranges = inputString.split("\n").map((rule) => {
      const [destStart, sourceStart, length] = rule
        .split(" ")
        .map((value) => parseInt(value, 10));
      return {
        sourceStart,
        sourceEnd: sourceStart + length - 1,
        offset: destStart - sourceStart,
      };
    });

    return ranges.sort((a, b) => a.sourceStart - b.sourceStart);
  }

  const mapResults = mapStrings.map((mapString) => {
    return parseMap(mapString.split(":\n")[1]);
  });

  function getLocationBySeed(seedNumber) {
    return mapResults.reduce((source, ranges) => {
      const range = ranges.find(
        (r) => source >= r.sourceStart && source <= r.sourceEnd
      );
      return range ? source + range.offset : source;
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
