const alphabet = "abcdefghijklmnopqrstuvwxyz";

const getPoints = (char: string) => {
  const isUppercase = char.toUpperCase() === char;
  const points = alphabet.indexOf(char.toLowerCase()) + 1;
  return isUppercase ? points + 26 : points;
};

const p1 = async (input: string[]) =>
  input.reduce((sum, comp) => {
    const half = Math.ceil(comp.length / 2);
    const c1 = comp.slice(0, half).split("");
    const c2 = comp.slice(half).split("");
    const intersections = new Set(c1.filter((e) => c2.includes(e)));
    return sum + getPoints(intersections.entries().next().value[0]);
  }, 0);

const p2 = async (input: string[]) => {
  const groups: Array<string[]> = [];

  return input.reduce((sum, comp) => {
    groups.push(comp.split(""));
    if (groups.length < 3) {
      return sum;
    }
    const intersections = new Set(
      [...new Set(groups[0].filter((e) => groups[1].includes(e)))].filter((e) =>
        groups[2].includes(e)
      )
    );
    groups.length = 0;
    return sum + getPoints(intersections.entries().next().value[0]);
  }, 0);
};

console.log(
  await((Deno.env.get("part") || "part1") === "part1" ? p1 : p2)(
    (await Deno.readTextFile("./input.txt")).trim("\n").split("\n")
  )
);
