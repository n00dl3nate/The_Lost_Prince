const PubSub = require('../helpers/pub_sub.js');
const Interface = require('../models/Interface.js');

const EndView = function (container) {
  this.container = container;
  this.interface = new Interface;
};

EndView.prototype.bindEvents = function () {
  PubSub.subscribe('PointsTracker:end-point-reached', (event)=> {
    this.container.innerHTML = "";
    const end = document.createElement("h2");
    end.textContent = "Congratulations! You have found your Sweet Prince! He has offered to send you home!";
    this.container.appendChild(end);
    const background = document.getElementById("background-img");
    background.setAttribute("src", "./images/End.gif");
    this.interface.disableButtons();

    const monster = document.querySelector("div#enemy-image")
    monster.innerHTML = ""
    const playerhealthbar = document.querySelector("div#player-health-bar")
    playerhealthbar.innerHTML = ""
  });
};

module.exports = EndView;
