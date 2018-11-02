const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());


MongoClient.connect('mongodb://localhost:27017').then((client) => {
  const db = client.db('pro_z');
  const gameCollection = db.collection('game');
  const gameRouter = createRouter(gameCollection);
  app.use('/api/game',gameRouter);
})
.catch(console.error("error Connecting to DB"));

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
