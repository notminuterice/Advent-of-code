import fs from "fs";

function task1and2() {
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n")
  let total = 0
  let negTotal = 0
  inp.forEach(line => {
    let allVals = []
    let splitLine = line.split(" ").map(v => parseInt(v))
    let negCurr = 0
    allVals.push(splitLine)
    while (allVals.at(-1).reduce((a, b) => a + b) != 0) {
      let prevLine = allVals.at(-1)
      let newLine = []
      for (let i = 0; i < prevLine.length - 1; i++){
        newLine.push(prevLine[i+1] - prevLine[i])
      }
      allVals.push(newLine)
    }
    [...allVals.reverse()].forEach(line => {
      total += line.at(-1)
      negCurr = line[0] - negCurr
    })
    negTotal += negCurr
  })
  console.log(total)
  console.log(negTotal)
}


task1and2()