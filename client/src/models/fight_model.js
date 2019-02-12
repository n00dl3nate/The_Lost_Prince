const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player_model.js');
const TextView = require('../views/text_view.js');
const GameOver = require('../views/game_over.js');
const PointsTracker = require('./points_model.js');
const Interface = require('./interface.js')

const Fight = function () {
  this.player = new Player;
  this.gameOver = new GameOver();
  this.interface = new Interface
};

const pointsTracker = new PointsTracker();

Fight.prototype.roll = function(){
  return Math.floor(Math.random()*20)+1;
}


Fight.prototype.playerAttack = function (monster){
  //monster declaration
  if (monster != null){
    let monsterName = monster.name;
    let monsterAttack = monster.attack;

    //Dice Roll Values Per Attack
    let playerAtk = this.player.getAttackHtml();
    let playerRoll = this.roll() + playerAtk;
    let enemyRoll = this.roll() + monsterAttack;

    let diceUpdate = [playerRoll,enemyRoll];
    PubSub.publish('Dice:input',diceUpdate);

    //Result declaration
    let yourResult = '';
    //Deciding attack outCome Player Attack

    if (playerRoll == enemyRoll){
      yourResult = `You attacked the ${monsterName} (${this.getMonsteHp()} HP). It parried!`;
    } else if (playerRoll < enemyRoll){
      yourResult = `You attacked the ${monsterName} (${this.getMonsteHp()} HP). You rolled [${playerRoll}] and it rolled [${enemyRoll}]. You failed to hurt it.`
    } else {
      var monsterDamage = 0
      if ((playerRoll/2) >= enemyRoll){
        console.log('CRITICAL HIT');
        monsterDamage = (playerRoll - enemyRoll)*2;
        this.updateMonsterHp(this.getMonsteHp() - monsterDamage);
        this.updateMonsterBar(this.getMonsteHp());
        yourResult = `You attacked the ${monsterName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. CRITICAL HIT! It took ${monsterDamage} Damage! Monster Hp:${this.getMonsteHp()}`;
      } else {
        console.log('NORMAL HIT');
        monsterDamage = playerRoll - enemyRoll;
        this.updateMonsterHp(this.getMonsteHp() - monsterDamage);
        this.updateMonsterBar(this.getMonsteHp());
        yourResult = `You attacked the ${monsterName}. You rolled [${playerRoll}] and it rolled [${enemyRoll}]. It took ${monsterDamage} Damage! Monster Hp:${this.getMonsteHp()}`;
      }

      if (monsterDamage < 0){
        monsterDamage = 0;
      }


      if (this.getMonsteHp() < 0){
        this.updateMonsterHp(0);
      }
    };
    return yourResult;
  };
};

Fight.prototype.monsterAttack = function (monster) {
  //monster declaration
  //Dice Roll Values Per Attack
  if (monster != null){
    const monsterName = monster.name;
    const monsterAttack = monster.attack;
    const playerAtk = this.player.getAttackHtml();
    var playerRoll = this.roll() + playerAtk;
    var enemyRoll = this.roll() + monsterAttack;
    const diceUpdate = [playerRoll,enemyRoll];
    setTimeout(function(){
      PubSub.publish('Dice:input',diceUpdate);
    },2000)

    var revengeResult = '';
    var fightDamage = 0;

    if (enemyRoll == playerRoll){
      revengeResult = `The ${monsterName} attacked you, but you parried!`;
    } else if (enemyRoll > playerRoll){
      fightDamage = enemyRoll - playerRoll;
      if (fightDamage < 0){
        fightDamage = 0;
      }

      if ((enemyRoll/2) >= playerRoll){
        console.log('CRITICAL HIT');
        fightDamage = (enemyRoll - playerRoll)*2;
        revengeResult = `The ${monsterName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. You take ${fightDamage} Damage!`;
      } else {
        console.log('NORMAL HIT');
        fightDamage = enemyRoll - playerRoll;
        revengeResult = `The ${monsterName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. CRITICAL HIT! You take ${fightDamage} Damage!`;
      }

    } else {
      revengeResult = `The ${monsterName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. It failed to hurt you physically, but emotionally you are devastated.`
    }
    //

    if (this.getMonsteHp() <= 0){
      var additional = `The ${monsterName} is dead.`;
      this.killMonster()
      var diceReset = ['...','...'];
      setTimeout(function(){
        PubSub.publish('Dice:input',diceReset);
      },2000)
      return `${revengeResult} ${additional}`;
    } else {
      if (enemyRoll == playerRoll){
        revengeResult = `The ${monsterName} (${this.getMonsteHp()} HP) attacked you, but you parried!`;
      } else if (enemyRoll > playerRoll){
        fightDamage = enemyRoll - playerRoll;

        if (fightDamage < 0){
          fightDamage = 0;
        }

        if ((enemyRoll/2) >= playerRoll){
          console.log('CRITICAL HIT');
          fightDamage = (enemyRoll - playerRoll)*2;
          revengeResult = `The ${monsterName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. CRITICAL HIT! You take ${fightDamage} Damage!`;
        } else {
          console.log('NORMAL HIT');
          fightDamage = enemyRoll - playerRoll;
          revengeResult = `The ${monsterName} attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. You take ${fightDamage} Damage!`;
        }

        // Update player HP
        var newPlayerHp = this.player.getHpHtml() - fightDamage;
        this.player.updateHp(newPlayerHp);

      } else {
        revengeResult = `The ${monsterName} (${this.getMonsteHp()} HP) attacked you. It rolled [${enemyRoll}] and you rolled [${playerRoll}]. It failed to hurt you physically, but emotionally you are devastated.`
      }
      return revengeResult;
    }
  }
}

