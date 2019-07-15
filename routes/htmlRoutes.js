const scrape = require('../helpers/scrape.js')
const db = require('../models')

module.exports = app => {

  app.get('/', (req, res) => {
    // scrape articles
    scrape().then(() => {
      // grab all articles from database
      db.Article.find({})
        .then(articles => {
          res.render('index', {
            articles: articles
          })
        })
        .catch(err => res.json(err))
    })
  })
}