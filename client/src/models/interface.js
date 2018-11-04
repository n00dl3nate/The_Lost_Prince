const PubSub = require('../helpers/pub_sub.js');
const RoomGenerator = require('./room_model.js')


const Interface = function(){};

Interface.prototype.bindEvents = function(){

  const newRoom = new RoomGenerator();
  newRoom.bindEvents();


  const navigate = document.addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked');
  });

};


module.exports = Interface;
