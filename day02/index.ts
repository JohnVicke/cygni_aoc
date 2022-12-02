type Move = "rock" | "paper" | "scissor";
type MeAndOutcome = "X" | "Y" | "Z";
type Opponent = "A" | "B" | "C";

const meToMove: { [key in MeAndOutcome]: Move } = {
  X: "rock",
  Y: "paper",
  Z: "scissor",
};

const opponentToMove: { [key in Opponent]: Move } = {
  A: "rock",
  B: "paper",
  C: "scissor",
};

type Guide = {
  score: number;
  beats: Move;
  even: Move;
  lose: Move;
};

const guide: { [key in Move]: Guide } = {
  rock: {
    score: 1,
    beats: "scissor",
    even: "rock",
    lose: "paper",
  },
  paper: {
    score: 2,
    beats: "rock",
    even: "paper",
    lose: "scissor",
  },
  scissor: {
    score: 3,
    beats: "paper",
    even: "scissor",
    lose: "rock",
  },
};

const gameOutcome1 = (opponent: Guide, me: Move) => {
  if (opponent.beats === me) {
    return guide[me].score;
  } else if (opponent.lose === me) {
    return guide[me].score + 6;
  }
  return guide[me].score + 3;
};

const gameOutcome2 = (opponent: Guide, outcome: MeAndOutcome) => {
  if (outcome === "X") {
    return guide[opponent.beats].score;
  } else if (outcome === "Y") {
    return opponent.score + 3;
  }
  return guide[opponent.lose].score + 6;
};

const p1 = async (input: string[]) =>
  input.reduce((sum: number, game: string) => {
    const [opponent, me] = game.split(" ");
    return sum + gameOutcome1(guide[opponentToMove[opponent]], meToMove[me]);
  }, 0);

const p2 = async (input: string[]) =>
  input.reduce((sum: number, game: string) => {
    const [opponent, outcome] = game.split(" ");
    return (
      sum +
      gameOutcome2(guide[opponentToMove[opponent]], outcome as MeAndOutcome)
    );
  }, 0);

console.log(
  await((Deno.env.get("part") || "part1") === "part1" ? p1 : p2)(
    (await Deno.readTextFile("./input.txt")).trim("\n").split("\n")
  )
);
