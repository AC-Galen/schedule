const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
  res.send('Project init')
})

app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})