const PubSub = require('../helpers/pub_sub.js');
const RoomGenerator = require('./room_model.js');

const Interface = function(){};

Interface.prototype.bindEvents = function(){

  const newRoom = new RoomGenerator
  newRoom.bindEvents();


  const leftButton = document.getElementById('nav-left-btn').addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked',leftButton);
  });
  const rightButton = document.getElementById('nav-right-btn').addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked',rightButton);
  });
  const forwardButton = document.getElementById('nav-forward-btn').addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked',forwardButton);
  });

  const healButton = document.getElementById("nav-heal-btn").addEventListener('click',()=> {
    const playerstats = document.querySelector("div#stats");
    PubSub.publish(`PlayerButton:Heal`,'heal');
  });

};


module.exports = Interface;
