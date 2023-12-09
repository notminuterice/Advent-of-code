import fs from "fs"

let fullNodes = {};

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

function makeNodes(inp) {
  inp.forEach((line, i) => {
    if (i < 2) return;
    let splitParts = line.split(" = ");
    let origin = splitParts[0];
    let destinations = splitParts[1].replace(/[{()}]/g, "").split(", ");
    fullNodes[origin] = destinations;
  });
}

function task2() {
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
  let instructions = inp[0].split("");
  makeNodes(inp);

  let currents = Object.keys(fullNodes).filter((curr) => curr[2] == "A");
  let currentLengths = currents.map((c) => [-1, -1]);
  let count = 0;
  while (
    currentLengths.filter((curr) => curr[0] != -1 && curr[1] != -1).length !=
    currentLengths.length
  ) {
    let lOrR = 0;
    if (instructions[count % instructions.length] == "R") lOrR = 1;
    currents.forEach((curr, i) => {
      currents[i] = fullNodes[currents[i]][lOrR];
      if (curr[2] == "Z") {
        if (currentLengths[i][0] == -1) {
          currentLengths[i][0] = count;
        } else if (currentLengths[i][1] == -1) {
          currentLengths[i][1] = count - currentLengths[i][0];
        }
      }
    });
    count += 1;
  }
  console.log(lcm(...currentLengths.map((c) => c[0])));
}

function task1() {
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
  let instructions = inp[0].split("");
  let current = ["AAA", 0];

  makeNodes(inp);

  while (current[0] != "ZZZ") {
    let lOrR = 0;
    if (instructions[current[1] % instructions.length] == "R") lOrR = 1;
    current[0] = fullNodes[current[0]][lOrR];
    current[1] += 1;
  }

  console.log(current[1]);
}

task1();
task2();