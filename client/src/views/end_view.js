const PubSub = require('../helpers/pub_sub.js');

const EndView = function (container) {
  this.container = container;
};


EndView.prototype.bindEvents = function () {

  PubSub.subscribe('PointsTracker:end-point-reached', (event)=> {
    
  });

};





module.exports = EndView;
