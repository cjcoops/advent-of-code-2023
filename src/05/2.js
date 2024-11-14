const path = "/example.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(text) {
  const sections = text.split(/\n\s*\n/);
  const [seedsLine, ...mapStrings] = sections;

  const seeds = seedsLine
    .split(": ")[1]
    .split(" ")
    .map((num) => parseInt(num, 10));

  const seedRanges = seeds.reduce((acc, _, i) => {
    if (i % 2 === 0) {
      acc.push({ rangeStart: seeds[i], rangeEnd: seeds[i] + seeds[i + 1] - 1 });
    }
    return acc;
  }, []);

  const maps = mapStrings.map((mapString) =>
    parseMap(mapString.split(":\n")[1])
  );

  return { seedRanges, maps };
}

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

function mapSeedRangeThroughRanges(seedRange, maps) {
  let ranges = [seedRange];

  for (const transformations of maps) {
    const newRanges = [];

    for (const range of ranges) {
      let currentStart = range.rangeStart;
      let currentEnd = range.rangeEnd;

      for (const transform of transformations) {
        const overlapStart = Math.max(currentStart, transform.sourceStart);
        const overlapEnd = Math.min(currentEnd, transform.sourceEnd);

        if (overlapStart <= overlapEnd) {
          newRanges.push({
            rangeStart: overlapStart + transform.offset,
            rangeEnd: overlapEnd + transform.offset,
          });

          if (currentStart < overlapStart) {
            newRanges.push({
              rangeStart: currentStart,
              rangeEnd: overlapStart - 1,
            });
          }

          currentStart = overlapEnd + 1;
        }
      }

      if (currentStart <= currentEnd) {
        newRanges.push({
          rangeStart: currentStart,
          rangeEnd: currentEnd,
        });
      }
    }

    ranges = newRanges;
  }

  return ranges;
}

function solvePartTwo() {
  const { seedRanges, maps } = parseInput(text);

  let minLocation = Infinity;

  for (const seedRange of seedRanges) {
    const locationRanges = mapSeedRangeThroughRanges(seedRange, maps);
    const rangeMin = Math.min(...locationRanges.map((r) => r.rangeStart));
    minLocation = Math.min(minLocation, rangeMin);
  }

  return minLocation;
}

console.log("Part 2: " + solvePartTwo());
