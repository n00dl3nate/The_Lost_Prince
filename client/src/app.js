const Monster = require('./models/monster.js');
const PubSub = require('./helpers/pub_sub.js');

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);
  const monster = new Monster;
  monster.bindEvents()
});
