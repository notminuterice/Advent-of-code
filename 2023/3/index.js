import fs from "fs";

function task2(points) {
  let validGears = points.map(p => {
    if (p[0] != "*") return null
    let adjacentNums = points.map(point => {
      if (isNaN(point[0])) return null
      if (Math.abs(p[1] - point[1][0][0]) <= 1 && Math.abs(p[2] - point[1][0][1]) <= 1  || Math.abs(p[1] - point[1][1][0]) <= 1 && Math.abs(p[2] - point[1][1][1]) <= 1) {
        return point[0]
      }
    }).filter(point => point != null)
    if (adjacentNums.length == 2) {
      return parseInt(adjacentNums[0]) * parseInt(adjacentNums[1])
    }
  }).filter(point => point != null)
  let total = validGears.reduce((a, b) => a + b)
  console.log(total)
}

function task1() {
  let points = []
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n")
  let currentNum = ""
  let numCoords = []
  inp.forEach((row, rNum) => {
    row.split("").forEach((letter, cNum) => {
      if (!isNaN(letter)) {
        if (currentNum.length == 0) numCoords.push([rNum, cNum])
        currentNum += letter
      } else if (isNaN(letter) && letter != ".") {
        if (currentNum.length != 0) {
          numCoords.push([rNum, cNum - 1])
          points.push([currentNum, numCoords])
          numCoords = []
          currentNum = ""
        }
        points.push([letter, rNum, cNum])
      } else {
        if (currentNum.length != 0) {
          numCoords.push([rNum, cNum - 1])
          points.push([currentNum, numCoords])
          numCoords = []
          currentNum = ""
        }
      }
    })
  })
  let validPoints = points.filter(point => {
    if (isNaN(point[0])) return false
    let adjacentSymbols = points.filter(p => {
      if (!isNaN(p[0])) return false
      if (Math.abs(p[1] - point[1][0][0]) <= 1 && Math.abs(p[2] - point[1][0][1]) <= 1  || Math.abs(p[1] - point[1][1][0]) <= 1 && Math.abs(p[2] - point[1][1][1]) <= 1) {
        return true;
      }
    })
    if (adjacentSymbols.length > 0) {
      return true
    }
  }).map(p => parseInt(p[0]))

  let sum = validPoints.reduce((a, b) => a + b)
  console.log(sum)

  task2(points)
}

task1()