const PubSub = require('./helpers/pub_sub.js');
const Monster = require('./models/monster_model.js');
const PointsTracker = require('./models/points_model.js');
const RoomGenerator = require('./models/room_model.js');
const InterfaceStuff = require('./models/interface.js');
const PlayerView = require('./views/player_view.js');
const TextView = require('./views/text_view.js');
const UnfortunateCircumstance = require('./models/traps.js');

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);
  const monster = new Monster();
  monster.bindEvents()

  const points = new PointsTracker();
  points.bindEvents();

  const interfaceButtons = new InterfaceStuff();
  interfaceButtons.bindEvents();

  const textBoxContainer = document.querySelector('div#text-display');
  const textBox = new TextView(textBoxContainer);
  textBox.bindEvents();

  const roomCreate = new RoomGenerator();
  roomCreate.bindEvents();

  const playerstats = document.querySelector("div#stats")
  const playerView = new PlayerView(playerstats);
  playerView.showstats();

  const unfortunateCircumstance = new UnfortunateCircumstance();
  unfortunateCircumstance.bindEvents();
  // Text to force an update});
});
