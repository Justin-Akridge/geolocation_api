const express = require('express')
const Datastore = require('nedb')

const app = express();
PORT = 3000
app.listen(PORT, () => console.log('listening at 3000'))

app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db')
database.loadDatabase();

app.get('/api', (request, response) =>{
  database.find({}, (err, data) => {
    if(err){
      response.end()
    }
    response.json(data)
  })
  
})

app.post('/api', (req, res) => {
  const data = req.body
  const timestamp = Date.now()
  data.timestamp = timestamp
  database.insert(data)
  res.json(data)
})