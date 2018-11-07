const PubSub = require('../helpers/pub_sub.js');

const PointsTracker = function () {
  this.easyMonsters = [35, 264, 180, 150];
  this.mediumMonsters = [177, 143, 133, 199];
  this.hardMonsters = [79, 298, 118, 148];
  this.allMonsters = [35, 264, 180, 150, 177, 143, 133, 199, 79, 298, 118, 148];
  this.playerPoints = 0;
  this.roomPoints = 0;
};


// Reach medium/hard monsters (based on player points):
PointsTracker.prototype.monsterLevel = function () {
  // var monsters = null;
  // if (this.playerPoints <= 30) {
  //   monsters = this.easyMonsters;
  // } else if (this.playerPoints >= 31 && this.playerPoints < 60) {
  //   monsters = this.mediumMonsters;
  // } else if (this.playerPoints >= 60) {
  //   monsters = this.hardMonsters;
  // };

  const monsters = this.allMonsters;

  return monsters
};


// PointsTracker.prototype.addPlayerPoints = function () {
//   this.playerPoints += 10;
// };


PointsTracker.prototype.reachHalfWay = function () {
  if (this.roomPoints >= 15) {
    const playerImage = document.querySelector("img.player");
    playerImage.setAttribute("src", "./images/Player2-sm.gif");
  };
};


//Reach end point:
PointsTracker.prototype.reachEndPoint = function () {
  if (this.roomPoints >= 30) {
    PubSub.publish('PointsTracker:end-point-reached');
  };
};

//

module.exports = PointsTracker;
