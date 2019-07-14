// initialize express
const express = require('express')
const app = express()

// database
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// make public a static folder
app.use(express.static('public'));

// handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes
require('./routes/htmlRoutes')(app)
require('./routes/apiRoutes')(app)

// port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Listening on port ' + PORT))