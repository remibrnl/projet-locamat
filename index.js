/*
var http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World\n");
}).listen(80, "127.0.0.1");

console.log("Server running at http://127.0.0.1:80");
*/

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log('App listening on port ${port}!')
});