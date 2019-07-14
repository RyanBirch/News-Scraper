const scrape = require('../helpers/scrape.js')
const db = require('../models')

module.exports = app => {

  app.get('/', (req, res) => {
    // scrape articles
    scrape().then(() => {
      // grab all articles from database
      db.Article.find({}).sort({ dateAdded: -1 })
        .then(data => {
          res.render('index', {
            articles: data
          })
        })
        .catch(err => res.json(err))
    })
  })
}