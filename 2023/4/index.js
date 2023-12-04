import fs from "fs";

function task2() {
  let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n")
  let currentCards = {}
  inp.forEach((card, cardNum) => {
    currentCards[cardNum + 1] = 1;
  })
  inp.forEach((card, cardNum) => {
    cardNum += 1
    let cardLine = inp.filter(line => line.includes(`${cardNum}:`))[0]
    let values = cardLine.split(": ")[1]
    let [winning, have] = values.split(" | ")
    let winningNums = winning.split(" ")
    let haveNums = have.split(" ")
    let numOfWinners = -1
    let haveWinningNumbers = haveNums.filter(n => winningNums.includes(n) && n.length > 0)
    numOfWinners = haveWinningNumbers.length
    if (numOfWinners > 0) {
      for (let i = cardNum + 1; i < cardNum + numOfWinners + 1; i++) {
        currentCards[i] += currentCards[cardNum]
      }
    }
  })
  let total = Object.values(currentCards).reduce((a,b) => a+b)
  console.log(total)
}

// function task1() {
//   let inp = fs.readFileSync("./input.txt", "utf-8").split("\r\n")
//   let total = 0
//   inp.forEach(card => {
//     let values = card.split(": ")[1]
//     let [winning, have] = values.split(" | ")
//     let winningNums = winning.split(" ")
//     let haveNums = have.split(" ")
//     let numOfWinners = -1
//     let haveWinningNumbers = haveNums.filter(num => winningNums.includes(num) && num.length > 0)
//     numOfWinners = haveWinningNumbers.length
//     if (numOfWinners > 0) {
//       let score = 2 ** (numOfWinners - 1)
//       total += score
//     }
//   })
//   console.log(total)
// }

// task1()

task2()