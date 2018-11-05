const PubSub = require('../helpers/pub_sub.js');
const Player = require('../models/player_model.js');
const PointsTracker = require('../models/points_model.js');

const PlayerView = function(container){
  this.container = container;
  this.player = new Player;
}

var x = 0

PlayerView.prototype.bindEvents = function(){
  PubSub.publish('GameEvent:get-stats',(evt)=>{
    this.showstats()
  });
};

PlayerView.prototype.showstats = function () {
  const health = document.createElement('h4');
  health.textContent = `Hp: ${this.player.hp}`;
  health.id = "playerStatsHp"
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
      heals.textContent = `Health Packs: ${this.player.heals}`
    }
    if (content == "trap"){
      PubSub.subscribe(`Trap:trap-damage${x}`,(evt)=>{
        x += 1
        const trapDamage = evt.detail;
        this.player.hp -= trapDamage;
        health = document.querySelector('#playerStatsHp')
        health.textContent = `Hp: ${this.player.hp}`
      });
    };
    if (content == "monster"){
      const points = new PointsTracker();
      const monsters = points.monsterLevel();
      PubSub.publish(`PointsTracker:monster-level`,monsters)
    }
  });
};


module.exports = PlayerView
