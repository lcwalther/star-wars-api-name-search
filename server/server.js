const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
  res.send('star-wars-searches.txt')
})

fs.readFile('star-wars-searches.txt', function(err, buf) {
  console.log(buf.toString())
})

app.post('/', (req, res) => {
  const data = req.body
  fs.writeFile('star-wars-searches.txt', data, err => {
    if (err) console.log(err)
    console.log('Successfully Written to File.')
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
