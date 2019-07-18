// scraping tools
const axios = require('axios')
const cheerio = require('cheerio')

// database
const db = require('../models')

function scrape() {
  return new Promise(resolve => {
    // get data from news site
    let newsURL = 'https://www.washingtonpost.com'
    axios.get(newsURL).then(response => {
      let $ = cheerio.load(response.data)

      // loop through each headline
      $('.headline').each(function() {
        let result = {}

        // grab title, link, and article summary
        result.title = $(this).children('a').text()
        result.link = $(this).children('a').attr('href')

        if ($(this).siblings('.row').find('.blurb').text()) {
          result.summary = $(this).siblings('.row').find('.blurb').text()
        } else {
          result.summary = $(this).siblings('.blurb').text()
        }

        // if we were able to grab all three, add them to database
        if (result.title && result.link && result.summary) {
          db.Article.create({
              title: result.title,
              link: result.link,
              summary: result.summary,
              dateAdded: Date.now
            })
            .then(() => {
              console.log('Entry added')
            })
            .catch(err => {
              console.log('Insert error')
            })
        }
      })
    })
    .catch(err => console.log(err)) // catch axios errors
    resolve('Scrape successful')
  })
}

module.exports = scrape