const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');

const Monster = function () {
  this.data = null;
}

Monster.prototype.bindEvents = function() {

  PubSub.subscribe('Monster:monster-choice',(event) =>{
    // const choice = event.detail;
    // const choice = 1
    // const choice = Math.floor(Math.random()*365)+1;
    const monsterIndex = [
      35, 264, 180, 150, 177, 143, 144, 199, 79, 298, 118, 148
    ];
    const choice = monsterIndex[Math.floor(Math.random()*monsterIndex.length)];

    console.log(choice);
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
  const monster =
  {

    name: data.name,
    attack: data.strength,
    hp: data.hit_points,
    type: data.type,
    size: data.size,
    rating: data.challenge_rating

  };

  PubSub.publish('Monster:monster-ready', monster);
  console.log(monster);
  };

module.exports = Monster;
