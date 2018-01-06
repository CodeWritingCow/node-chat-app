const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
var app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
   res.render('index.html');
});

app.listen(port, process.env.IP, () => {
    console.log(`Server is up on port ${port}!`);
});