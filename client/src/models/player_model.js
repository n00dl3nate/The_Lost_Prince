const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('../views/player_view.js');

const Player = function () {
  this.healthStats = document.querySelector("div#statsHealth");
  this.attackStats = document.querySelector("div#statsAttack");
  this.healsStats = document.querySelector("div#statsHeals");
  this.hp = 100
  this.attack = 6
  this.heals = 0
}


Player.prototype.bindEvents = function(){
  PubSub.subscribe('GameEvent:weapon-upgrade',(evt)=>{
    this.upgradeAttack();
    Pubsub.subscribe('GameEvent:get-stats')
  });
};

Player.prototype.removeHealth = function (amount) {
   this.hp -= amount;
   if (this.hp <0){
     this.hp = 0;
   }
};

Player.prototype.upgradeAttack = function () {
   this.attack += 1;
};

Player.prototype.useHealthPack = function () {
  if (this.getHpHtml() >= 75){
    let heal = (100 - this.getHpHtml())
    this.updateHp(this.getHpHtml() + heal)
  } else {
    this.updateHp(this.getHpHtml()+ 25)
  };
  this.updateHeals(this.getHealsHtml()-1)
};

Player.prototype.getHpHtml = function (){
  const hpDocument = document.querySelector("#playerStatsHp");
  return hpDocument.value
  }

Player.prototype.getAttackHtml = function (){
  const attackDocument = document.querySelector("#playerStatsAttack");
  return attackDocument.value
  }
Player.prototype.getHealsHtml = function (){
  const healsDocument = document.querySelector("#playerStatsHeals");
  return healsDocument.value
  }


Player.prototype.updateHp = function(value){
  const health = document.querySelector("#playerStatsHp");
  if(health.value < 0 ){
    health.value = 0;
    value = 0;
    this.hp = 0;
  };
  health.textContent = `HP: ${value}`;
  health.id = "playerStatsHp";
  health.value = value;
  this.updatePlayerBar(value);
}

Player.prototype.updateAttack = function(value){
  const attack = document.querySelector('#playerStatsAttack')
  attack.textContent = `Attack: ${value}`;
  attack.id = "playerStatsAttack";
  attack.value = value;
}

Player.prototype.updateHeals = function(value){
  const heals = document.querySelector('#playerStatsHeals')
  heals.textContent = `Health Packs: ${value}`;
  heals.id = "playerStatsHeals";
  heals.value = value;
}

Player.prototype.refresh = function(){
  this.updateHp((this.hp));
  this.updateAttack((this.attack));
  this.updateHeals((this.heals));
}

Player.prototype.updatePlayerBar = function(hp){
  var healthBar = document.getElementById('player-hp-bar');
  healthBar.textContent = `${hp} HP`;
  healthBar.setAttribute('style',`width:${hp}%`);
}

module.exports = Player
