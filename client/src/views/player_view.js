const PubSub = require('../helpers/pub_sub.js');
const Player = require('../models/player_model.js');
const PointsTracker = require('../models/points_model.js');

const PlayerView = function(container){
  this.container = container;
  this.player = new Player;
}

var x = 0;

const points = new PointsTracker();

PlayerView.prototype.bindEvents = function(){
  PubSub.publish('GameEvent:get-stats',(evt)=>{
    this.showstats()
  });
};

PlayerView.prototype.showstats = function () {

  // var healthBar = document.getElementById('HP-bar');
  // healthBar.textContent = `${this.player.hp} HP`;
  // healthBar.setAttribute('style',`width:${this.player.hp}%`);

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


    if ((this.CheckingHeals() == true) && (this.player.hp < 100)){
      const healButton = document.getElementById("nav-heal-btn")
      healButton.disabled = false
      healButton.setAttribute('class','navigate btn btn-lg')
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

      this.player.updateHeals((this.player.heals +1))

      if (this.player.hp >= 100){
        const healButton = document.getElementById("nav-heal-btn")
        healButton.disabled = true
        healButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block')
      }
      else{
        const healButton = document.getElementById("nav-heal-btn")
        healButton.disabled = false
        healButton.setAttribute("class","btn btn-block navigate btn-lg");
        }
    }

    if (content == "trap"){
      PubSub.subscribe(`Trap:trap-damage${x}`,(evt)=>{
        x += 1
        const trapDamage = evt.detail;
        this.player.hp -= trapDamage;
        if (this.player.hp <= 0){
          // player is dead
          health.textContent = 'R.I.P.';
          attack.textContent = 'Attack: Not any more';
          heals.textContent =  'Health Packs: Bit late for that'
        }
        else
        {
          this.player.updateHp(this.player.hp)
          health.textContent = `Hp: ${this.player.hp}`
        }
      });
    };
    if (content == "monster"){
      const monsters = points.monsterLevel();
      PubSub.publish(`PointsTracker:monster-level`,monsters)
    }

  });
};

PlayerView.prototype.CheckingHeals = function () {
  if (this.player.heals >= 1){
    return true;
  }
  else
    return false;
};

PlayerView.prototype.heal = function () {
  PubSub.subscribe(`PlayerButton:Heal`, (evt) => {
    if (evt.detail == 'heal'){
      this.player.updateHeals(this.player.heals += 1)
      this.player.useHealthPack()
      if ((this.CheckingHeals()==false)||(this.player.hp > 99)){
        const healButton = document.getElementById("nav-heal-btn")
        healButton.disabled = true
        healButton.setAttribute('class','btn-disabled navigate btn btn-lg')
      };
    };
  });
};



module.exports = PlayerView
