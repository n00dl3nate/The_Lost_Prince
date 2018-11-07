const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const monsterImage = require('../helpers/monster_image.js')

const Monster = function () {
  this.data = null;
}
var y = 0;

Monster.prototype.bindEvents = function() {

  PubSub.subscribe('PointsTracker:monster-level',(event) =>{
    const choices = event.detail;

    //const choice = Math.floor(Math.random()*4)+1;
    // const monsterIndex = [
    //   35, 264, 180, 150, 177, 143, 133, 199, 79, 298, 118, 148
    // ];
    const choice = choices[Math.floor(Math.random()*choices.length)];

    this.getMonster(choice);
   })
}

Monster.prototype.getMonster = function (choice) {
  const url = `http://www.dnd5eapi.co/api/monsters/${choice}`
  const request = new RequestHelper(url);
  request.get().then((data) => {
    this.data = data
    this.createMonster(this.data)
  });
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

  PubSub.publish(`Monster:monster-ready${y}`, monster);
  y +=1;
  };

module.exports = Monster;
