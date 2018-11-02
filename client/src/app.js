const Monster = require('./models/monster_model.js');
const PubSub = require('./helpers/pub_sub.js');
const RoomGenerator = require('./models/room_model.js')

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);
  const monster = new Monster;
  monster.bindEvents()

  const roomCreate = new RoomGenerator();
  roomCreate.bindEvents();
});
