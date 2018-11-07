const PubSub = require('../helpers/pub_sub.js');
const EndView = require('./end_view.js');

const GameOver = function () {
  this.container = document.querySelector("div#text-display");
};


GameOver.prototype.playerDied = function () {

  this.container.innerHTML = "";

  const gameOver = document.createElement("h1");
  gameOver.textContent = "You Died";
  this.container.appendChild(gameOver);

  const background = document.getElementById("background-img");
  background.setAttribute("src", "./images/fire.png");

  const end = new EndView(this.container);
  end.disableButtons();
};

module.exports = GameOver;
