const PubSub = require('../helpers/pub_sub.js');
const Player = require('../models/player_model.js');
const PointsTracker = require('../models/points_model.js');
const GameOver = require('./game_over.js');
const Interface = require('../models/interface.js');

const PlayerView = function(container){
  this.container = container;
  this.player = new Player;
  this.interface = new Interface;
}


const points = new PointsTracker();

PlayerView.prototype.bindEvents = function(){

  PubSub.subscribe(`Trap:trap-damage`,(evt)=>{
    trapDamage = evt.detail;
    console.log(trapDamage,'!!!!!!!!!!!!!!!!!!!!!!')
    this.trapActivated(trapDamage)
  });

  this.showstats()
  this.roomContent();
  this.heal();
};

PlayerView.prototype.showstats = function () {

  const health = document.createElement('h4');
  health.textContent = `Hp: ${this.player.hp}`;
  health.id = "playerStatsHp";
  health.value = this.player.hp;
  this.player.healthStats.appendChild(health);

  const attack = document.createElement('h4');
  attack.textContent = `Attack: ${this.player.attack}`;
  attack.id = "playerStatsAttack";
  attack.value = this.player.attack;
  this.player.attackStats.appendChild(attack);

  const heals = document.createElement('h4');
  heals.textContent = `Health Packs: ${this.player.heals}`;
  heals.id = "playerStatsHeals";
  heals.value = this.player.heals;
  this.player.healsStats.appendChild(heals)

};

PlayerView.prototype.roomContent = function () {
  PubSub.subscribe('TextView:room-content',(event) => {
    //checking after every room wether to enable health packs
    if ((this.CheckingHeals() == true) && (this.player.getHpHtml() < 100)){
      this.enableHeal()
    };

    content = event.detail;
    console.log(content,"this is your content Player view")

    attack = document.querySelector('#playerStatsAttack')
    heals = document.querySelector('#playerStatsHeals')
    health = document.querySelector('#playerStatsHp')

    if (content == "upgrade") {
      this.player.updateAttack((this.player.attack += 1))
    };

    if (content == "health"){
      this.player.updateHeals((this.player.getHealsHtml()+1))
      if (this.player.getHpHtml() >= 100)
      { this.disableHeal(); }
      else {this.enableHeal();}
    };

  });
};

PlayerView.prototype.CheckingHeals = function () {
  if (this.player.getHealsHtml() >= 1){
    return true;
  }
  else
    return false;
};

PlayerView.prototype.heal = function () {
  PubSub.subscribe(`PlayerButton:Heal`, (evt) => {
    if (evt.detail == 'heal'){
      this.player.useHealthPack()
      if ((this.CheckingHeals()==false)||(this.player.getHpHtml() > 99)){
        this.disableHeal()
      };
      if ((this.CheckingHeals()==true)&&(this.player.getHpHtml() < 100)){
        this.enableHeal()
      };
    };
  });
};

PlayerView.prototype.disableHeal = function () {
  const healButton = document.getElementById("nav-heal-btn")
  healButton.disabled = true
  healButton.setAttribute('class','btn-block btn-disabled navigate btn btn-lg')
}

PlayerView.prototype.enableHeal = function () {
  const healButton = document.getElementById("nav-heal-btn")
  healButton.disabled = false
  healButton.setAttribute("class","btn btn-block navigate btn-lg");
}

PlayerView.prototype.trapActivated = function (trapDamage){
  let playerhp = this.player.getHpHtml();
  this.player.updateHp(playerhp - trapDamage);
  if (this.player.getHpHtml() <= 0){
    this.player.updateHp(0);
    const gameOver = new GameOver();
    gameOver.playerDied();
  };
};

module.exports = PlayerView
