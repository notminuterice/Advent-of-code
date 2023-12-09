import fs from "fs"

function compareStrength2(hand1, hand2) {
  const cardValues = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1,
  };
  let hands = [hand1, hand2];
  let dupes = [{}, {}];
  let strengths = [-1, -1];

  for (let i = 0; i < 2; i++) {
    hands[i].split("").forEach((num) => {
      dupes[i][num] = dupes[i][num] ? dupes[i][num] + 1 : 1;
    });
  }

  for (let i = 0; i < 2; i++) {
    let noJack = {
      ...dupes[i],
      J: 0,
    };
    if (
      Object.values(dupes[i]).includes(5) ||
      Math.max(...Object.values(noJack)) + dupes[i]["J"] == 5
    ) {
      strengths[i] = 7;
    } else if (
      Object.values(dupes[i]).includes(4) ||
      Math.max(...Object.values(noJack)) + dupes[i]["J"] == 4
    ) {
      strengths[i] = 6;
    } else if (
      (Object.values(dupes[i]).includes(3) &&
        Object.values(dupes[i]).includes(2)) ||
      (Object.values(dupes[i]).filter((num) => num == 3).length == 1 &&
        dupes[i]["J"] == 1) ||
      (Object.values(dupes[i]).filter((num) => num == 2).length == 2 &&
        dupes[i]["J"] == 1) ||
      (Object.values(dupes[i]).filter((num) => num == 2).length == 2 &&
        dupes[i]["J"] == 2) ||
      dupes[i]["J"] == 3
    ) {
      strengths[i] = 5;
    } else if (
      Object.values(dupes[i]).includes(3) ||
      Math.max(...Object.values(noJack)) + dupes[i]["J"] == 3
    ) {
      strengths[i] = 4;
    } else if (
      Object.values(dupes[i]).filter((num) => num == 2).length == 2 ||
      (Object.values(dupes[i]).filter((num) => num == 2).length == 1 &&
        dupes[i]["J"] == 1) ||
      dupes[i]["J"] == 2
    ) {
      strengths[i] = 3;
    } else if (
      Object.values(dupes[i]).includes(2) ||
      Math.max(...Object.values(noJack)) + dupes[i]["J"] == 2
    ) {
      strengths[i] = 2;
    } else {
      strengths[i] = 1;
    }
  }

  if (strengths[0] > strengths[1]) return 1;
  else if (strengths[0] < strengths[1]) return -1;
  else {
    for (let i = 0; i < hand1.length; i++) {
      if (cardValues[hands[0][i]] > cardValues[hands[1][i]]) return 1;
      else if (cardValues[hands[0][i]] < cardValues[hands[1][i]]) return -1;
    }
  }
}

function compareStrength(hand1, hand2) {
  const cardValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  let hands = [hand1, hand2];
  let dupes = [{}, {}];
  let strengths = [-1, -1];

  for (let i = 0; i < 2; i++) {
    hands[i].split("").forEach((num) => {
      dupes[i][num] = dupes[i][num] ? dupes[i][num] + 1 : 1;
    });

    if (Object.values(dupes[i]).includes(5)) {
      strengths[i] = 7;
    } else if (Object.values(dupes[i]).includes(4)) {
      strengths[i] = 6;
    } else if (
      Object.values(dupes[i]).includes(3) &&
      Object.values(dupes[i]).includes(2)
    ) {
      strengths[i] = 5;
    } else if (Object.values(dupes[i]).includes(3)) {
      strengths[i] = 4;
    } else if (Object.values(dupes[i]).filter((num) => num == 2).length == 2) {
      strengths[i] = 3;
    } else if (Object.values(dupes[i]).includes(2)) {
      strengths[i] = 2;
    } else {
      strengths[i] = 1;
    }
  }

  if (strengths[0] > strengths[1]) return 1;
  else if (strengths[0] < strengths[1]) return -1;
  else {
    for (let i = 0; i < hand1.length; i++) {
      if (cardValues[hands[0][i]] > cardValues[hands[1][i]]) return 1;
      else if (cardValues[hands[0][i]] < cardValues[hands[1][i]]) return -1;
    }
  }
}

function task1() {
  let inp = fs
    .readFileSync("input.txt", "utf-8")
    .split("\r\n")
    .map((val) => val.split(" "));
  let sortedCards = inp.toSorted((a, b) => compareStrength(a[0], b[0]));
  let winnings = sortedCards
    .map((val, i) => parseInt(val[1]) * (i + 1))
    .reduce((a, b) => a + b);
  console.log(winnings);

  let sortedCards2 = inp.toSorted((a, b) => compareStrength2(a[0], b[0]));
  let winnings2 = sortedCards2
    .map((val, i) => parseInt(val[1]) * (i + 1))
    .reduce((a, b) => a + b);
  console.log(winnings2);
}

task1();
