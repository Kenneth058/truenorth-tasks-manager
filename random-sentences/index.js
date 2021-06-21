const express = require('express')
const fs = require('fs')


const app = express()

function shuffle(array) {
  let currentIndex = array.length,  randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

app.get('/', async ({query}, res) => {
  const {sentences} = query
  const text = fs.readFileSync('./sentences.txt', 'utf8')

  const sentencesArr = text
    .split('. ')
    .map(sentence => `${sentence.replace('.', '').trim()}.`)

  const sentencesRes = [shuffle(sentencesArr)
    .slice(0, Number(sentences) || 3)
    .join(' ')]

  res.send(sentencesRes)
})

app.listen(5000)