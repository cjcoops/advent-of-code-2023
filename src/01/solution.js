const path = "/input.txt";
const file = Bun.file(import.meta.dir + path);

const text = await file.text();

const lines = text.split("\n");

const numberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function getCalibrationValue(inputString) {
  const matches = [];

  Object.entries(numberMap).map(([key, value]) => {
    matches.push(
      ...inputString.matchAll(new RegExp(key, "g")),
      ...inputString.matchAll(new RegExp(value, "g"))
    );
  });

  matches.sort((a, b) => a.index - b.index);

  const firstNumber = matches[0][0];
  const lastNumber = matches[matches.length - 1][0];

  const firstNumberString = numberMap[firstNumber] ?? firstNumber;
  const lastNumberString = numberMap[lastNumber] ?? lastNumber;

  return firstNumberString + lastNumberString;
}

const result = lines.reduce((prev, curr) => {
  const calibrationValue = getCalibrationValue(curr);
  return prev + parseInt(calibrationValue, 10);
}, 0);

console.log(result);
