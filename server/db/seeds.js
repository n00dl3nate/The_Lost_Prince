use pro_z;
db.dropDatabase();

db.game.insertMany([
{
  type: "forest",
  monster: 1,
  loot: "health"
},

{
  type: "lake",
  monster: 2,
  loot: "health"
},

{
  type: "manor",
  monster: 3,
  loot: "upgrade"
}
]);
