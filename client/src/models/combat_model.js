const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');

const FightGood = function(){

};

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
  const enemyName = enemy.name;
  var enemyHp = enemy.hp;
  const enemyAtk = enemy.attack;

  const playerAtk = 5;

  var playerRoll = this.roll() + playerAtk;
  var enemyRoll = this.roll() + enemyAtk;

  var attackResult = '';
  var fightDamage = 0;

  if (playerRoll == enemyRoll){
    attackResult = `You attacked the ${enemyName}. It parried!`;
  } else if (playerRoll > enemyRoll){
    fightDamage = playerRoll - enemyRoll;
    attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${fightDamage} Damage!`;
    // Update enemy HP

  } else {
    attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. You failed to hurt it.`
  }
  PubSub.publish('Fight:fight-result',attackResult);

}

FightGood.prototype.defend = function(enemy){
  console.log('Defending against: ',enemy);
}

FightGood.prototype.run = function(enemy){
  console.log('Running from: ',enemy);
}

FightGood.prototype.roll = function(){
  return Math.floor(Math.random()*6)+1;
}

module.exports = FightGood;
