def parseInput(input: str) -> list[list[int]]:
    lines = input.strip().split("\n")
    return [[int(num) for num in line.split()] for line in lines]


def getLastNumbersOfDifferenceSequences(history: list[int]) -> list[int]:
    sequences = [history]

    while not all(x == 0 for x in sequences[-1]):
        current = sequences[-1]
        next_sequence = []

        for i in range(len(current) - 1):
            diff = current[i + 1] - current[i]
            next_sequence.append(diff)

        sequences.append(next_sequence)

    return [sequence[-1] for sequence in sequences]


def run() -> int:
    with open("src/09/input.txt", "r") as file:
        data = file.read()
        lines = parseInput(data)

        line_sum = 0
        for i in range(len(lines)):
            line_sum += sum(getLastNumbersOfDifferenceSequences(lines[i]))

        return line_sum


if __name__ == "__main__":
    result = run()
    print(result)
