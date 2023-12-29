const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')

const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use( express.urlencoded( { extended: false } ) )
app.use(cors())

app.use('/api', require('./routes/userRoute'))
app.use( '/api', require( './routes/loginRoute' ) )

app.listen(port, () => console.log(`Server running on port: ${port}`))
