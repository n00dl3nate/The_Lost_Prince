const PubSub = require('../helpers/pub_sub.js');
// const TextView = require('./text_view.js');

const EndView = function (container) {
  this.container = container;
};


EndView.prototype.bindEvents = function () {

  PubSub.subscribe('PointsTracker:end-point-reached', (event)=> {
    console.log("$$$$$$$$$$$$$$$$$");
    this.container.innerHTML = "";

    const end = document.createElement("h2");
    end.textContent = "Congratulations! You have found your Sweet Prince! He has offered to send you home!";
    this.container.appendChild(end);

    const background = document.getElementById("background-img");
    background.setAttribute("src", "./images/End.gif");

    this.disableButtons();
  });

};


EndView.prototype.disableButtons = function () {

  // const textView = new TextView(this.container);
  // textView.disableNavigation();

  const leftButton = document.getElementById('nav-left-btn');
  const rightButton = document.getElementById('nav-right-btn');
  const forwardButton = document.getElementById('nav-forward-btn');
  const healButton = document.getElementById('nav-heal-btn');
  const attackButton = document.getElementById('nav-attack-btn');
  const runButton = document.getElementById('nav-run-btn');

  leftButton.disabled = true;
  rightButton.disabled = true;
  forwardButton.disabled = true;
  healButton.disabled = true;
  attackButton.disabled = true;
  runButton.disabled = true;

  leftButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  rightButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  forwardButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  healButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  attackButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  runButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');

  const monster = document.querySelector("div#enemy-image")
  monster.innerHTML = ""
  const playerhealthbar = document.querySelector("div#player-health-bar")
  playerhealthbar.innerHTML = ""
  

};


module.exports = EndView;
