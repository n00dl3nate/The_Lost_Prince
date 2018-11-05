const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('../views/player_view.js');

const Player = function () {
  this.hp = 100
  this.attack = 1
  this.heals = 0
}

Player.prototype.bindEvents = function(){
  PubSub.subscribe('GameEvent:weapon-upgrade',(evt)=>{
    this.upgradeAttack();
    Pubsub.subscribe('GameEvent:get-stats')
  });
};

Player.prototype.removeHealth = function (amount) {
  // this.hp -= amount;
};

Player.prototype.upgradeAttack = function () {
  // this.attack += 1;
};

Player.prototype.useHealthPack = function () {
  if (this.hp >= 75){
    let heal = 100 - this.hp
    this.hp += heal
    this.heals -= 1;
  }
  else{
  this.hp += 25;
  this.heals -= 1;
  };
};

module.exports = Player
