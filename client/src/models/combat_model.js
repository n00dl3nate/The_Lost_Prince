const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');

const FightGood = function(){

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
  console.log(enemy);
  const enemyName = enemy.name;
  var enemyHp = enemy.hp;
  const enemyAtk = enemy.attack;

  const playerAtk = player.getAttackHtml()

  var playerRoll = this.roll() + playerAtk;
  var enemyRoll = this.roll() + enemyAtk;

  var attackResult = '';
  var fightDamage = 0;

  if (playerRoll == enemyRoll){
    attackResult = `You attacked the ${enemyName}. It parried!`;
  } else if (playerRoll > enemyRoll){
    fightDamage = playerRoll - enemyRoll;
    enemyHp -= fightDamage
    if (enemyHp <= 0){
      attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${fightDamage} Damage! The Monster Is Dead!`;
    }
    else {
      attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${fightDamage} Damage! Monster Hp:${enemyHp}`;
    }

    // Update enemy HP

  } else {
    attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. You failed to hurt it.`
  }
  var playerRoll = this.roll() + playerAtk;
  var enemyRoll = this.roll() + enemyAtk;

  var revengeResult = '';
  var fightDamage = 0;

  if (enemyRoll == playerRoll){
    revengeResult = `The ${enemyName} attacked you, but you parried!`;
  } else if (enemyRoll > playerRoll){
    fightDamage = enemyRoll - playerRoll;
    revengeResult = `The ${enemyName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. You take ${fightDamage} Damage!`;

    let playerhp = (player.getHpHtml() - fightDamage);
    console.log(player.getHpHtml(),"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    player.updateHp(playerhp)

    // Update player HP

  } else {
    revengeResult = `The ${enemyName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. It failed to hurt you physically, but emotionally you are devastated.`
  }
  PubSub.publish('Fight:fight-result',attackResult);
  PubSub.publish('Fight:enemy-result',revengeResult)

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
