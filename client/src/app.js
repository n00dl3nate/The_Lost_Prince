const PubSub = require('./helpers/pub_sub.js');
const Monster = require('./models/monster_model.js');

const RoomGenerator = require('./models/room_model.js');
const InterfaceStuff = require('./models/interface.js');
const PlayerView = require('./views/player_view.js');
const TextView = require('./views/text_view.js');
const FightGood = require('./models/combat_model.js');
// const UnfortunateCircumstance = require('./models/traps.js');


document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);

  const monster = new Monster();
  monster.bindEvents()


  const interfaceButtons = new InterfaceStuff();
  interfaceButtons.bindEvents();

  const playerstats = document.querySelector("div#stats");
  const playerView = new PlayerView(playerstats);
  playerView.showstats();
  playerView.roomContent();

  // const unfortunateCircumstance = new UnfortunateCircumstance();
  // unfortunateCircumstance.bindEvents();
  const fightTime = new FightGood();
  fightTime.bindEvents();

});
