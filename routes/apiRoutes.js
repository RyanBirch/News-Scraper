const db = require('../models')

module.exports = app => {

  app.post('/api/addComment', (req, res) => {

    // insert comment into comments collection
    db.Comment.create({
      body: req.body.comment
    })
    .then(comment => {

      // insert comment id into corresponding article in articles collection
      db.Article.findOneAndUpdate({ _id: req.body.articleID }, {
        $push: { comments: comment._id }
      }, { new: true })
      .then(data => {
        console.log('success')
        res.sendStatus(200)
      })
      .catch(err => console.log(err)) 
      
    })
    .catch(err => console.log(err))
  })
}