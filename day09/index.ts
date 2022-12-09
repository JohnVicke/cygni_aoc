type Coord = { x: number; y: number };
type Direction = "R" | "U" | "L" | "D";

export const getDistance = (head: Coord, tail: Coord) =>
  Math.floor(Math.hypot(head.x - tail.x, head.y - tail.y));

const dirToMove = {
  U: ({ x, y }: Coord) => ({ x, y: y + 1 }),
  D: ({ x, y }: Coord) => ({ x, y: y - 1 }),
  L: ({ x, y }: Coord) => ({ x: x - 1, y }),
  R: ({ x, y }: Coord) => ({ x: x + 1, y }),
};

const moveInDirection = (entity: Coord, direction: Direction) =>
  dirToMove[direction](entity);

const getKnotDirection = (head: Coord, tail: Coord) => {
  const directions: Direction[] = [];
  if (getDistance(head, tail) > 1) {
    if (head.x !== tail.x) directions.push(head.x > tail.x ? "R" : "L");
    if (head.y !== tail.y) directions.push(head.y > tail.y ? "U" : "D");
  }
  return directions;
};

export const simulation = (input: string[], nrKnots: number) => {
  const knots: Coord[] = Array(nrKnots).fill({ x: 0, y: 0 });
  return input.reduce((visited, line) => {
    const [direction, distance] = line.split(" ") as [Direction, number];
    for (let i = 0; i < distance; i++) {
      knots[0] = moveInDirection(knots[0], direction);
      for (let j = 1; j < knots.length; j++) {
        for (const dir of getKnotDirection(knots[j - 1], knots[j])) {
          knots[j] = moveInDirection(knots[j], dir);
        }
      }
      visited.add(`${knots[knots.length - 1].x},${knots[knots.length - 1].y}`);
    }
    return visited;
  }, new Set<string>()).size;
};

const input = Deno.readTextFileSync("input.txt").trim().split("\n");
console.log(simulation(input, (await Deno.env.get("part")) === "part2" ? 10 : 2));
