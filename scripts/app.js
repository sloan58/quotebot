const fs = require('fs')

module.exports = (robot) => {
  robot.respond(/(.*)/, (res) => {
    const quotes = JSON.parse(fs.readFileSync(__dirname + '/quotes.json'))
    const term = res.match[1]

    switch (term) {
      case '':
      case 'help':
        const response =
          'You can use the following commands when using me:\n' +
          '- **random**: Get a random quote\n' +
          '- **cats**: Get a list of all categories\n' +
          '- **[category]**: Get a quote from this category\n' +
          // '- **qod**: Get the Quote of the Day\n' +
          '- **help**: List this help menu\n'
        res.reply(response)
        break
      case 'random':
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        res.send(`> **${randomQuote.Quotes}**\n--- ${randomQuote.Author}`)
        break
      case 'cats':
        const unique = [...new Set(quotes.map((item) => item.Category))]
        res.send('**Here are all the available genres:**\n' + unique.join(' '))
        break
      case 'qod':
        const qod = JSON.parse(fs.readFileSync(__dirname + '/qod.json'))
        res.send(`> **${qod.Quotes}**\n--- ${qod.Author}`)
        break
      default:
        const filteredQuotes = quotes.filter((quote) => quote.Category === term)
        if (filteredQuotes.length) {
          const randomQuote =
            filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
          res.send(`> **${randomQuote.Quotes}**\n--- ${randomQuote.Author}`)
        } else {
          res.send(
            `Sorry, I couldn't find any matching quotes for the genre "${term}"`
          )
        }
    }
  })
}
