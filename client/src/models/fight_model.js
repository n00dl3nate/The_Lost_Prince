const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');

const Fight = function () {
  this.player = new Player;
};


Fight.prototype.roll = function(){
  return Math.floor(Math.random()*10)+1;
}

Fight.prototype.playerAttack = function (monster){
  //monster declaration
  const monsterName = monster.name;
  const monsterAttack = monster.attack;
  //Dice Roll Values Per Attack
  const playerAtk = this.player.getAttackHtml();
  const playerRoll = this.roll() + playerAtk;
  const enemyRoll = this.roll() + monsterAttack;
  //Damage for monster
  let monsterDamage = playerRoll - enemyRoll;
  let monsterHp = (monster.hp - monsterDamage)
  //Result declaration
  let result = '';
  //Deciding attack outCome Player Attack
  if (playerRoll == enemyRoll){
    result = `You attacked the ${monsterName}. It parried!`;
  }
  if (monsterHp <= 0){
    result = `You attacked the ${monsterName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${monsterDamage} Damage! The Monster Is Dead!`;
  }
  else {
    result = `You attacked the ${monsterName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${monsterDamage} Damage! Monster Hp:${monsterHp}`;
  };

  const newMonster = {
    name: monster.name,
    attack: monster.attack,
    hp: monster.hp
  }

  PubSub.publish('Fight:fight-result',result);
  return newMonster

};

Fight.prototype.monsterAttack = function (monster) {
  //monster declaration
  const monsterName = monster.name;
  const monsterAttack = monster.attack;
  //Dice Roll Values Per Attack
  const playerAtk = this.player.getAttackHtml();
  const playerRoll = this.roll() + playerAtk;
  const enemyRoll = this.roll() + monsterAttack;
  //Damage for monster
  let monsterDamage = playerRoll - enemyRoll;
  //Result declaration
  let result = '';
  //player
  let playerhp = (this.player.getHpHtml() - monsterDamage);
  player.updateHp(playerhp)
  //Deciding attack outCome Player Attack
  if (playerRoll == enemyRoll){
    result = `The ${monsterName} attacked you, but you parried!`;
  }
  if (playerhp <= 0){
    result = `The ${monsterName} attacked you. It rolled [${monsterName}] and you rolled [${playerRoll}]. You take ${monsterDamage} Damage! You Are Dead`;
    //Dead screen function
  }
  else {
    result = `The ${monsterName} attacked you. It rolled [${monsterName}] and you rolled [${playerRoll}]. You take ${monsterDamage} Damage!`
  };

  PubSub.publish('Fight:enemy-result',result);

}

Fight.prototype.startFight = function (monster) {

  let newMonster = Fight.playerAttack(monster);

  if (newMonster.hp > 0){
     Fight.monsterAttack(monster)
  };

  return newMonster;

}
module.exports = Fight
