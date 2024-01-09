const express = require('express');
const router = require('./routes/userRoute');
const app = express();
const PORT = 8080;
const cors = require('cors')


app.use(router)

app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({
        name: 'Hello',
        last: 'World 2',
    })
})

app.listen(PORT, () => {
    console.log(`APP running on port ${PORT}`)
})