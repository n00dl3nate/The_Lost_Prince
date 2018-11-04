const PubSub = require('../helpers/pub_sub.js');

<<<<<<< HEAD
const Interface = function(){
  
};
=======
const Interface = function(){};
>>>>>>> 061c45d7c6225e3dce4a362d7dffb83e3b19d7c9

Interface.prototype.bindEvents = function(){
  const navigate = document.addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked');
  });
<<<<<<< HEAD
}



=======
};
>>>>>>> 061c45d7c6225e3dce4a362d7dffb83e3b19d7c9
module.exports = Interface;
