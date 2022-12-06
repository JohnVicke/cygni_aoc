const getStartOfMessage = (input: string, n: number) => {
  const stream = input.split("");
  for (let i = 0; i < stream.length - n; ++i) {
    const subset = stream.slice(i, i + n);
    if (!subset.filter((c, i) => subset.indexOf(c) !== i).length) {
      return i + n;
    }
  }
};

console.log(
  getStartOfMessage(
    (await Deno.readTextFile("./input.txt")).trim(),
    await((Deno.env.get("part") || "part1") === "part1" ? 4 : 14)
  )
);
