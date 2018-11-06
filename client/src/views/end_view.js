const PubSub = require('../helpers/pub_sub.js');
const TextView = require('./text_view.js');

const EndView = function (container) {
  this.container = container;
};


EndView.prototype.bindEvents = function () {

  PubSub.subscribe('PointsTracker:end-point-reached', (event)=> {
    this.container.innerHTML = "";

    const end = document.createElement("h2");
    end.textContent = "Congratulations! You made it through and have finally reached the end of your journey!";
    this.container.appendChild(end);

    this.disableButtons();
  });

};


EndView.prototype.disableButtons = function () {

  const textView = new TextView(this.container);
  textView.disableNavigation();

  const healButton = document.getElementById('nav-heal-btn');
  const attackButton = document.getElementById('nav-attack-btn');
  const defendButton = document.getElementById('nav-defend-btn');
  const runButton = document.getElementById('nav-run-btn');

  healButton.disabled = true;
  attackButton.disabled = true;
  defendButton.disabled = true;
  runButton.disabled = true;

  healButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  attackButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  defendButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
  runButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');
};


module.exports = EndView;
