const scrape = require('../helpers/scrape.js')
const db = require('../models')

module.exports = app => {

  app.get('/', (req, res) => {
    // scrape articles
    scrape().then(() => {
      // grab all articles from database
      db.Article.find({}).sort({ dateAdded: -1 })
        .then(articles => {
          // grab all comments from database
          db.Comment.find({})
            .then(comments => {
              
              res.render('index', {
                articles: articles,
                comments: comments
              })
            })
            .catch(err => console.log(err))
        })
        .catch(err => res.json(err))
    })
  })
}