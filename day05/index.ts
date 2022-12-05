interface Procedure {
  move: number;
  to: number;
  from: number;
}

const stacks = {
  1: ["R", "P", "C", "D", "B", "G"],
  2: ["H", "V", "G"],
  3: ["N", "S", "Q", "D", "J", "P", "M"],
  4: ["P", "S", "L", "G", "D", "C", "N", "M"],
  5: ["J", "B", "N", "C", "P", "F", "L", "S"],
  6: ["Q", "B", "D", "Z", "V", "G", "T", "S"],
  7: ["B", "Z", "M", "H", "F", "T", "Q"],
  8: ["C", "M", "D", "B", "F"],
  9: ["F", "C", "Q", "G"],
};

const printOutput = () =>
  console.log(
    Object.entries(stacks)
      .map((stack) => {
        const string = stack.join("");
        return string.charAt(string.length - 1);
      })
      .join("")
  );

const getProcedure = (row: string): Procedure => {
  const parts = row.split(" ");
  return {
    move: +parts[1],
    from: +parts[3],
    to: +parts[5],
  };
};

const p1 = async (input: string[]) => {
  const moves = input.slice(9);
  moves.map((row) => {
    const { move, from, to } = getProcedure(row);
    for (let i = 0; i < move; i++) {
      const crate = stacks[from].pop();
      stacks[to] = [...stacks[to], crate];
    }
  });
};

const p2 = async (input: string[]) => {
  const moves = input.slice(9);
  moves.map((row) => {
    const { move, from, to } = getProcedure(row);
    const toBeMoved = stacks[from].slice(-move);
    stacks[from] = stacks[from].slice(0, stacks[from].length - move);
    stacks[to] = [...stacks[to], ...toBeMoved];
  });
};

await((Deno.env.get("part") || "part1") === "part1" ? p1 : p2)(
  (await Deno.readTextFile("./input.txt")).split("\n").filter(Boolean)
);

printOutput();
