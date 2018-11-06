const PubSub = require('../helpers/pub_sub.js');

const UnfortunateCircumstance = function(){
};

UnfortunateCircumstance.prototype.bindEvents = function(){
  const trapType = [
    {
      description:'A large boulder drops from the ceiling. It misses you, but you get hit by stone shrapnel.',
      damageModifier:2
    },
    {
      description:'As you step forwards, the ground shifts and you hear faint clicking noises. Spiders start shooting from the shadows at your face. They seem angry.',
      damageModifier:1
    },
    {
      description:'A Poison Dart flies at you and stabs into your arm. You feel a faint wave of nausea as your body adapts to the poisons. Luckily your Mums cooking has made you resistant to poisoning.',
      damageModifier:2
    },
    {
      description:'With a *SPROING* noise, a large boxing glove on a spring hits you in the groin. You are more humiliated than injured.',
      damageModifier:3
    },
    {
      description:'You walk forwards, but the floor seems to be sticky. You stumble and fall, smacking your head on the ground. For some reason the floor is coated in Jam.',
      damageModifier:2
    },
    {
      description:'There are hundreds of Spears poking out of the floor, and a skeleton impaled on them. This trap has already been triggered. You get through it safely. However you misjudge the door and bang your head on the ceiling.',
      damageModifier:1
    },
    {
      description:'A large Red Dragon approaches you. It roars and charges, triggering a Whirling Blade Trap. The dragon explodes into thousands of scaly chunks. You get hit in the face by a projectile kidney.',
      damageModifier:6
    },
    {
      description:'The room is full of snakes. Totally full, right up to the brim. They are pretty chill and have no problem with you squeezing through, but you do step on a hidden scorpion.',
      damageModifier:3
    },
    {
      description:'In a side alcove, you discover a pack of Pop Tarts. You quickly eat them before reading the expiration date.',
      damageModifier:2
    },
    {
      description:'An apple falls from above and briefly stuns you. Damn you, Newton.',
      damageModifier:1
    },
    {
      description:'You can feel the presence of several ghosts in this room. You know ghosts are incorporeal and cannot harm you, The ghosts are unaware of this and harm you.',
      damageModifier:4
    },
    {
      description:'BEES!',
      damageModifier: 3
    }
  ];

    // A trap has been triggered
    // What type of trap?
    const trapNo = Math.floor(Math.random()*trapType.length);
    const trapDescription = trapType[trapNo]['description'];
    console.log('Trap: ',trapType[trapNo])
    const damageModifier = trapType[trapNo]['damageModifier']
    // How much damage?
    const trapDamage = (Math.floor(Math.random()*8)+1)*damageModifier;
    const trapReturn = {
      trap: trapDescription,
      damage: trapDamage
    }

    return trapReturn


};

module.exports = UnfortunateCircumstance;
