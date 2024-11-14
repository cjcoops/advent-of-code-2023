const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(inputString) {
  const [timeLine, distanceLine] = inputString.split("\n");
  const times = timeLine.match(/\d+/g).map(Number);
  const distances = distanceLine.match(/\d+/g).map(Number);

  return times.map((time, index) => ({ time, distance: distances[index] }));
}

function getDistanceTravelled(raceTime, holdTime) {
  return (raceTime - holdTime) * holdTime;
}

// Could do this with quadratic formula if slow
function getNumberOfWinners(race) {
  let count = 0;

  for (let i = 0; i <= race.time; i++) {
    const distance = getDistanceTravelled(race.time, i);
    if (distance > race.distance) {
      count++;
    }
  }

  return count;
}

function solvePartOne() {
  return parseInput(text)
    .map(getNumberOfWinners)
    .reduce((acc, curr) => acc * curr, 1);
}

console.log("Part 1: " + solvePartOne());
