function DiceClass() {
  // Data store
  this.data = {
    // Reference to setInterval so we can clear it
    rolling: false,
    // A way to speed up the rolling
    timeMultiplier: 0
  };
}

DiceClass.prototype.set = function set(name, value) {
  this.data[name] = value;
};

DiceClass.prototype.get = function set(name) {
  var value = this.data[name];

  return value;
};

DiceClass.prototype.stopRoll = function stopRoll() {
  var rolling = this.get('rolling');
  clearInterval(rolling);
  this.set('timeMultiplier', 0);
  this.set('rolling', false);
};

DiceClass.prototype.time = function time(increment) {
  this.set('timeMultiplier', this.get('timeMultiplier') + increment);

  var value = this.get('timeMultiplier');

  return value;
};

DiceClass.prototype.startRoll = function startRoll() {
  var timeMultiplier = this.time(1);
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
  }, 100/timeMultiplier));
};
