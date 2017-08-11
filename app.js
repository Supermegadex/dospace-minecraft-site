const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = express.Router();
const child = require("child_process");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get("/getStatus", (req, res) => {
  checkStatus(res);
})

app.get("/getNews", (req, res) => {
  getNews(res);
})

app.get("/showdown", (req, res) => {
  res.sendFile(__dirname + "/node_modules/showdown/dist/showdown.min.js");
})

app.get("/showdown.min.js.map", (req, res) => {
  res.sendFile(__dirname + "/node_modules/showdown/dist/showdown.min.js.map");
})

let checkStatus = res => {
  // let search = child.spawn("echo", ["hello"]);
  // search.stdout.on('data', data => {
  //   let test = data.toString().match("spigot");
  //   console.log(test);
  //   res.send(!!test);
  // })
  res.send(true);
}

let getNews = (res) => {
  // gets the news from the file
  // split news into an array
  // send array and response object to parseNews
  fs.readFile(__dirname + "/news/news.md", "utf-8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    parseNews(data, res);
  })
}

let parseNews = (news, res) => {

  function getTitleAndImage(card) {
    let title = card.match(/(\[\[.+\]\])/g);
    let cardWoTitle = card.replace(/(\[\[.+\]\])/g, "");
    let image = cardWoTitle.match(/(\[\{.+\}\])/g);
    let cardWoTitleOrImage = cardWoTitle.replace(/(\[\{.+\}\])/g, "");
    return {
      title: title,
      image: image,
      md: cardWoTitleOrImage
    }
  }

  let cards = news.split("-=-=-");
  let parsedCards = [];

  for (let card of cards) {
    parsedCards.push(getTitleAndImage(card));
  }

  res.send(parsedCards);
} 

http.listen(process.env.PORT || 3000);
