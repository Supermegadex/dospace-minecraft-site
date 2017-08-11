const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = express.Router();
const child = require("child_process");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

let checkStatus = res => {
  let search = child.spawn("cat", ["test.txt"]);
  search.stdout.on('data', data => {
    let test = data.toString().match("spigot");
    console.log(test);
    res.send(!!test);
  })
}

app.post("/status", (req, res) => {
  checkStatus(res);
})

http.listen(process.env.PORT || 3000);
