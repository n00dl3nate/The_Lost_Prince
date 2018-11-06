const PubSub = require('../helpers/pub_sub.js');

const RoomDetails = function () {

};

const forestRooms = [
  "You find a bright open clearing surrounded by tall trees.",
  "You come across a dark entrance to a large cave.",
  "You find yourself in a dense wooded area with hanging vines",
  "You hop over some moss-covered rocks.",
  "You come across a hollowed-out trunk of fallen tree."
]

const lakeRooms = [
  "You reach a sandy shore by the vast lake.",
  "You hop into a creaking row boat.",
  "You walk along an old wooden pier.",
  "You clamber across slippery rocks.",
  "You discover an entrance to a watery cave."
]

const mansionRooms = [
  "You discover an empty stone room filled with flickering candles.",
  "You find a library with towering shelves filled with books.",
  "You enter the dining room with its crackling fireplace.",
  "You open the door to an old-fashioned bedroom.",
  "You come across a secret passageway."
]


RoomDetails.prototype.bindEvents = function () {

  const backgroundImage = document.getElementById("background-img");

  if (backgroundImage.name == "forest") {
    var roomDetails = forestRooms;
  } else if (backgroundImage.name == "lake") {
    var roomDetails = lakeRooms;
  } else if (backgroundImage.name == "mansion") {
    var roomDetails = mansionRooms;
  }

  const description = roomDetails[Math.floor(Math.random()*roomDetails.length)];
  return description;
};


module.exports = RoomDetails;
