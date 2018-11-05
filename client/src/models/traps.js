const PubSub = require('../helpers/pub_sub.js');

const UnfortunateCircumstance = function(){
};

UnfortunateCircumstance.prototype.bindEvents = function(){
  const trapType = [
    'A large boulder drops from the ceiling. It misses you, but you get hit by stone shrapnel.',
    'As you step forwards, the ground shifts and you hear faint clicking noises. Spiders start shooting from the shadows at your face. They seem angry.',
    'A Poison Dart flies at you and stabs into your arm. You feel a faint wave of nausea as your body adapts to the poisons. Luckily your Mums cooking has made you resistant to poisoning.',
    'With a *SPROING* noise, a large boxing glove on a spring hits you in the groin. You are more humiliated than injured.',
    'You walk forwards, but the floor seems to be sticky. You stumble and fall, smacking your head on the ground. For some reason the floor is coated in Jam.',
    'There are hundreds of Spears poking out of the floor, and a skeleton impaled on them. This trap has already been triggered. You get through it safely. However you misjudge the door and bang your head on the ceiling.',
  ];

  PubSub.subscribe('GameEvent:trap-triggered',(evt)=>{
    // A trap has been triggered
    // What type of trap?
    const trapDescription = trapType[Math.floor(Math.random())*trapType.length];
    // How much damage?
    const trapDamage = Math.floor(Math.random()*20);
    const trapReturn = {
      trap: trapDescription,
      damage: trapDamage
    }

    var counter = 0
    PubSub.publish(`GameEvent:trap-ready`,trapReturn);
    console.log(counter,"@@@@@@@@");
    counter += 1
  });
};

module.exports = UnfortunateCircumstance;
