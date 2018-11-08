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
  background.setAttribute("src", "./images/Death.gif");

  const end = new EndView(this.container);
  end.disableButtons();

  const player = document.querySelector("#playerImage")
  player.src = "./images/Player-dead.gif"
};

module.exports = GameOver;
