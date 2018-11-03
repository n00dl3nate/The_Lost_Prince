const PubSub = require('../helpers/pub_sub.js');

const Interface = function(){
<<<<<<< HEAD
  
=======

>>>>>>> da17e1591150cf5fcf628da34c28ac4fa2ef4791
};

Interface.prototype.bindEvents = function(){
  const navigate = document.addEventListener('click',()=>{
    PubSub.publish('DirectionButton:direction-clicked');
  });
}

<<<<<<< HEAD


=======
>>>>>>> da17e1591150cf5fcf628da34c28ac4fa2ef4791
module.exports = Interface;
