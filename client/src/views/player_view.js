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
  attack.id = "playerStatsAttack"
  this.container.appendChild(attack)
  const heals = document.createElement('h4');
  heals.textContent = `Health Packs: ${this.player.heals}`;
  heals.id = "playerStatsHeals"
  this.container.appendChild(heals)
};

PlayerView.prototype.roomContent = function () {
  PubSub.subscribe('TextView:room-content',(event) => {
    content = event.detail;
    console.log(content,"this is your content Player view")
    if (content == "upgrade") {
      this.player.attack += 1
      attack = document.querySelector('#playerStatsAttack')
      attack.textContent = `Attack: ${this.player.attack}`
      // this.container.appendChild(attack)
    }
    if (content == "health"){
      this.player.heals += 1
      heals = document.querySelector('#playerStatsHeals')
      heals.textContent = `Heals: ${this.player.heals}`
    }
  });

};

module.exports = PlayerView
