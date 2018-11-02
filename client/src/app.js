const PubSub = require('./helpers/pub_sub.js');
const Monster = require('./models/monster_model.js');
const RoomGenerator = require('./models/room_model.js');
const InterfaceStuff = require('./models/room_model.js');

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);
  const monster = new Monster;
  monster.bindEvents()

  const generateRoom = document.querySelector('button.navigate');
  const newRoom = new RoomGenerator();
  newRoom.bindEvents();

  const interfaceButtons = new InterfaceStuff();
  interfaceButtons.bindEvents();
});
