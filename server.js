const express = require("express");
const cors = require('cors');
const path = require('path');

const app = express()
const port = 7000
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})  