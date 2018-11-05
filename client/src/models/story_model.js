const PubSub = require('../helpers/pub_sub.js');

const StoryProgression = function(){
  var storyCheckPoints = [
    {
      path: 'forest',
      startScore: 0,
      triggerStoryModifier: 300,
      completed: false
    },
    {
      path: 'lake',
      startScore: 0,
      triggerStoryModifier: 300,
      completed: false
    },
    {
      path: 'mansion',
      startScore: 0,
      triggerStoryModifier: 300,
      completed: false
    }
  ];
  // When a player starts a new path, update startScore.
  // triggerStoryModifier is the points increase from startScore for the end of that path.
};
