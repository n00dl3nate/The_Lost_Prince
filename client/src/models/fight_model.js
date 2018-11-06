const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');
const TextView = require('../views/text_view.js');

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
  let yourResult = '';
  //Deciding attack outCome Player Attack
  if (playerRoll == enemyRoll){
    yourResult = `You attacked the ${monsterName}. It parried!`;
  }
  if (monsterHp <= 0){
    yourResult = `You attacked the ${monsterName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${monsterDamage} Damage! The Monster Is Dead!`;
  }
  else {
    yourResult = `You attacked the ${monsterName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${monsterDamage} Damage! Monster Hp:${monsterHp}`;
  };


  const newMonster = {
    name: monster.name,
    attack: monster.attack,
    hp: monster.hp
  }

  return yourResult;

};

Fight.prototype.monsterAttack = function (monster) {
  //monster declaration
  const monsterName = monster.name;
  const monsterAttack = monster.attack;
  var monsterHp = monster.hp;
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
  this.player.updateHp(playerhp)
  //Deciding attack outCome Player Attack
  if (playerRoll == enemyRoll){
    theirResult = `The ${monsterName} attacked you, but you parried!`;
  }
  if (playerhp <= 0){
    theirResult = `The ${monsterName} attacked you. It rolled [${monsterName}] and you rolled [${playerRoll}]. You take ${monsterDamage} Damage! You Are Dead`;
    //Dead screen function
  }
  else {
    theirResult = `The ${monsterName} attacked you. It rolled [${monsterName}] and you rolled [${playerRoll}]. You take ${monsterDamage} Damage!`
  };

  if (monsterHp <= 0){
    var additional = `The ${monsterName} is dead.`;
    this.enableNavigation();
    return `${theirResult} ${additional}`;
  } else {
    return theirResult;
  }



}

Fight.prototype.startFight = function (monster) {

  let newMonster = Fight.playerAttack(monster);

  if (newMonster.hp > 0){
     Fight.monsterAttack(monster)
  };

  return newMonster;

}

Fight.prototype.sendMonster = function(monsterInfo){
  PubSub.subscribe('Fight:attack-clicked',(baddie)=>{

    var yourAttack = this.playerAttack(monsterInfo);
    var theirAttack = this.monsterAttack(monsterInfo);

    this.printStuff(yourAttack,theirAttack);
  });

  // set up run function
  PubSub.subscribe('Fight:run-clicked',(baddie)=>{
    // console.log('RUNNING AWAY FROM: ',monsterInfo.name);
    // this.run(evt.detail);
  });
};

Fight.prototype.printStuff = function(yourInput,theirInput){
  const target = document.querySelector('div#text-display');
  target.innerHTML = "";

  yourAttack = document.createElement('p');
  yourAttack.textContent = yourInput;
  target.appendChild(yourAttack);

  theirAttack = document.createElement('p');
  theirAttack.textContent = theirInput;
  target.appendChild(theirAttack);
}

Fight.prototype.enableNavigation = function(){
  const leftNavButton = document.getElementById('nav-left-btn');
  const rightNavButton = document.getElementById('nav-right-btn');
  const forwardNavButton = document.getElementById('nav-forward-btn');
  const attackButton = document.getElementById('nav-attack-btn');
  const defendButton = document.getElementById('nav-defend-btn');
  const runButton = document.getElementById('nav-run-btn');

  leftNavButton.disabled = false;
  leftNavButton.setAttribute('class','navigate btn btn-lg btn-block');
  rightNavButton.disabled = false;
  rightNavButton.setAttribute('class','navigate btn btn-lg btn-block');
  forwardNavButton.disabled = false;
  forwardNavButton.setAttribute('class','navigate btn btn-lg btn-block');

  attackButton.disabled = true;
  attackButton.setAttribute('class','btn-disabled btn-block navigate btn btn-lg');
  defendButton.disabled = true;
  defendButton.setAttribute('class','btn-disabled btn-block navigate btn btn-lg');
  runButton.disabled = true;
  runButton.setAttribute('class','btn-disabled btn-block navigate btn btn-lg');
};

Fight.prototype.updateMonsterBar = function(hp){
  var healthBar = document.getElementById('monster-hp-bar');
  healthBar.textContent = `${hp} HP`;
  healthBar.setAttribute('style',`width:${hp}%`);
}

module.exports = Fight
