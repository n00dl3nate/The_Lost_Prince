const PubSub = require('../helpers/pub_sub.js');
const RoomGenerator = require('./room_model.js');

const Interface = function(container){
  this.container = container;
};

Interface.prototype.bindEvents = function(){

  PubSub.subscribe('StartView:choice-button-clicked', (event)=> {

    const newRoom = new RoomGenerator;
    newRoom.bindEvents();

    this.createButtons();

    const text = document.getElementById("text-display");
    if (event.detail == "forest") {
      text.textContent = "You make your way deeper into the forest until you reach a fork in the path. Do you head Left, Forward, or Right?";
    } else if (event.detail == "lake") {
      text.textContent = "You make your way towards a large lake until you reach a fork in the path. Do you head Left, Forward, or Right?";
    } else if (event.detail == "mansion") {
      text.textContent = "You make your way towards a towering mansion until you reach a fork in the path. Do you head Left, Forward, or Right?";
    };


    const leftButton = document.getElementById('nav-left-btn').addEventListener('click',()=>{
      PubSub.publish('DirectionButton:direction-clicked',leftButton);
    });
    const rightButton = document.getElementById('nav-right-btn').addEventListener('click',()=>{
      PubSub.publish('DirectionButton:direction-clicked',rightButton);
    });
    const forwardButton = document.getElementById('nav-forward-btn').addEventListener('click',()=>{
      PubSub.publish('DirectionButton:direction-clicked',forwardButton);
    });

    // const attackButton = document.getElementById('nav-attack-btn').addEventListener('click',()=>{
    //   PubSub.publish('Fight:attack-clicked');
    // });
    // const defendButton = document.getElementById('nav-defend-btn').addEventListener('click',()=>{
    //   PubSub.publish('Fight:defend-clicked');
    // });
    // const runButton = document.getElementById('nav-run-btn').addEventListener('click',()=>{
    //   PubSub.publish('Fight:run-clicked');
    // });

    const healButton = document.getElementById("nav-heal-btn").addEventListener('click',()=> {
      const playerstats = document.querySelector("div#stats");
      PubSub.publish(`PlayerButton:Heal`,'heal');
    });
  });
};



Interface.prototype.createButtons = function () {
  this.container.innerHTML = "";
  this.directionButtons();
  this.healButton();
};


Interface.prototype.directionButtons = function () {
  const leftButton = document.createElement("button");
  leftButton.textContent = "Left";
  leftButton.setAttribute("class","btn btn-block navigate btn-lg");
  leftButton.id = "nav-left-btn";
  this.container.appendChild(leftButton);

  const forwardButton = document.createElement("button");
  forwardButton.textContent = "Forward";
  forwardButton.setAttribute("class","btn btn-block navigate btn-lg");
  forwardButton.id = "nav-forward-btn";
  this.container.appendChild(forwardButton);

  const rightButton = document.createElement("button");
  rightButton.textContent = "Right";
  rightButton.setAttribute("class","btn btn-block navigate btn-lg");
  rightButton.name = "button";
  rightButton.id = "nav-right-btn";
  this.container.appendChild(rightButton);
};


Interface.prototype.healButton = function () {
  const healButton = document.createElement("button");
  healButton.textContent = "Use Health Pack";
  healButton.setAttribute("class","btn btn-block navigate btn-lg");
  healButton.id = "nav-heal-btn";
  healButton.setAttribute("disabled", "true");
  healButton.setAttribute("alt", "heal 25 hp");
  this.container.appendChild(healButton);
};


module.exports = Interface;