Fight.prototype.run = function(enemy){
  if (enemy != null){
    const enemyName = enemy.name;
    var enemyHp = enemy.hp;
    const enemyAtk = enemy.attack;
    var runResult = '';

    if (this.roll()%2 == 0){
      runResult = `You run away from the ${enemyName}. It tries to hit you but misses.`;
    } else {
      var runDamage = Math.ceil(this.roll());
      runResult = `You ran away from the ${enemyName}. It manages to hit you for [${runDamage}] as you bravely run away.`;
      this.player.updateHp((this.player.getHpHtml() - runDamage));
    }
  };
  setTimeout(()=>{
    this.killMonster()
  },2050);
  return runResult;
};


Fight.prototype.bindEvents = function(){
  PubSub.subscribe(`Monster:monster-ready`,(evt)=>{
  let monsterInfo = evt.detail;
  const attackButton = document.getElementById('nav-attack-btn').addEventListener('click',()=>{
    var yourAttack = this.playerAttack(monsterInfo);
    console.log(monsterInfo,"############");
    theirAttack = this.checkMonsterDead(monsterInfo);
    if (this.getMonsteHp() <= 0){
      monsterInfo = null;
    }
    this.printStuff(yourAttack,theirAttack);

    if (this.player.getHpHtml() <= 0) {
      this.player.updateHp(0)
      this.gameOver.playerDied();
      setTimeout(()=>{
        this.disableUI();
        this.clearMonster();
        this.removeMonsterBar();
      },2050);

      var diceReset = ['...','...'];
      setTimeout(function(){
        PubSub.publish('Dice:input',diceReset);
      },2000);
    }
  });

  // set up run function
    const runButton = document.getElementById('nav-run-btn').addEventListener('click',()=>{
    var runAway = this.run(monsterInfo);
    this.checkPlayerDead()
    this.printStuff(runAway);
    monsterInfo = null;
    var diceReset = ['...','...'];
    setTimeout(function(){
      PubSub.publish('Dice:input',diceReset);
    },2000)
    });
  });
};

Fight.prototype.disableUI = function(){
  this.interface.enableAllNavButtons();
  this.interface.disableAllFightButtons();
}

Fight.prototype.printStuff = function(yourInput,theirInput){
  const target = document.querySelector('div#text-display');
  target.innerHTML = "";

  yourAttack = document.createElement('p');
  yourAttack.textContent = yourInput;
  target.appendChild(yourAttack);
  this.disableFight();

  if (theirInput != ''){
    setTimeout(()=>{
      theirAttack = document.createElement('p');
      theirAttack.textContent = theirInput;
      target.appendChild(theirAttack);
      if (this.getMonsteHp() > 0){
        this.restartFight();
      }
    },2000);
  } else if (theirInput == '' && this.getMonsteHp() > 0){
    this.killMonster();
    // this.restartFight();
  } else {
    this.killMonster();
    var diceReset = ['...','...'];
    setTimeout(function(){
      PubSub.publish('Dice:input',diceReset);
    },2000)
  }
};


Fight.prototype.restartFight = function(){
  // Enable the fight buttons again
  console.log('Fight Restarted');
  const attackButton = document.getElementById('nav-attack-btn');
  const defendButton = document.getElementById('nav-defend-btn');
  const runButton = document.getElementById('nav-run-btn');

  attackButton.disabled = false;
  attackButton.setAttribute('class','btn-block navigate btn btn-lg');
  runButton.disabled = false;
  runButton.setAttribute('class','btn-block navigate btn btn-lg');
};

Fight.prototype.disableFight = function(){
  console.log('Fight Stopped');
  const attackButton = document.getElementById('nav-attack-btn');
  const runButton = document.getElementById('nav-run-btn');

  attackButton.disabled = true;
  attackButton.setAttribute('class','btn-disabled btn-block navigate btn btn-lg');
  runButton.disabled = true;
  runButton.setAttribute('class','btn-disabled btn-block navigate btn btn-lg');
};

Fight.prototype.killMonster = function(){
  this.interface.enableAllNavButtons()
  this.interface.disableAllFightButtons()
  this.removeMonsterBar();
  this.clearMonster();
};

Fight.prototype.updateMonsterBar = function(){
  var healthBar = document.getElementById('enemy-hp-bar');
  var hp = this.getMonsteHp();
  if (hp < 0){
    hp = 0;
  }
  healthBar.textContent = `${hp} HP`;
  healthBar.setAttribute('style',`width:${hp}%`);
}

Fight.prototype.removeMonsterBar = function(){
  var monsterBarContainer = document.getElementById('enemybar');
  monsterBarContainer.setAttribute('class','');
  monsterBarContainer.innerHTML = "";
};

Fight.prototype.updateMonsterHp = function(amount){
  const monsterhtml = document.querySelector('#monsterHp')
  monsterhtml.value = amount
}

Fight.prototype.getMonsteHp = function(){
  const monsterhtml = document.querySelector('#monsterHp')
  return monsterhtml.value
}

Fight.prototype.clearMonster = function(){
  monsterImg = document.querySelector("#monsterPlacement")
  monsterImg.src = ""
};

Fight.prototype.checkPlayerDead = function(){
  if (this.player.getHpHtml() <= 0) {
    this.player.updateHp(0)
    const gameOver = new GameOver();
    gameOver.playerDied();
    this.disableUI();
  };
};

Fight.prototype.checkMonsterDead = function(monsterInfo){
  if (this.getMonsteHp() == 0){
    var theirAttack = `You hit the ${monsterInfo.name} so hard it instantly disappears with no death animation.`;
    monsterInfo = null;
    this.killMonster()

  } else {
    var theirAttack = this.monsterAttack(monsterInfo);
  };
  return theirAttack
};


module.exports = Fight
