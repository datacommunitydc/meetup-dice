function DiceClass() {
  // Data store
  this.data = {
    // Reference to setInterval so we can clear it
    rolling: false,
    // A way to speed up the rolling
    speed: 1
  };
}

DiceClass.prototype.set = function set(name, value) {
  this.data[name] = value;
};

DiceClass.prototype.get = function get(name) {
  var value = this.data[name];

  return value;
};

DiceClass.prototype.stopRoll = function stopRoll() {
  var rolling = this.get('rolling');
  clearInterval(rolling);
  this.set('rolling', false);
};

DiceClass.prototype.accelerate = function accelerate(increment) {
  this.set('speed', this.get('speed') + increment);

  var value = this.get('speed');

  return value;
};

DiceClass.prototype.startRoll = function startRoll() {
  var speed = this.get('speed');
  var rolling = this.get('rolling');
  if(rolling) {
    clearInterval(rolling);
  }
  var memberList = $('.member-cell');
  this.set('rolling', setInterval(function rollingInterval() { 
    var randomIndex = Math.floor((Math.random()*memberList.length) + 1);
    var $memberImg = $(memberList[randomIndex]).find('img');
    $('#winner').find('img').prop("src", $memberImg.prop('src'));
    $('#winner').find('img').prop("title", $memberImg.prop('title'));
    $('#winner').find('h1').text('Winner is ' + $memberImg.prop('title'));
  }, 100/speed));
};
