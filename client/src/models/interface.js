const PubSub = require('../helpers/pub_sub.js');

const Interface = function(){

};

Interface.prototype.bindEvents = function(){
  const leftButton = document.getElementById('nav-left-btn').addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked',leftButton);
  });
  const rightButton = document.getElementById('nav-right-btn').addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked',rightButton);
  });
  const forwardButton = document.getElementById('nav-forward-btn').addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked',forwardButton);
  });
};

module.exports = Interface;
