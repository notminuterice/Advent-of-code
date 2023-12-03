import fs from "fs";

function checkGame(gameVals) {
  if (gameVals.blue <= 14 && gameVals.green <= 13 && gameVals.red <= 12) {
    return true
  }
  return false
}

function task1() {
  let validGames = 0
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
  inp.forEach((line, i) => {
    let gameNum = parseInt(i) + 1
    let cubeVals = {}
    cubeVals[gameNum] = {}
    let eachGame = line.split(": ")[1].split("; ")
    eachGame.forEach((game) => {
      let gameVals = game.split(", ")
      gameVals.forEach((value) => {
        let cubeVal = parseInt(value.split(" ")[0])
        cubeVals[gameNum][value.split(" ")[1]] = cubeVals[gameNum][value.split(" ")[1]] > cubeVal ? cubeVals[gameNum][value.split(" ")[1]] : cubeVal
      })
    })
    if (checkGame(cubeVals[gameNum])) {
      validGames += gameNum
    }
  })
  console.log(validGames)
}

function task2() {
  let powers = 0
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

  inp.forEach((line, i) => {
    let gameNum = parseInt(i) + 1
    let cubeVals = {}
    cubeVals[gameNum] = {}
    let eachGame = line.split(": ")[1].split("; ")
    eachGame.forEach((game) => {
      let gameVals = game.split(", ")
      gameVals.forEach((value) => {
        let cubeVal = parseInt(value.split(" ")[0])
        cubeVals[gameNum][value.split(" ")[1]] = cubeVals[gameNum][value.split(" ")[1]] > cubeVal ? cubeVals[gameNum][value.split(" ")[1]] : cubeVal
      })
    })
    powers += cubeVals[gameNum].red * cubeVals[gameNum].blue * cubeVals[gameNum].green
  })
  console.log(powers)
}

task2()