const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(text) {
  const sections = text.split(/\n\s*\n/);
  const [seedsLine, ...mapStrings] = sections;

  const seeds = seedsLine
    .split(": ")[1]
    .split(" ")
    .map((num) => parseInt(num, 10));

  const maps = mapStrings.map((mapString) =>
    parseMap(mapString.split(":\n")[1])
  );

  return { seeds, maps };
}

// Parse map section into ranges and sort ranges
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

// Map from a source through a series of ranges
function mapThroughRanges(sourceNumber, maps) {
  return maps.reduce((source, ranges) => {
    const range = ranges.find(
      (r) => source >= r.sourceStart && source <= r.sourceEnd
    );
    return range ? source + range.offset : source;
  }, sourceNumber);
}

function solvePartOne() {
  const { seeds, maps } = parseInput(text);
  const locations = seeds.map((seed) => mapThroughRanges(seed, maps));
  return Math.min(...locations);
}

console.log("Part 1: " + solvePartOne());
