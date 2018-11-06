const PubSub = require('../helpers/pub_sub.js');

const PointsTracker = function () {
  this.easyMonsters = [35, 264, 180, 150];
  this.mediumMonsters = [177, 143, 144, 199];
  this.hardMonsters = [79, 298, 118, 148];
  this.playerPoints = 0;
  this.roomPoints = 0;
};

PointsTracker.prototype.bindEvents = function () {
  this.monsterLevel();
};

//Increase player points by monster HP:
PointsTracker.prototype.killMonster = function (monster) {
  PubSub.subscribe('GameEvent:monster-killed', (event) => {
    this.playerPoints += monster.hit_points;
  });
};


// Reach medium/hard monsters (based on player points):
PointsTracker.prototype.monsterLevel = function () {
  var monsters = null;
  if (this.playerPoints < 30) {
    monsters = this.easyMonsters;
  } else if (this.playerPoints > 30 && this.playerPoints < 60) {
    monsters = this.mediumMonsters;
  } else if (this.playerPoints > 60) {
    monsters = this.hardMonsters;
  };
  // console.log("Points Model",monsters);
  // PubSub.publish('PointsTracker:monster-level', monsters);
  return monsters
};


//Increase room points by 1:
PointsTracker.prototype.addRoomPoints = function () {
  PubSub.subscribe('DirectionButton:direction-clicked', (event) => {
    this.roomPoints += 1;
    this.reachStoryRoom();
  });
};


//Reach story room (based on room points):
PointsTracker.prototype.reachStoryRoom = function () {
  if (this.roomPoints > 5) {
   PubSub.publish('PointsTracker:story-room-reached');
  };
};

module.exports = PointsTracker;
