const PubSub = require('../helpers/pub_sub.js');
const TextView = require('./text_view.js');

const EndView = function (container) {
  this.container = container;
};


EndView.prototype.bindEvents = function () {

  PubSub.subscribe('PointsTracker:end-point-reached', (event)=> {
    console.log("YO",this.container);
    this.container.innerHTML = "";

    const end = document.createElement("h1");
    end.textContent = "Congratulations, you've reached the end of your journey!";
    this.container.appendChild(end);

    const textView = new TextView(this.container);
    textView.disableNavigation();

    const healButton = document.getElementById('nav-heal-btn');
    healButton.disabled = true;
    healButton.setAttribute('class','btn-disabled navigate btn btn-lg btn-block');

  });

};

module.exports = EndView;
