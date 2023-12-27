const express = require('express');
const app = express();
const PORT = 8080;


app.get('/', (req, res) => {
    return res.status(200).json({
        name: 'Hello',
        last: 'World 2',
    })
})

app.listen(PORT, () => {
    console.log(`APP running on port ${PORT}`)
})