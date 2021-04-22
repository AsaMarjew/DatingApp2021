const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
})

app.get('/', function (req, res) {
    throw new Error('404 Not Found') // Express will catch this on its own.
  })

app.listen(port, () => {
    console.log('Server running on http://localhost:3000')
})