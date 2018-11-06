const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');

const Monster = function () {
  this.data = null;
}

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
  };

module.exports = Monster;
