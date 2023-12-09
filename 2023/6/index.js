import fs from "fs";

function task2() {
  let inp = fs.readFileSync("input.txt", "utf-8").split("\r\n")
  let time = inp[0].split(" ").filter(element => element.length > 0 && element != "Time:").join("")
  let dist = inp[1].split(" ").filter(element => element.length > 0 && element != "Distance:").join("")
  let ways = 0
  for (let t = 1; t <= time; t++){
    if ((time - t) * t > dist) {
      ways++
    }
  }
  console.log(ways)
}

function task1() {
  let inp = fs.readFileSync("input.txt", "utf-8").split("\r\n")
  let times = inp[0].split(" ").filter(element => element.length > 0 && element != "Time:")
  let dist = inp[1].split(" ").filter(element => element.length > 0 && element != "Distance:")
  let product = 1
  times.forEach((time, i) => {
    let ways = 0
    let thisDist = dist[i]
    for (let t = 1; t <= time; t++){
      if ((time - t) * t > thisDist) {
        ways++
      }
    }
    product *= ways
  })
  console.log(product)
}

//task1()
task2()