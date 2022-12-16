const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const fileUpload = require('express-fileupload')

app.use(fileUpload({
  useTempFiles: true
}))

// Available Routes
app.use('/api/auth', require('./Routes/Auth_Route'))
app.use('/api/events', require('./Routes/Event_Route'))
app.use('/api/notifications', require('./Routes/Notification_Route'))
app.use('/api/team', require('./Routes/Team_Route'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})