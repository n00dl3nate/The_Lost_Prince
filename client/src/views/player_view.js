const PubSub = require('../helpers/pub_sub.js');
const Player = require('../models/player_model.js');

const PlayerView = function(container){
  this.container = container;
  this.player = new Player;
}

PlayerView.prototype.showstats = function () {
  const health = document.createElement('h4');
  health.textContent = `Hp: ${this.player.hp}`;
  this.container.appendChild(health)
  const attack = document.createElement('h4');
  attack.textContent = `Attack: ${this.player.attack}`;
  this.container.appendChild(attack)
  const heals = document.createElement('h4');
  heals.textContent = `Health Packs: ${this.player.heals}`;
  this.container.appendChild(heals)
};

module.exports = PlayerView
