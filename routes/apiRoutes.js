const db = require('../models')

module.exports = app => {

  // add a comment to the database
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


  // get comments for a specific article
  app.get('/api/getComments/:id', (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate('comments')
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err))
  })


  // delete a comment
  app.delete('/api/deleteComment/:commentID/:articleID', (req, res) => {
    // delete comment from comment collection
    db.Comment.deleteOne({ _id: req.params.commentID })
      .then(() => {
        // delete reference to comment in article collection
        db.Article.update({ _id: req.params.articleID }, {
          $pull: { comments: req.params.commentID }
        })
        .then(() => res.sendStatus(200))
        .catch(err => res.json(err))
        
      })
      .catch(err => res.json(err))
  })
  

  // delete all articles and comments
  app.delete('/api/clear', (req, res) => {
    db.Article.deleteMany({})
      .then(() => {
        db.Comment.deleteMany({})
          .then(() => res.sendStatus(200))
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  })
}