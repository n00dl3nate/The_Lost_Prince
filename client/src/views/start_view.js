const PubSub = require('../helpers/pub_sub.js');
const RoomGenerator = require('../models/room_model.js');

const StartView = function (container) {
  this.container = container;
};


StartView.prototype.bindEvents = function () {

  this.createButtons();

  const background = document.getElementById("background-img");

  const forestButton = document.getElementById("nav-forest-btn").addEventListener('click', (event) => {
    background.setAttribute("src", "./images/Background2.gif");
    background.setAttribute("name", "forest");
    PubSub.publish('StartView:choice-button-clicked', "forest");
  });

  const lakeButton = document.getElementById("nav-lake-btn").addEventListener('click', (event) => {
    background.setAttribute("src", "./images/lake-bg.gif");
    background.setAttribute("name", "lake");
    PubSub.publish('StartView:choice-button-clicked', "lake");
  });

  const mansionButton = document.getElementById("nav-mansion-btn").addEventListener('click', (event) => {
    background.setAttribute("src", "./images/mansion-bg.gif");
    background.setAttribute("name", "mansion");
    PubSub.publish('StartView:choice-button-clicked', "mansion");
  });


};


StartView.prototype.createButtons = function () {
  this.container.innerHTML = "";

  const forest = document.createElement("button");
  forest.textContent = "Move further into the forest";
  forest.setAttribute("class","btn btn-block navigate btn-lg");
  forest.id = "nav-forest-btn";
  this.container.appendChild(forest);

  const lake = document.createElement("button");
  lake.textContent = "Walk towards the lake";
  lake.setAttribute("class","btn btn-block navigate btn-lg");
  lake.id = "nav-lake-btn";
  this.container.appendChild(lake);

  const mansion = document.createElement("button");
  mansion.textContent = "Head over to the mansion";
  mansion.setAttribute("class","btn btn-block navigate btn-lg");
  mansion.id = "nav-mansion-btn";
  this.container.appendChild(mansion);
};


module.exports = StartView;
