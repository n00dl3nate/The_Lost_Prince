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
    counter += 1
    this.container.innerHTML = "";

    // Assign Variables for the room
    const exitLeft = evt.detail.exit_left;

    // console.log('left: ',exitLeft);
    const exitRight = evt.detail.exit_right;
    // console.log('right: ',exitRight);
    const exitForward = evt.detail.exit_forward;
    // console.log('Forward: ',exitForward);

    const content = evt.detail.content;

    PubSub.publish('TextView:room-content',content);

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


    if (exitLeft == 1){
      exits += 'LEFT ';
      leftNavButton.disabled=false;
      leftNavButton.setAttribute('class','navigate btn btn-lg');
    } else {
      leftNavButton.disabled=true;
      leftNavButton.setAttribute('class','btn-disabled navigate btn btn-lg');
    };
    if (exitRight == 1){
      exits += 'RIGHT ';
      rightNavButton.disabled=false;
      rightNavButton.setAttribute('class','navigate btn btn-lg');
    } else {
      rightNavButton.disabled=true;
      rightNavButton.setAttribute('class','btn-disabled navigate btn btn-lg');
    };
    if (exitForward == 1){
      exits += 'FORWARD ';
      forwardNavButton.disabled=false;
      forwardNavButton.setAttribute('class','navigate btn btn-lg');
    } else {
      forwardNavButton.disabled=true;
      forwardNavButton.setAttribute('class','btn-disabled navigate btn btn-lg');
    };

    // Describe the room
    const details = new RoomDetails();
    const room_description = details.bindEvents();
    var room_details = `${room_description}`;

    // Fancy up the room contents
    var content_result = '';
    var roomDescription = '';
    switch(content){
      case 'health':
        content_result = 'You have found a Health Pack!';
        // Run function to add 1 to health packs
        roomDescription = document.createElement('p');
        roomDescription.textContent = `${room_details} ${content_result} ${exits}.`;
        this.container.appendChild(roomDescription);
        break;

      case 'upgrade':
        content_result = 'You have found a Weapon Upgrade! (Attack + 1)';
        // run function to increase attack
        PubSub.publish('GameEvent:weapon-upgrade');

        roomDescription = document.createElement('p');
        roomDescription.textContent = `${room_details} ${content_result} ${exits}.`;
        this.container.appendChild(roomDescription);
        break;

      case 'trap':
        console.log('Trap Room');
        const unfortunateCircumstance = new UnfortunateCircumstance();
        const circumstance = unfortunateCircumstance.bindEvents();

          this.container.innerHTML = "";
          const trap = circumstance.trap;
          const trapDamage = circumstance.damage;


          PubSub.publish(`Trap:trap-damage${x}`,trapDamage);
          x += 1
          roomDescription = document.createElement('p');
          roomDescription.textContent = `${room_details} ${trap} It hurts you for ${trapDamage}HP! ${exits}.`;
          this.container.appendChild(roomDescription);
        break;

      case 'monster':
        // generate a monster!
        // console.log('YOU ARE HERE');

        PubSub.subscribe('Monster:monster-ready',(evt)=>{
          this.container.innerHTML = "";
          // console.log('MONSTER: ',evt.detail.name);
          const name = evt.detail.name;
          const attack = evt.detail.attack;
          var monsterHP = evt.detail.hp;
          const rating = evt.detail.rating;
          const size = evt.detail.size;
          const type = evt.detail.type;

          // Display your chances of beating the monster
          var fight_chance = '';
          if (monsterHP > 20){
            fight_chance = `The ${name} looks very tough...`;
          } else if (monsterHP < 8){
            fight_chance = `The ${name} looks weak...`;
          } else {
            fight_chance = `The ${name} looks like you could take it...`;
          };


          content_result = `You have stumbled upon a monster... The ${name} is a ${size} ${type}. ${fight_chance}`
          // console.log(`You have stumbled upon a monster... The ${name} is a ${size} ${type}. ${fight_chance}`);
          roomDescription = document.createElement('p');
          roomDescription.textContent = `${room_details} ${content_result} ${exits}.`;
          this.container.appendChild(roomDescription);

          // Run fight logic
          var fight = true;

          if (fight == true){
            leftNavButton.disabled = true;
            leftNavButton.setAttribute('class','btn-disabled navigate btn btn-lg');
            rightNavButton.disabled = true;
            rightNavButton.setAttribute('class','btn-disabled navigate btn btn-lg');
            forwardNavButton.disabled = true;
            forwardNavButton.setAttribute('class','btn-disabled navigate btn btn-lg');

            attackButton.disabled = false;
            attackButton.setAttribute('class','btn-block navigate btn btn-lg');
            defendButton.disabled = false;
            defendButton.setAttribute('class','btn-block navigate btn btn-lg');
            runButton.disabled = false;
            runButton.setAttribute('class','btn-block navigate btn btn-lg');

            PubSub.publish('Fight:fight-started',evt.detail);
            PubSub.subscribe('Fight:fight-result',(evt)=>{
              var fightResult = evt.detail;
              console.log('Fight Result: ',fightResult);

              this.container.innerHTML = "";
              roomDescription = document.createElement('p');
              roomDescription.textContent = `${fightResult}`;
              this.container.appendChild(roomDescription);
            });
          }
        });
        break;
    }

    // console.log('container: ',this.container);

    // console.log('Room Display: ',evt.detail)
  });
};

module.exports = TextView;
