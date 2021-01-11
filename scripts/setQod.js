const fs = require('fs')

const inFile = __dirname + '/quotes.json'
const outFile = __dirname + '/qod.json'

const quotes = JSON.parse(fs.readFileSync(inFile))
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
fs.writeFileSync(outFile, JSON.stringify(randomQuote))
