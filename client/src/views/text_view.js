const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('./player_view.js')
const UnfortunateCircumstance = require('../models/traps.js');
const RoomDetails = require('../models/room_details.js');
const Fight = require('../models/fight_model.js');
const PointsTracker = require('../models/points_model.js');
const Monster = require('../models/monster_model')
const Interface = require('../models/interface.js')

const TextView = function(container){
  this.container = container;
  this.fight = new Fight;
  this.trap = new UnfortunateCircumstance;
  this.interface = new Interface;
};

const points = new PointsTracker();
monsterList = points.allMonsters
player = new PlayerView;
const monsterModel = new Monster();


TextView.prototype.setupRoomDetails = function(evt){

  points.roomPoints += 1;
  console.log("RoomPoints", points.roomPoints);

  this.container.innerHTML = "";

  // Assign Variables for the room
  const exitLeft = evt.detail.exit_left;
  const exitRight = evt.detail.exit_right;
  const exitForward = evt.detail.exit_forward;
  const content = evt.detail.content;
  console.log(content,"CONTENT@@@@@@@@@@@");
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
  this.interface.disableAllFightButtons()

  if (setupRoom[0].exitLeft == 1){
    exits += 'LEFT ';
    this.interface.enableLeftButton()
  } else {
    this.interface.disableLeftButton()
  };
  if (setupRoom[0].exitRight == 1){
    exits += 'RIGHT ';
    this.interface.enableRightButton()
  } else {
    this.interface.disableRightButton()
  };
  if (setupRoom[0].exitForward == 1){
    exits += 'FORWARD ';
    this.interface.enableForwardButton()
  } else {
    this.interface.disableForwardButton()
  };
  return exits;
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
      PubSub.publish('GameEvent:weapon-upgrade');
      roomDescription = `${room_details} ${content_result} ${exitSetup}.`;
      console.log ('TEXT: ',roomDescription)
      return roomDescription;
      break;

    case 'trap':
      let trap = this.trap.spawnTrap();
      PubSub.publish(`Trap:trap-damage`,trap.damage);
      roomDescription = `${room_details} ${trap.trap} It hurts you for ${trap.damage}HP! ${exitSetup}.`;
      return roomDescription;
    break;

    case 'monster':
      let choice = monsterList[Math.floor(Math.random()*monsterList.length)];
      monsterModel.getMonster(choice)
    break;
  };

}

TextView.prototype.createMonsterBar = function(monster){
  var monsterBarContainer = document.getElementById('enemybar');
  monsterBarContainer.setAttribute('class','progress progress-enemy');
  monsterBarContainer.setAttribute('style','height:20px;');
  var monsterBar = document.createElement('div');
  monsterBar.setAttribute('class','progress-bar bg-success progress-bar-striped progress-bar-animated');
  monsterBar.setAttribute('id','enemy-hp-bar');
  monsterBar.setAttribute('role','progressbar');
  monsterBar.setAttribute('style','width:100%');
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

TextView.prototype.print= function(input){
  roomDescription = document.createElement('p');
  roomDescription.textContent = input;
  this.container.appendChild(roomDescription);
}


TextView.prototype.setMonster = function (monsterurl){
  points.reachEndPoint();
  monsterImg = document.querySelector("#monsterPlacement")
  monsterImg.src = monsterurl;
  console.log(monsterImg,"This Is monster Image");
  }

TextView.prototype.showDice = function(playerDice,enemyDice){
  playerDiceBox = document.getElementById('player-dicebox');
  playerDiceBox.textContent = playerDice;
  enemyDiceBox = document.getElementById('enemy-dicebox');
  enemyDiceBox.textContent = enemyDice;
}

TextView.prototype.monsterHealthSetUp = function (monster) {
  const monsterhtml = document.querySelector('#monsterHp')
  monsterhtml.textContent = `monsterHp`
  monsterhtml.value = monster.hp
  content_result = this.displayDetails(monster)
}


TextView.prototype.bindEvents = function(){
  PubSub.subscribe(`RoomGenerated:room-created`,(evt)=>{
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

  PubSub.subscribe(`Monster:monster-ready`,(evt)=>{
    let monster = evt.detail;
    this.monsterHealthSetUp(monster)
    this.setMonster(monster.url);
    this.createMonsterBar(monster);
    this.print(content_result);
    this.interface.disableAllNavButtons()
    this.interface.enableAllFightButtons()
  });

  PubSub.subscribe('Dice:input',(evt)=>{
    showDice = evt.detail;
    playerDice = showDice[0];
    enemyDice = showDice[1];
    this.showDice(playerDice,enemyDice);
  })
};



module.exports = TextView;
