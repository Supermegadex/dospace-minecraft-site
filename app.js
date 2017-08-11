const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = express.Router();
const child = require("child_process");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

let checkStatus = () => {
  let search = child.spawn("echo", ["Hello, there!"]);
  search.stdout.on('data', res => {
    console.log(res);
    return res;
  })
}

app.post("/status", (req, res) => {
  res.send(checkStatus());
})

http.listen(process.env.PORT || 3000);