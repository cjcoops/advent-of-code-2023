const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

function parseInput(inputString) {
  const [timeLine, distanceLine] = inputString.split("\n");
  const time = Number(timeLine.match(/\d+/g).join(""));
  const distance = Number(distanceLine.match(/\d+/g).join(""));

  return { time, distance };
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

function run() {
  const race = parseInput(text);
  return getNumberOfWinners(race);
}

console.log(run());
