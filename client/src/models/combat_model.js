const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');
const Fight = require('./fight_model.js');
const FightGood = function(){
  this.fight = new Fight;
};
const playerstats = document.querySelector("div#stats");
player = new Player();

FightGood.prototype.bindEvents = function(){
  PubSub.subscribe('Fight:fight-started',(evt)=>{
    baddie = evt.detail;

    // Set up attack function
    PubSub.subscribe('Fight:attack-clicked',(baddie)=>{
      this.attack(evt.detail);
    });

    // set up defend function
    PubSub.subscribe('Fight:defend-clicked',(baddie)=>{
      this.defend(evt.detail);
    });

    // set up run function
    PubSub.subscribe('Fight:run-clicked',(baddie)=>{
      this.run(evt.detail);
    });
  })
}

FightGood.prototype.attack = function(enemy){

  this.fight.playerAttack(enemy);
  
  this.fight.monsterAttack(enemy);

}

FightGood.prototype.defend = function(enemy){
  console.log('Defending against: ',enemy);
}

FightGood.prototype.run = function(enemy){
  const enemyName = enemy.name;
  var enemyHp = enemy.hp;
  const enemyAtk = enemy.attack;
  var runResult = '';

  if (this.roll()%2 == 0){
    runResult = `You run away from the ${enemyName}. It tries to hit you but misses.`;
  } else {
    var runAway = Math.ceil(this.roll()/2);
    runResult = `You ran away from the ${enemyName}. It manages to hit you for [${runAway}] as you bravely run away.`;
  }
  PubSub.publish('Fight:escape',runResult);
};

FightGood.prototype.roll = function(){
  return Math.floor(Math.random()*10)+1;
}
module.exports = FightGood;
