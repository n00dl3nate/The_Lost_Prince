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
    console.log(data);
    this.data = data.data.results;
    console.log(data.data.results);
    PubSub.publish('Movie:character-ready', this.data );
  }).catch((error) => {
    PubSub.publish('Movie:error', error);
  });
};

module.exports = Monster;
