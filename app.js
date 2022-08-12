const express = require('express')
const exphbs = require('express-handlebars')
const { route } = require('./routes')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})