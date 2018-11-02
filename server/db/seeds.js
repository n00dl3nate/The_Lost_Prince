use pro_z;
db.dropDatabase();

db.roomDetails.insertMany([
  {
    area: "Forest",
    description: [
      "An open clearing surrounded by tall trees",
      "An opening to a dark cave",
      "A dense wooded area with vine-covered rocks"
    ]
  },
  {
    area: "Lake",
    description: [
      "A rocky shore by the large lake",
      "A creaking row boat",
      "A long wooden pier with missing planks"
    ]
  },
  {
    area: "Manor",
    description: [
      "An empty stone room with flickering candles",
      "A dark library with towering shelves filled with books",
      "An eerie dining room with a crackling fireplace"
    ]
  }
])


// db.game.insertMany([
// {
//   type: "forest",
//   monster: 1,
//   loot: "health"
// },
//
// {
//   type: "lake",
//   monster: 2,
//   loot: "health"
// },
//
// {
//   type: "manor",
//   monster: 3,
//   loot: "upgrade"
// }
// ]);
