const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const monsterImage = require('../helpers/monster_image.js')

const Monster = function () {
  this.data = null;
  this.monster = null;
}

var y = 0;
let newMonster = "";

Monster.prototype.bindEvents = function() {

  // PubSub.subscribe('PointsTracker:monster-level',(event) =>{
  //   const choices = event.detail;
  //
  //   //const choice = Math.floor(Math.random()*4)+1;
  //   // const monsterIndex = [
  //   //   35, 264, 180, 150, 177, 143, 133, 199, 79, 298, 118, 148
  //   // ];
  //   const choice = choices[Math.floor(Math.random()*choices.length)];
  //
  //   this.getMonster(choice);
  //  })
}

Monster.prototype.getMonster = function (choice) {
  const url = `http://www.dnd5eapi.co/api/monsters/${choice}`
  const request = new RequestHelper(url);
  request
    .get()
    .then((data) => {
      // console.log('THIS IS HERE ',data)
      this.data = data
      this.monster = this.createMonster(this.data);
      this.createMonsterBar();
    })
};

Monster.prototype.createMonster = function (data) {

  var monsterURL = ""

  monsterImage.forEach((monster) =>{
    if (monster.name == data.name){
      monsterURL = monster.url
    };
  });

  const monster =
  {
    name: data.name,
    attack: data.strength,
    hp: data.hit_points,
    type: data.type,
    size: data.size,
    rating: data.challenge_rating,
    url: monsterURL
  };
  return monster;
}

Monster.prototype.createHealthBar = function (monster){
  const div1 = document.createElement('div')
  div1.className = "progress progress-player"
  div1.setAttribute('style', "height:20px;")

  const div2 = document.createElement('div')
  div2.className = "progress-bar bg-success progress-bar-striped progress-bar-animated";
  div2.id = "player-hp-bar"
  div2.setAttribute('role', "progressbar")
  div2.setAttribute('style', "width: 100%;" )
  div2.setAttribute('aria-valuenow', "100" )
  div2.setAttribute('aria-valuemin', "0" )
  div2.setAttribute('aria-valuemax', "100" )
  div2.textContent = "100 HP"

  div1.appendChild(div2)

  const monsterHealthBar = document.querySelector("div#enemy-image")
  monsterHealthBar.appendChild(div1);
  }

module.exports = Monster;
