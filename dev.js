const fs = require('fs')

const quotes = JSON.parse(fs.readFileSync(__dirname + '/scripts/quotes.json'))
const unique = [...new Set(quotes.map((item) => item.GENRE))]
console.log(unique)
