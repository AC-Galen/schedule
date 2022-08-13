if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')


const routes = require('./routes')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})