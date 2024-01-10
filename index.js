const express = require('express');
const router = require('./routes/userRoute');
const app = express();
const PORT = 8080;
const cors = require('cors')
const { IAMCredentialsClient } = require("@google-cloud/iam-credentials");


app.use(router)

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    return res.status(200).json({
        name: 'Hello',
        last: 'World 2',
    })
})

app.listen(PORT, () => {
    console.log(`APP running on port ${PORT}`)
})

app.get("/login", async (req, res) => {
    // Imports the Google Cloud client library
  
  
    // TODO(developer): replace with your prefered project values.
    // The service account must be granted the roles/iam.serviceAccountTokenCreator role
    // const serviceAccount = 'ACCOUNT_EMAIL_OR_UNIQUEID'
    // const scopes = 'my-scopes', e.g., 'https://www.googleapis.com/auth/iam'
  
    // Creates a client
    const client = new IAMCredentialsClient();
  
    const serviceAccount = "jebadia@soaint.com"; // user account
    const scopes = "https://www.googleapis.com/auth/iam";
  
    async function generateAccessToken() {
      const [token] = await client.generateAccessToken({
        name: `projects/-/serviceAccounts/${serviceAccount}`,
        scope: [scopes],
      });
      console.info(token);
    }
  
    await generateAccessToken();
  });
  