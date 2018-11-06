const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');
const Fight = require('./fight_model.js');
const FightGood = function(){
  this.fight = new Fight;
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

    PubSub.subscribe('Fight:fight-result',(evt)=>{
      // var fightResult = evt.detail;
      // console.log('Fight Result: ',fightResult);
      //
      // this.container.innerHTML = "";
      // attackDescription = document.createElement('p');
      // attackDescription.textContent = fightResult;
      // this.container.appendChild(attackDescription);
      // fight = false;
      console.log('Attack Result');
    });

    PubSub.subscribe('Fight:enemy-result',(evt)=>{
      // console.log('SUBBED: ',evt.detail);
      // var revengeResult = evt.detail;
      //
      // var revengeDescription = document.createElement('p');
      // revengeDescription.textContent = revengeResult;
      // this.container.appendChild(revengeDescription);
      // fight = false;
      console.log('Attacked Result');
    });
    PubSub.subscribe('Fight:escape',(evt)=>{
      // var escapeDescription = document.createElement('p');
      // escapeDescription.textContent = evt.detail;
      // this.container.appendChild(escapeDescription);
      // fight = false;
      // break;
      console.log('Escape Result');
    });
  })
}

FightGood.prototype.attack = function(enemy){


  this.fight.playerAttack(enemy);

  this.fight.monsterAttack(enemy);

//   const enemyName = enemy.name;
//   var enemyHp = enemy.hp;
//   const enemyAtk = enemy.attack;

//   const playerAtk = 5;

//   var playerRoll = this.roll() + playerAtk;
//   var enemyRoll = this.roll() + enemyAtk;

//   var attackResult = '';
//   var fightDamage = 0;

//   if (playerRoll == enemyRoll){
//     attackResult = `You attacked the ${enemyName}. It parried!`;
//   } else if (playerRoll > enemyRoll){
//     fightDamage = playerRoll - enemyRoll;
//     attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${fightDamage} Damage!`;
//     // Update enemy HP

//   } else {
//     attackResult = `You attacked the ${enemyName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. You failed to hurt it.`
//   }
//   var playerRoll = this.roll() + playerAtk;
//   var enemyRoll = this.roll() + enemyAtk;

//   var revengeResult = '';
//   var fightDamage = 0;

//   if (enemyRoll == playerRoll){
//     revengeResult = `The ${enemyName} attacked you, but you parried!`;
//   } else if (enemyRoll > playerRoll){
//     fightDamage = enemyRoll - playerRoll;
//     revengeResult = `The ${enemyName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. You take ${fightDamage} Damage!`;
//     // Update player HP

//   } else {
//     revengeResult = `The ${enemyName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. It failed to hurt you physically, but emotionally you are devastated.`
//   }
//   PubSub.publish('Fight:fight-result',attackResult);
//   PubSub.publish('Fight:enemy-result',revengeResult)


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
