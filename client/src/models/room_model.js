const PubSub = require('../helpers/pub_sub.js');

const RoomGenerator = function(){};

RoomGenerator.prototype.bindEvents = function(){
  // Listen for a direction button to be clicked. Makes no difference, really
  PubSub.subscribe('DirectionButton:direction-clicked',(evt)=>{
    // Randomise what the room contains
    var content_select_random = Math.floor(Math.random()*3);
    console.log('Contents: ',content_select_random);
    var content_select = '';

    switch (content_select_random){
      case 0: content_select = 'monster';break;
      case 1: content_select = 'health';break;
      case 2: content_select = 'upgrade';break;
      default: content_select = 'null';
    }

    // Randomise exits from the room
    var exit_left = Math.floor(Math.random()*2);
    var exit_right = Math.floor(Math.random()*2);
    var exit_forward = Math.floor(Math.random()*2);

    // If it stupidly generates no exits, automatically create one ahead of you
    if (exit_left == 0 && exit_right == 0 && exit_forward == 0){
      exit_forward = 1;
    }

    // Make the room object ready to publish
    const room = {
      content: content_select,
      exit_left: exit_left,
      exit_right: exit_right,
      exit_forward: exit_forward
    };

    PubSub.publish('RoomGenerated:room-created',room);
    console.log('Room Details: ',room);
  });

  // PubSub.subscribe('RoomGenerated:room-created',(evt)=>{
  //
  // });
};



module.exports = RoomGenerator;
