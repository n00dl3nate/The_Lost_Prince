const PubSub = require('../helpers/pub_sub.js');

const RoomDetails = function () {

};

const forestRooms = [
  "An open clearing surrounded by tall trees.",
  "An opening to a dark cave.",
  "A dense wooded area with vine-covered rocks."
]

const lakeRooms = [
  "A rocky shore by the large lake.",
  "A creaking row boat.",
  "A long wooden pier with missing planks."
]

const mansionRooms = [
  "An empty stone room with flickering candles.",
  "A dark library with towering shelves filled with books.",
  "An eerie dining room with a crackling fireplace."
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
