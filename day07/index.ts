type Directory = {
  parent?: Directory;
  dirs: { [key: string]: Directory };
  files: { [key: string]: number };
};

const getSizes = (dir: Directory) => {
  const dirSizes: number[] = [];
  const getSize = (dir: Directory) => {
    let size = 0;

    for (const file in dir.files) {
      size += dir.files[file];
    }

    for (const child in dir.dirs) {
      const s = getSize(dir.dirs[child]);
      size += s;
    }

    dirSizes.push(size);
    return size;
  };
  getSize(dir);
  return dirSizes;
};

const root: Directory = {
  dirs: {},
  files: {},
};

let filePointer = root;

const getDirSizes = (input: string[]) => {
  input.forEach((line) => {
    if (line.startsWith("$", 0)) {
      const [_, cmd, arg] = line.split(" ");
      if (cmd === "cd") {
        if (arg == "/") filePointer = root;
        else if (arg == "..") filePointer = filePointer.parent!;
        else filePointer = filePointer.dirs[arg];
      }
    } else {
      const [a, b] = line.split(" ");
      if (a === "dir") {
        if (!filePointer.dirs?.[b])
          filePointer.dirs[b] = { dirs: {}, files: {}, parent: filePointer };
      } else filePointer.files[b] = +a;
    }
  });
  return getSizes(root);
};

const p1 = (input: string[]) => getDirSizes(input).filter((f) => f <= 100000).reduce((a, b) => a + b, 0);

const p2 = (input: string[]) => {
  const dirSizes = getDirSizes(input);
  const duRoot = Math.max(...dirSizes);
  return Math.min(...dirSizes.filter((f) => duRoot - f <= 70000000 - 30000000));
};

console.log(await((Deno.env.get("part") || "part1") === "part1" ? p1 : p2)((await Deno.readTextFile("./input.txt")).trim("\n").split("\n")));
