interface Pair {
  from: number;
  to: number;
}

const getPairs = (input: string): { a: Pair; b: Pair } => {
  const parts = input
    .split(",")
    .map((p) => p.split("-"))
    .flat();
  return {
    a: { from: +parts[0], to: +parts[1] },
    b: { from: +parts[2], to: +parts[3] },
  };
};

const p1 = async (input: string[]) =>
  input.reduce((sum, row) => {
    const { a, b } = getPairs(row);
    return (a.from <= b.from && b.to <= a.to) ||
      (b.from <= a.from && a.to <= b.to)
      ? sum + 1
      : sum;
  }, 0);

const p2 = async (input: string[]) =>
  input.reduce((sum, row) => {
    const { a, b } = getPairs(row);
    if (
      (b.from <= a.from && a.from <= b.to) ||
      (a.from <= b.from && b.from <= a.to)
    )
      return sum + 1;
    return sum;
  }, 0);

console.log(
  await((Deno.env.get("part") || "part1") === "part1" ? p1 : p2)(
    (await Deno.readTextFile("./input.txt")).trim("\n").split("\n")
  )
);
