const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');

const Monster = function () {
  this.data = null;
}

Monster.prototype.bindEvents = function() {
  console.log("in bind events");
  // PubSub.subscribe('Monster:monster-choice',event =>{
  //   const choice = event.detail;
    const choice = 1
    console.log(choice);
    this.getMonster(choice);
  // })
}

Monster.prototype.getMonster = function (choice) {
  const url = `http://www.dnd5eapi.co/api/monsters/${choice}`
  const request = new RequestHelper(url);
  request.get().then((data) => {
<<<<<<< HEAD
    console.log(data);
    this.data = data.data.results;
    console.log(data.data.results);
=======
    this.data = data
    this.createMonster(this.data)
>>>>>>> 79759829e40301d5470ade916eb174f68ddadf82
  });
};

Monster.prototype.createMonster = function (data) {
  console.log(data);
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
