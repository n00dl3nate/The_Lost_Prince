const PubSub = require('../helpers/pub_sub.js');

const PointsTracker = function (monsters) {
  this.monsters = monsters;
  this.playerPoints = 0;
  this.roomPoints = 0;
};

//Easy, Medium, Hard monster arrays:
this.easyMonsters = this.monsters.filter((monster) => {
  monster.hit_points < 8;
});
this.mediumMonsters = this.monsters.filter((monster) => {
  monster.hit_points > 8 && < 15;
});
this.hardMonsters = this.monsters.filter((monster) => {
  monster.hit_points > 15;
});


//Increase player points by monster HP:
PointsTracker.prototype.killMonster = function (monster) {
  this.playerPoints += monster.hit_points;
};


//Reach medium/hard monsters (based on player points):
PointsTracker.prototype.reachHigherMonster = function () {
  if (this.playerPoints < 30) {
    PubSub.publish('PointsTracker:easy-monsters', this.easyMonsters);
  } else if (this.playerPoints > 30 && < 60) {
    PubSub.publish('PointsTracker:medium-monsters', this.mediumMonsters);
  } else if (this.playerPoints > 20) {
    PubSub.publish('PointsTracker:hard-monsters', this.hardMonsters);
  };
};


//Increase room points by 1:
PointsTracker.prototype.addRoomPoints = function () {
  this.roomPoints += 1;
};


//Reach story room (based on room points):
// PointsTracker.prototype.reachStoryRoom = function () {
//   if (this.roomPoints > 5) {
//
//   };
// };
