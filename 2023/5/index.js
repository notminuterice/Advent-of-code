import fs from "fs";

function isSeed(seeds, value) {
  let seedFound = false
  seeds.forEach(seedRange => {
    if (seedFound) return
    if (value >= seedRange[0] && value <= seedRange[1]) {
      seedFound = true
    }
  })
  return seedFound
}

function task2() {
  let inp = fs.readFileSync("input.txt", "utf-8").split("\r\n")
  let corresponding = []
  let seeds = []
  let currentIndex = -1
  let wasLine = false
  inp.forEach(line => {
    if (line == "") {
      wasLine = true;
      return;
    }
    if (wasLine) {
      currentIndex += 1;
      corresponding[currentIndex] = [];
      wasLine = false;
      return;
    }
    if (currentIndex == -1) {
      let seedVal = -1
      let seedVals = line.split(": ")[1].split(" ");
      seedVals.forEach(val => {
        val = parseInt(val)
        if (seedVal == -1) {
          seedVal = val;
          return
        }
        seeds.push([seedVal, seedVal + (val-1)])
        seedVal = -1
      })
      return;
    }
    let [dest, source, count] = line.split(" ").map(val => parseInt(val));
    corresponding[currentIndex].push({
      startSource: source,
      endSource: source + count,
      startDest: dest,
      endDest: dest + count
    })
  })

  let finalFound = false
  let endVal = 0
  while (!finalFound){
    let seedCurr = endVal
    corresponding.slice().reverse().forEach((itemType, i) => {
      let found = false
      itemType.forEach(grouping => {
        if (found) return
        if (seedCurr >= grouping.startDest && seedCurr < grouping.endDest) {
          seedCurr = grouping.startSource + (seedCurr - grouping.startDest)
          found = true
        }
      })
    })
    if (isSeed(seeds, seedCurr)) {
      finalFound = true
      break
    }
    endVal += 1
  }

  console.log(endVal)
}

function task1() {
  let inp = fs.readFileSync("input.txt", "utf-8").split("\r\n")
  let corresponding = []
  let seeds = []
  let currentIndex = -1
  let wasLine = false
  inp.forEach(line => {
    if (line == "") {
      wasLine = true;
      return;
    }
    if (wasLine) {
      currentIndex += 1;
      corresponding[currentIndex] = [];
      wasLine = false;
      return;
    }
    if (currentIndex == -1) {
      seeds = line.split(": ")[1].split(" ");
      return;
    }
    let [dest, source, count] = line.split(" ").map(val => parseInt(val));
    corresponding[currentIndex].push({
      startSource: source,
      endSource: source + count,
      startDest: dest,
      endDest: dest + count
    })
  })

  let finalValues = []
  seeds.forEach(seed => {
    let seedCurr = seed
    corresponding.forEach((itemType, i) => {
      let found = false
      itemType.forEach(grouping => {
        if (found) return
        if (seedCurr >= grouping.startSource && seedCurr < grouping.endSource) {
          seedCurr = grouping.startDest + (seedCurr - grouping.startSource)
          found = true
        }
      })
    })
    finalValues.push(seedCurr)
  })

  let lowestFinal = finalValues.toSorted((a,b) => a - b)
  console.log(lowestFinal[0])
}

task1()
task2()