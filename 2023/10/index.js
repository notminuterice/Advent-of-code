import fs from "fs";


let startMovements = [[1, 0], [-1, 0], [0, 1], [0, -1]]
let mainLoopPoints = []

function findStart(inp) {
  for (let y = 0; y < inp.length; y++){
    if (inp[y].indexOf("S") != -1) {
      return  [inp[y].indexOf("S"), y]
    }
  }
}

function findDupes(arr) {
  return new Set(arr).size !== arr.length
}

function nextMove(grid, current, move) {
  if (!grid[current[1] + move[1]] || !grid[current[1] + move[1]][current[0] + move[0]]) return false
  let nextPos = grid[current[1] + move[1]][current[0] + move[0]]
  if (nextPos == ".") return false;

  if (move.toString() == [1, 0].toString()) {
    if (nextPos == "|" || nextPos == "F" || nextPos == "L") return false
    if (nextPos == "-") return [[current[0] + move[0], current[1] + move[1]], move]
    if (nextPos == "7") return [[current[0] + move[0], current[1] + move[1]], [0, 1]]
    if (nextPos == "J") return [[current[0] + move[0], current[1] + move[1]], [0, -1]]
  } else if (move.toString() == [-1, 0].toString()) {
    if (nextPos == "|" || nextPos == "7" ||  nextPos == "J") return false
    if (nextPos == "-") return [[current[0] + move[0], current[1] + move[1]], move]
    if (nextPos == "F") return [[current[0] + move[0], current[1] + move[1]], [0, 1]]
    if (nextPos == "L") return [[current[0] + move[0], current[1] + move[1]], [0, -1]]
  } else if (move.toString() == [0, -1].toString()) {
    if (nextPos == "-" || nextPos == "L" || nextPos == "J") return false
    if (nextPos == "|") return [[current[0] + move[0], current[1] + move[1]], move]
    if (nextPos == "F") return [[current[0] + move[0], current[1] + move[1]], [1, 0]]
    if (nextPos == "7") return [[current[0] + move[0], current[1] + move[1]], [-1, 0]]
  } else if (move.toString() == [0, 1].toString()){
    if (nextPos == "-" || nextPos == "F" ||  nextPos == "7") return false
    if (nextPos == "|") return [[current[0] + move[0], current[1] + move[1]], move]
    if (nextPos == "L") return [[current[0] + move[0], current[1] + move[1]], [1, 0]]
    if (nextPos == "J") return [[current[0] + move[0], current[1] + move[1]], [-1, 0]]
  }

}

function startVal(inp, startingPos, mainPoints) {
  // console.log(mainPoints)
  // let topMain = mainPoints.includes([startingPos[0], startingPos[1] - 1].toString())
  // let bottomMain = mainPoints.includes([startingPos[0], startingPos[1] + 1].toString())
  // let leftMain = mainPoints.includes([startingPos[0] - 1, startingPos[1]].toString())
  // let rightMain = mainPoints.includes([startingPos[0] + 1, startingPos[1]].toString())
  // if (topMain && inp[startingPos] == "|" || topMain == "F" ||  && bottomMain) return "|"
  // if (leftMain && rightMain) return "-"
  // if (topMain && rightMain) return "L"
  // if (topMain && leftMain) return "J"
  // if (bottomMain && rightMain) return "F"
  // if (bottomMain && leftMain) return "7"
  return "|"
}

function task2(inp, startingPos) {
  let strMainPoints = mainLoopPoints.map(p => p.toString())
  let total = 0
  inp[startingPos[1]][startingPos[0]] = startVal(inp, startingPos, strMainPoints)

  inp.forEach((line, y) => {
    let onLine = false
    let startLine = ""
    let flipper = -1;
    let xMax = mainLoopPoints.filter(p => p[1] == y).sort((a, b) => b[0] - a[0])
    if (!xMax[0]) return
    xMax = xMax[0][0]
    line.forEach((pos, x) => {
      if (strMainPoints.includes([x, y].toString())) {
        if (inp[y][x] == "F"|| inp[y][x] == "L") {
          onLine = true
          startLine = inp[y][x]
          return
        }
        else if (inp[y][x] == "J" && startLine == "F" && onLine || inp[y][x] == "7" && startLine == "L" && onLine) {
          onLine = false
        }
        if (inp[y][x] != "-" && onLine) {
          onLine = false
          return
        }
        if (!onLine) {
          flipper *= -1
        }
      } else if (flipper == 1 && x < xMax) {
        inp[y][x] = "I"
        total++
      }
    })
  })
  inp.forEach((p, y) => {
    p.forEach((df, x) => {
      if (!strMainPoints.includes([x, y].toString()) && inp[y][x] != "I") {
        inp[y][x] = "."
      }
    });
  })
  console.log(total)
}

function task1() {
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n").map(line => line.split(""))
  let nextMoves = []
  let startingPos = findStart(inp)
  mainLoopPoints.push(startingPos)

  startMovements.forEach(move => {
    let m = nextMove(inp, startingPos, move)
    if (m != false) {
      nextMoves.push(m)
      mainLoopPoints.push(m[0])
    }
  })
  let counter = 1
  while (true) {
    for (let i = 0; i < nextMoves.length; i++){
      let m = nextMove(inp, nextMoves[i][0], nextMoves[i][1])
      if (m == false) {
        nextMoves.splice(i, 1)
        continue
      }
      nextMoves[i] = m
    }
    mainLoopPoints.push(nextMoves[0][0])
    mainLoopPoints.push(nextMoves[1][0])
    let strMoves = nextMoves.map(move => JSON.stringify(move[0]))
    counter++
    if (strMoves.filter((item, index) => strMoves.indexOf(item) !== index).length != 0) {
      mainLoopPoints.pop()
      break
    }
  }
  console.log(counter)
  task2(inp, startingPos)

}

task1();