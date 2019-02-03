const PubSub = require('./helpers/pub_sub.js');
const Monster = require('./models/monster_model.js');
const Interface = require('./models/interface.js');
const PlayerView = require('./views/player_view.js');
const TextView = require('./views/text_view.js');
const StartView = require('./views/start_view.js');
const EndView = require('./views/end_view.js');
const RoomGenerator = require('./models/room_model.js');
const UnfortunateCircumstance = require('./models/traps.js');
const Fight = require("./models/fight_model.js");

document.addEventListener('DOMContentLoaded', ()=>{
  console.log("Hey! Hey you! Have a nice day! x DOMContentLoaded");
  // const choice = 1
  // PubSub.publish('Monster:monster-choice',choice);

  const startContainer = document.querySelector("div#options");
  const startView = new StartView(startContainer);
  startView.bindEvents();

  const playerstats = document.querySelector("div#stats");
  const playerView = new PlayerView(playerstats);
  playerView.bindEvents()

  const endContainer = document.querySelector("div#text-display");
  const endView = new EndView(endContainer);
  endView.bindEvents();

  const interfaceContainer = document.querySelector("div#options");
  const interfaceButtons = new Interface(interfaceContainer);
  interfaceButtons.bindEvents();

  const textBoxContainer = document.querySelector('div#text-display');
  const textBox = new TextView(textBoxContainer);
  textBox.bindEvents();

  const fightModel = new Fight();
  fightModel.bindEvents();







});
