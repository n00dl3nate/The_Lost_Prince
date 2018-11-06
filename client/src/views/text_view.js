const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('./player_view.js')
const UnfortunateCircumstance = require('../models/traps.js');
const RoomDetails = require('../models/room_details.js');

const TextView = function(container){
  this.container = container;
};

var counter = 0;
var x = 0;

player = new PlayerView;

TextView.prototype.bindEvents = function(){
  PubSub.subscribe(`RoomGenerated:room-created${counter}`,(evt)=>{
    counter += 1;

    var setupRoom = this.setupRoomDetails(evt);
    var exitSetup = this.setupExits(setupRoom);

    // Describe the room
    const details = new RoomDetails();
    const room_description = details.bindEvents();
    var room_details = `${room_description}`;

    var roomContent = this.pageContent(content,room_details,exitSetup);
    console.log('Page Content: ',roomContent);

    roomDescription = document.createElement('p');
    roomDescription.textContent = roomContent;
    this.container.appendChild(roomDescription);
  });
};

TextView.prototype.setupRoomDetails = function(evt){
  this.container.innerHTML = "";

  // Assign Variables for the room
  const exitLeft = evt.detail.exit_left;
  const exitRight = evt.detail.exit_right;
  const exitForward = evt.detail.exit_forward;
  const content = evt.detail.content;

  PubSub.publish('TextView:room-content',content);

  return [
    {
      exitLeft:exitLeft,
      exitRight:exitRight,
      exitForward:exitForward
    }
  ];
};

TextView.prototype.setupExits = function(setupRoom){
  // Organise the exits into a fancy style
  var exits = 'Exits: ';
  const leftNavButton = document.getElementById('nav-left-btn');
  const rightNavButton = document.getElementById('nav-right-btn');
  const forwardNavButton = document.getElementById('nav-forward-btn');
  const attackButton = document.getElementById('nav-attack-btn');
  const defendButton = document.getElementById('nav-defend-btn');
  const runButton = document.getElementById('nav-run-btn');

  attackButton.disabled = true;
  defendButton.disabled = true;
  runButton.disabled = true;

  if (setupRoom[0].exitLeft == 1){
    exits += 'LEFT ';
    leftNavButton.disabled=false;
    leftNavButton.setAttribute('class','navigate btn btn-lg btn-block');
  } else {
    leftNavButton.disabled=true;
    leftNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  };
  if (setupRoom[0].exitRight == 1){
    exits += 'RIGHT ';
    rightNavButton.disabled=false;
    rightNavButton.setAttribute('class','navigate btn btn-lg btn-block');
  } else {
    rightNavButton.disabled=true;
    rightNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  };
  if (setupRoom[0].exitForward == 1){
    exits += 'FORWARD ';
    forwardNavButton.disabled=false;
    forwardNavButton.setAttribute('class','navigate btn btn-lg btn-block');
  } else {
    forwardNavButton.disabled=true;
    forwardNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  };
  console.log(exits)
  return exits;
};

TextView.prototype.disableNavigation = function(){
  const leftNavButton = document.getElementById('nav-left-btn');
  const rightNavButton = document.getElementById('nav-right-btn');
  const forwardNavButton = document.getElementById('nav-forward-btn');

  leftNavButton.disabled = true;
  leftNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  rightNavButton.disabled = true;
  rightNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  forwardNavButton.disabled = true;
  forwardNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};

TextView.prototype.pageContent = function(content,room_details,exitSetup){
  var content_result = "";
  var roomDescription = "";

  switch(content){
    case 'health':
      content_result = 'You have found a Health Pack!';
      roomDescription = `${room_details} ${content_result} ${exitSetup}.`;
      return roomDescription;
      break;

    case 'upgrade':
      content_result = 'You have found a Weapon Upgrade! (Attack + 1)';
      // run function to increase attack
      PubSub.publish('GameEvent:weapon-upgrade');
      roomDescription = `${room_details} ${content_result} ${exitSetup}.`;
      console.log ('TEXT: ',roomDescription)
      return roomDescription;
      break;

    case 'trap':
      console.log('Trap Room');
      const unfortunateCircumstance = new UnfortunateCircumstance();
      const circumstance = unfortunateCircumstance.bindEvents();

      const trap = circumstance.trap;
      const trapDamage = circumstance.damage;


      PubSub.publish(`Trap:trap-damage${x}`,trapDamage);
      x += 1

      roomDescription = `${room_details} ${trap} It hurts you for ${trapDamage}HP! ${exitSetup}.`;
      return roomDescription;
      break;

    case 'monster':
      // generate a monster!

      // PubSub.subscribe('Monster:monster-ready',(evt)=>{
      //   // console.log('MONSTER: ',evt.detail.name);
      //   const name = evt.detail.name;
      //   const attack = evt.detail.attack;
      //   var monsterHP = evt.detail.hp;
      //   const rating = evt.detail.rating;
      //   const size = evt.detail.size;
      //   const type = evt.detail.type;
      //
      //   // Display your chances of beating the monster
      //   var fight_chance = '';
      //   if (monsterHP > 20){
      //     fight_chance = `The ${name} looks very tough...`;
      //   } else if (monsterHP < 8){
      //     fight_chance = `The ${name} looks weak...`;
      //   } else {
      //     fight_chance = `The ${name} looks like you could take it...`;
      //   };


        // content_result = `You have stumbled upon a monster... The ${name} is a ${size} ${type}. ${fight_chance}`
        content_result = "Shit the bed, it's a fucking monster!";

        roomDescription = `${room_details} ${content_result} ${exitSetup}.`;
        return roomDescription;
        // Run fight logic
        // this.disableNavigation();
        //
        // var fight = true;
        //
        // if (fight == true){
        //
        //   attackButton.disabled = false;
        //   attackButton.setAttribute('class','btn-block navigate btn btn-lg');
        //   defendButton.disabled = true;
        //   defendButton.setAttribute('class','btn-block navigate btn btn-lg');
        //   runButton.disabled = false;
        //   runButton.setAttribute('class','btn-block navigate btn btn-lg');
        //
        //   PubSub.publish('Fight:fight-started',evt.detail);
        //   PubSub.publish('Fight:enemy-attack',evt.detail);
        //
        //   console.log('Fight Status: ',fight)
        // };
      // });
      break;
  };

}

// lksdjfnbl;shdnkjsbnskj
// update pls

module.exports = TextView;
