const express = require("express");
const dotenv = require("dotenv").config();
const { IAMCredentialsClient } = require("@google-cloud/iam-credentials");

const port = 8080;
const cors = require("cors");

//const connectDB = require('./config/db')

//connectDB()

const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//app.use('/api', require('./routes/userRoute'))
//app.use( '/api', require( './routes/loginRoute' ) )

app.listen(port, () => console.log(`Server running on port: ${port}`));

app.get("/home", (req, res) => {
  const query = "Select * from testtabla";
  pool.query(query, [], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

const pool = mysql.createPool({
  user: "root",
  password: "TestSql",
  database: "testsql",
  socketPath: `/cloudsql/cdt-principal:us-central1:testsql`,
});
//app.listen(port, () => console.log(`Server running on port: ${port}`))

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
