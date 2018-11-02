const Game = require('./models/game.js');
const RoomGenerator = require('./models/room_model.js');

document.addEventListener('DOMContentLoaded',()=>{
  const roomCreate = new RoomGenerator();
  roomCreate.bindEvents();
});
