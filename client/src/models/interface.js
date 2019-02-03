const PubSub = require('../helpers/pub_sub.js');
const RoomGenerator = require('./room_model.js');

const Interface = function(container){
  this.container = container;
};

Interface.prototype.bindEvents = function(){

  PubSub.subscribe('StartView:choice-button-clicked', (event)=> {

    this.createButtons();

    const text = document.getElementById("text-display");
    if (event.detail == "forest") {
      text.textContent = "You make your way deeper into the forest until you reach a fork in the path. Do you head Left, Forward, or Right?";
    } else if (event.detail == "lake") {
      text.textContent = "You make your way towards a large lake until you reach a fork in the path. Do you head Left, Forward, or Right?";
    } else if (event.detail == "mansion") {
      text.textContent = "You make your way towards a towering mansion until you reach a fork in the path. Do you head Left, Forward, or Right?";
    };

    const newRoom = new RoomGenerator;
    newRoom.bindEvents();


    const leftButton = document.getElementById('nav-left-btn').addEventListener('click',()=>{
      // PubSub.publish('DirectionButton:direction-clicked',leftButton);
      newRoom.bindEvents();
    });
    const rightButton = document.getElementById('nav-right-btn').addEventListener('click',()=>{
      // PubSub.publish('DirectionButton:direction-clicked',rightButton);
      newRoom.bindEvents();
    });
    const forwardButton = document.getElementById('nav-forward-btn').addEventListener('click',()=>{
      // PubSub.publish('DirectionButton:direction-clicked',forwardButton);
      newRoom.bindEvents();
    });
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

Interface.prototype.disableLeftButton = function (){
  const leftNavButton = document.getElementById('nav-left-btn');
  leftNavButton.disabled = true;
  leftNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};

Interface.prototype.disableRightButton = function (){
  const rightNavButton = document.getElementById('nav-right-btn');
  rightNavButton.disabled = true;
  rightNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};

Interface.prototype.disableForwardButton = function() {
  const forwardNavButton = document.getElementById('nav-forward-btn');
  forwardNavButton.disabled = true;
  forwardNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};

Interface.prototype.disableAttackButton = function(){
  const attackButton = document.getElementById('nav-attack-btn');
  attackButton.disabled = true;
  attackButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};

Interface.prototype.disableHealButton = function(){
  const healButton = document.getElementById("nav-heal-btn")
  healButton.disabled = true
  healButton.setAttribute('class','btn-block btn-disabled navigate btn btn-lg')
}

Interface.prototype.enableHealButton = function(){
  const healButton = document.getElementById("nav-heal-btn")
  healButton.disabled = false
  healButton.setAttribute("class","btn btn-block navigate btn-lg");
}

Interface.prototype.disableRunButton = function(){
  const runButton = document.getElementById('nav-run-btn');
  runButton.disabled = true;
  runButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};

Interface.prototype.enableLeftButton = function(){
  const leftNavButton = document.getElementById('nav-left-btn');
  leftNavButton.disabled = false;
  leftNavButton.setAttribute('class','navigate btn btn-lg btn-block');
};

Interface.prototype.enableRightButton = function(){
  const rightNavButton = document.getElementById('nav-right-btn');
  rightNavButton.disabled = false;
  rightNavButton.setAttribute('class','navigate btn btn-lg btn-block');
};

Interface.prototype.enableForwardButton = function(){
  const forwardNavButton = document.getElementById('nav-forward-btn');
  forwardNavButton.disabled = false;
  forwardNavButton.setAttribute('class','navigate btn btn-lg btn-block');
};

Interface.prototype.enableAttackButton = function(){
  const attackButton = document.getElementById('nav-attack-btn');
  attackButton.disabled = false;
  attackButton.setAttribute('class','btn-block navigate btn btn-lg');
};

Interface.prototype.enableRunButton = function(){
  const runButton = document.getElementById('nav-run-btn');
  runButton.disabled = false;
  runButton.setAttribute('class','btn-block navigate btn btn-lg');
};

Interface.prototype.disableAllNavButtons = function(){
  this.disableLeftButton();
  this.disableRightButton();
  this.disableForwardButton();
};

Interface.prototype.enableAllNavButtons = function(){
  this.enableLeftButton();
  this.enableRightButton();
  this.enableForwardButton();
};

Interface.prototype.disableAllFightButtons = function(){
  this.disableRunButton();
  this.disableAttackButton();
}

Interface.prototype.enableAllFightButtons = function(){
  this.enableRunButton();
  this.enableAttackButton();
}

Interface.prototype.disableAllButtons = function () {
  this.disableAllNavButtons();
  this.disableAllFightButtons();
  this.disableHealButton();
};

module.exports = Interface;
