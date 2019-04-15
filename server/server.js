const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

app.get('/search', (req, res) => {
  fs.readFile('./search-data.txt', function(err, buf) {
    res.json(buf.toString())
  })
})

app.post('/search', (req, res) => {
  const data = JSON.stringify(req.body)
  const timestamp = new Date()
  const searchResult = data + timestamp
  const logStream = fs.createWriteStream('./search-data.txt', { flags: 'a' })
  logStream.write(searchResult + '\n', () => {
    logStream.end()
  })
  res.json(searchResult)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
