// scraping tools
const axios = require('axios')
const cheerio = require('cheerio')

// database
// const db = require('../models')

async function scrape() {
  // get data from news site
  let newsURL = 'https://www.washingtonpost.com'
  let response = await axios.get(newsURL)
  let $ = cheerio.load(response.data)

  $('.headline').each(function(i, elem) {
    let result = {}

    // result.title = $(this).children('a').text()
    // // if (result.title) console.log(result.title)
    // console.log(result.title)

    // result.link = $(this).children('a').attr('href')
    // // if (result.link) console.log(result.link)
    // console.log(result.link)

    // if ($(this).siblings('.row').find('.blurb').text())
    //   result.summary = $(this).siblings('.row').find('.blurb').text()
    // else
    //   result.summary = $(this).siblings('.blurb').text()
    
    // // if (result.summary) console.log(result.summary)
    // console.log(result.summary)
    // console.log(`\n`)



    result.title = $(this).children('a').text()
    result.link = $(this).children('a').attr('href')

    if ($(this).siblings('.row').find('.blurb').text())
      result.summary = $(this).siblings('.row').find('.blurb').text()
    else
      result.summary = $(this).siblings('.blurb').text()

      if (result.title && result.link && result.summary) {
        console.log(result.title)
        console.log(result.link)
        console.log(result.summary + '\n\n')
      }
  })
}

scrape()

module.exports = scrape