const PubSub = require('../helpers/pub_sub.js');

const TextView = function(container){
  this.container = container;
};

TextView.prototype.bindEvents = function(){
  PubSub.subscribe('RoomGenerated:room-created',(evt)=>{
    this.container.innerHTML = "";

    // Assign Variables for the room
    const exitLeft = evt.detail.exit_left;
    console.log('left: ',exitLeft);
    const exitRight = evt.detail.exit_right;
    console.log('right: ',exitRight);
    const exitForward = evt.detail.exit_forward;
    console.log('Forward: ',exitForward);
    const content = evt.detail.content;
    // Organise the exits into a fancy style
    var exits = '';
    if (exitLeft == 1){exits += 'LEFT '};
    if (exitRight == 1){exits += 'RIGHT '};
    if (exitForward == 1){exits += 'FORWARD '};

    console.log('container: ',this.container);
    const roomDescription = document.createElement('p');
    roomDescription.textContent = `This room has exits to the ${exits}. There is a ${content} here. Oh Shit.`

    // evt.detail;
    this.container.appendChild(roomDescription);
    // console.log('Room Display: ',evt.detail)
  });
};

module.exports = TextView;
