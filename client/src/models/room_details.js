const RoomDetails = function () {

};

RoomDetails.prototype.bindEvents = function () {
  const roomDetails = [
    "An open clearing surrounded by tall trees.",
    "An opening to a dark cave.",
    "A dense wooded area with vine-covered rocks.",

    "A rocky shore by the large lake.",
    "A creaking row boat.",
    "A long wooden pier with missing planks.",

    "An empty stone room with flickering candles.",
    "A dark library with towering shelves filled with books.",
    "An eerie dining room with a crackling fireplace."
  ]

  const description = roomDetails[Math.floor(Math.random()*roomDetails.length)];
  return description;
};


module.exports = RoomDetails;
