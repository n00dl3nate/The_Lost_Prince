const PubSub = require('./helpers/pub_sub.js');
const Monster = require('./models/monster_model.js');
const InterfaceStuff = require('./models/interface.js');
const PlayerView = require('./views/player_view.js');
const TextView = require('./views/text_view.js');
const StartView = require('./views/start_view.js');
const EndView = require('./views/end_view.js');

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("Hey! Hey you! Have a nice day! x DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);

  const startContainer = document.querySelector("div#options");
  const startView = new StartView(startContainer);
  startView.bindEvents();

  const monster = new Monster();
  monster.bindEvents()

  const interfaceContainer = document.querySelector("div#options");
  const interfaceButtons = new InterfaceStuff(interfaceContainer);
  interfaceButtons.bindEvents();

  const playerstats = document.querySelector("div#stats");
  const playerView = new PlayerView(playerstats);
  playerView.showstats();
  playerView.roomContent();
  playerView.heal();

  const endContainer = document.querySelector("div#text-display");
  const endView = new EndView(endContainer);
  endView.bindEvents();

});
