var converter = new showdown.Converter();

$(function () {
  init();
});

function init() {
  $.ajax({
    url: "/getStatus",
    method: "GET",
  }).done(renderColors);

  $.ajax({
    url: "/getNews",
    method: "GET"
  }).done(renderNews);
}

function renderColors(on) {
  if (on) {
    $("#power-button").addClass("green");
    $("nav").addClass("yellow");
  }
  else {
    $("#power-button").addClass("red");
    $("nav").addClass("blue");
  }
  setToolTip(on);
}

function setToolTip(on) {
  $("#power-button").tooltip({ delay: 50, position: "bottom", tooltip: on ? "The server is currently on. Jump on in!" : "The server is down right now. Sorry!" })
  if (!on) {
    $("#domain").addClass("strike");
  }
}

function cut(str) {
  return str[0].slice(2, (str.length - 3));
}

/*
<div class="col s12 m12">
  <div class="card">
    <div class="card-image">
      <!-- <iframe src="https://map.cpgaming.tk" seamless frameborder=0> -->
      <img src="//placehold.it/800x800">
    </div>
    <span class="card-title">World 1</span>
  </div>
</div>

facilitator of personal learning
*/

function ce(el, cl) {
  var e = document.createElement(el);
  e.className = cl;
  return e;
}

function renderCards(cards) {
  for (var card of cards) {
    console.log(card);
    var img, picture;
    var cardWrapper = ce("div", "col s12 m12");
    var cardEl = ce("div", "card");
    var title = ce("span", "card-title");
    var content = ce("div", "card-content");
    cardWrapper.appendChild(cardEl);
    if (card.img) {
      img = ce("div", "card-image");
      picture = ce("img", "header-img");
      picture.src = card.img;
      cardEl.appendChild(img);
      img.appendChild(picture);
      img.appendChild(title);
    }
    else {
      console.log("HERE", title);
      content.appendChild(title);
      console.log(content);
    }
    title.innerHTML = card.title;
    $(content).append(card.text);
    cardEl.appendChild(content);
    $("#news").append(cardWrapper);
  }
}

function renderNews(news) {
  console.log(news);
  let cards = [];
  for (var article of news) {
    cards.unshift({
      text: converter.makeHtml(article.md),
      title: cut(article.title),
      img: article.image ? cut(article.image) : null
    });
  }
  renderCards(cards);
}
