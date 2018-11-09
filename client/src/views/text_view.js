const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('./player_view.js')
const UnfortunateCircumstance = require('../models/traps.js');
const RoomDetails = require('../models/room_details.js');
const Fight = require('../models/fight_model.js');
const PointsTracker = require('../models/points_model.js');

const TextView = function(container){
  this.container = container;
  this.fight = new Fight;
};

const points = new PointsTracker();

var counter = 0;
var x = 0;
var y = 0;

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

    points.reachHalfWay();
    points.reachEndPoint();

  });

  PubSub.subscribe('Dice:input',(evt)=>{

    showDice = evt.detail;
    playerDice = showDice[0];
    enemyDice = showDice[1];

    this.showDice(playerDice,enemyDice);
  })


};

TextView.prototype.setupRoomDetails = function(evt){

  points.roomPoints += 1;
  console.log("RoomPoints", points.roomPoints);

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
  const runButton = document.getElementById('nav-run-btn');

  attackButton.disabled = true;
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
  const attackButton = document.getElementById('nav-attack-btn');
  const runButton = document.getElementById('nav-run-btn');

  leftNavButton.disabled = true;
  leftNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  rightNavButton.disabled = true;
  rightNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  forwardNavButton.disabled = true;
  forwardNavButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');

  attackButton.disabled = false;
  attackButton.setAttribute('class','btn-block navigate btn btn-lg');
  runButton.disabled = false;
  runButton.setAttribute('class','btn-block navigate btn btn-lg');
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
      this.disableNavigation();
      PubSub.subscribe(`Monster:monster-ready${y}`,(evt)=>{

        monster = evt.detail

        const monsterhtml = document.querySelector('#monsterHp')
        monsterhtml.textContent = `monsterHp`
        monsterhtml.value = monster.hp
        content_result = this.displayDetails(monster)
        roomContent = `${room_details} ${content_result} ${exitSetup}.`;
        this.printStuff(roomContent);
        this.setMonster(monster.url);
        this.createMonsterBar(monster);

        y += 1;
        this.fight.sendMonster(monster);
      });
      break;
  };

}

TextView.prototype.createMonsterBar = function(monster){
  // console.log('Create Bar: ',monster)
  var monsterBarContainer = document.getElementById('enemybar');
  monsterBarContainer.setAttribute('class','progress progress-enemy');
  monsterBarContainer.setAttribute('style','height:20px;');
  var monsterBar = document.createElement('div');
  monsterBar.setAttribute('class','progress-bar bg-success progress-bar-striped progress-bar-animated');
  monsterBar.setAttribute('id','enemy-hp-bar');
  monsterBar.setAttribute('role','progressbar');
  monsterBar.setAttribute('style','width:100%');

  // monsterHealthParse = (100/monster.hp)

  monsterBar.setAttribute('aria-valuenow',monster.hp);
  monsterBar.setAttribute('aria-valuemin','0');
  monsterBar.setAttribute('aria-valuemax',monster.hp);
  monsterBar.textContent = `${monster.name}: ${monster.hp} HP`;
  monsterBarContainer.appendChild(monsterBar);
};

TextView.prototype.displayDetails = function (monster){
  var fight_chance = '';
  if (monster.hp > 20){
    fight_chance = `The ${monster.name} looks very tough...`;
  } else if (monster.hp < 8){
    fight_chance = `The ${monster.name} looks weak...`;
  } else {
    fight_chance = `The ${monster.name} looks like you could take it...`;
  };
  content_result = `You have stumbled upon a monster... The ${monster.name} is a ${monster.size} ${monster.type}. ${fight_chance}`;
  return content_result
}

TextView.prototype.printStuff = function(input){
  roomDescription = document.createElement('p');
  roomDescription.textContent = input;
  this.container.appendChild(roomDescription);
}


TextView.prototype.setMonster = function (monsterurl){
  points.reachEndPoint();
  monsterImg = document.querySelector("#monsterPlacement")
  monsterImg.src = monsterurl;
  console.log(monsterImg,"This Is monster Image");
  // this.createHealthBar(monster)
  }

TextView.prototype.createHealthBar = function (monster){
  const div1 = document.createElement('div')
  div1.className = "progress progress-player"
  div1.setAttribute('style', "height:20px;")

  const div2 = document.createElement('div')
  div2.className = "progress-bar bg-success progress-bar-striped progress-bar-animated";
  div2.id = "player-hp-bar"
  div2.setAttribute('role', "progressbar")
  div2.setAttribute('style', "width: 100%;" )
  div2.setAttribute('aria-valuenow', "100" )
  div2.setAttribute('aria-valuemin', "0" )
  div2.setAttribute('aria-valuemax', "100" )
  div2.textContent = "100 HP"

  div1.appendChild(div2)

  const monsterHealthBar = document.querySelector("div#enemy-image")
  monsterHealthBar.appendChild(div1);
  }



TextView.prototype.showDice = function(playerDice,enemyDice){
  // console.log('Player Dice: ',playerDice);
  // console.log('Enemy Dice: ',enemyDice);
  playerDiceBox = document.getElementById('player-dicebox');
  playerDiceBox.textContent = playerDice;
  enemyDiceBox = document.getElementById('enemy-dicebox');
  enemyDiceBox.textContent = enemyDice;
  // this.container.appendChild(roomDescription);
}


module.exports = TextView;
