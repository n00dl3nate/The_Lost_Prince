const PubSub = require('../helpers/pub_sub.js');

const Player = function () {
  this.hp = 100
  this.attack = 0
  this.heals = 0
}

Player.prototype.removeHealth = function (amount) {
  this.hp -= amount;
};

Player.prototype.upgradeAttack = function () {
  this.attack += 1
};

Player.prototype.useHealthPack = function () {
  this.hp += 25
};
