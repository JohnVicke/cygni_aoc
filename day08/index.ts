const getTreeStat = (current: { x: number; y: number }, trees: number[][]) => {
  const visibles = [true, true, true, true];
  const scores = [0, 0, 0, 0];

  for (let y = current.y - 1; y > -1; y--) {
    scores[0]++;
    if (trees[y][current.x] >= trees[current.y][current.x]) {
      visibles[0] = false;
      break;
    }
  }

  for (let y = current.y + 1; y < trees.length; y++) {
    scores[1]++;
    if (trees[y][current.x] >= trees[current.y][current.x]) {
      visibles[1] = false;
      break;
    }
  }

  for (let x = current.x - 1; x > -1; x--) {
    scores[2]++;
    if (trees[current.y][x] >= trees[current.y][current.x]) {
      visibles[2] = false;
      break;
    }
  }

  for (let x = current.x + 1; x < trees[0].length; x++) {
    scores[3]++;
    if (trees[current.y][x] >= trees[current.y][current.x]) {
      visibles[3] = false;
      break;
    }
  }

  return {
    visible: visibles.find((v) => v),
    score: scores.reduce((acc, score) => acc * score, 1),
  };
};

const getTrees = (input: string[]) => {
  const trees = input.reduce(
    (acc, line) => [...acc, line.split("").map((char) => parseInt(char, 10))],
    [] as number[][]
  );

  const visibles: boolean[] = [];
  const scores: number[] = [];

  for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
      if (
        x === 0 ||
        y === 0 ||
        x === trees[y].length - 1 ||
        y === trees.length - 1
      ) {
        visibles.push(true);
        continue;
      }

      const { score, visible } = getTreeStat({ x, y }, trees);

      scores.push(score);

      if (visible) {
        visibles.push(visible);
      }
    }
  }

  return { visibles, scores };
};

const p2 = async (input: string[]) => Math.max(...getTrees(input).scores);

const p1 = async (input: string[]) => getTrees(input).visibles.length;

console.log(
  await((Deno.env.get("part") || "part1") === "part1" ? p1 : p2)(
    (await Deno.readTextFile("./input.txt")).trim("\n").split("\n")
  )
);
