const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')

//const connectDB = require('./config/db')

//connectDB()

const app = express()

app.use(express.json())
app.use( express.urlencoded( { extended: false } ) )
app.use(cors())

//app.use('/api', require('./routes/userRoute'))
//app.use( '/api', require( './routes/loginRoute' ) )

//app.listen(port, () => console.log(`Server running on port: ${port}`))

// Imports the Google Cloud client library

const {IAMCredentialsClient} = require('@google-cloud/iam-credentials');

// TODO(developer): replace with your prefered project values.
// The service account must be granted the roles/iam.serviceAccountTokenCreator role
// const serviceAccount = 'ACCOUNT_EMAIL_OR_UNIQUEID'
// const scopes = 'my-scopes', e.g., 'https://www.googleapis.com/auth/iam'

// Creates a client
const client = new IAMCredentialsClient();

const serviceAccount = "jsantana@soaint.com"
const scopes = "email"

async function generateAccessToken() {
  const [token] = await client.generateAccessToken({
    name: `projects/-/serviceAccounts/${serviceAccount}`,
    scope: [scopes],
  });
  console.info(token);
}
generateAccessToken();