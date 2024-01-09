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

//app.use('/api', require('./routes/userRoute'))
//app.use( '/api', require( './routes/loginRoute' ) )

app.listen(port, () => console.log(`Server running on port: ${port}`))

const { Storage } = require("@google-cloud/storage");
const Multer = require( "multer" );

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

let projectId = "YOUR-PROJECTID"; // Get this from Google Cloud
let keyFilename = "PATH-TO-YOUR-KEYFILE.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("YOUR-STORAGE-BUCKET"); // Get this from Google Cloud -> Storage

// Gets all files in the defined bucket
app.get("/upload", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    res.send([files.map((file) => file.getMetadata())]);
    console.log("Success");
  } catch (error) {
    res.send("Error:" + error);
  }
});
// Streams file upload to Google Storage
app.post("/upload", multer.single("file"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});