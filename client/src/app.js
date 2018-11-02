const PubSub = require('./helpers/pub_sub.js');
const Monster = require('./models/monster_model.js');
const RoomGenerator = require('./models/room_model.js');
const InterfaceStuff = require('./models/interface.js');
const TextView = require('./views/text_view.js');

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);
  const monster = new Monster;
  monster.bindEvents()

  const newRoom = new RoomGenerator();
  newRoom.bindEvents();

  const interfaceButtons = new InterfaceStuff();
  interfaceButtons.bindEvents();

  const textBoxContainer = document.querySelector('div.text_box');
  const textBox = new TextView(textBoxContainer);
  textBox.bindEvents();

  // Text to force an update
});
