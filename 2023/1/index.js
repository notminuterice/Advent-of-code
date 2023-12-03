import fs from "fs";

function task1() {
  let input = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
  let numbers = input.map(cur => {
    let nums = cur.split("").filter(item => !isNaN(item))
    return nums
  })
  let addedNums = numbers.map(row => row[0] + row.at(-1))
  let total = addedNums.reduce((a, b) => parseInt(a) + parseInt(b))
  console.log(total)
}

function task2() {
  let nums = {
    "one":1,
    "two":2,
    "three":3,
    "four":4,
    "five":5,
    "six":6,
    "seven":7,
    "eight":8,
    "nine":9,
  }
  let input = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
  let indexes = []
  input.forEach((row) => {
    let singleIndexes = []
    Object.keys(nums).forEach(num => {
      if (row.indexOf(num) == -1) return
      singleIndexes.push([row.indexOf(num), nums[num]])
      if (singleIndexes.indexOf(num, row.indexOf(num)+1) != 0){
        singleIndexes.push([row.lastIndexOf(num), nums[num]]);
      }
    })
    row.split("").forEach((item, i) => {
      if (!isNaN(item)) {
        singleIndexes.push([i, parseInt(item)])
      }
    })
    indexes.push(singleIndexes)
  })
  let sortedIndexes = indexes.map(row => row.toSorted((a, b) => {
    if (a[0] === b[0]) return 0
    else return (a[0] < b[0]) ? -1 : 1;
  }))
  let finalNums = sortedIndexes.map(row => row[0][1].toString() + row.at(-1)[1].toString())
  let total = finalNums.reduce((a, b) => parseInt(a) + parseInt(b))
  console.log(total)
}
task2()

