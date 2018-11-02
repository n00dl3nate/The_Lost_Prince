const PubSub = require('../helpers/pub_sub.js');

const Interface = function(){
  
};

Interface.prototype.bindEvents = function(){
  const navigate = document.addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked');
  });
}



module.exports = Interface;
