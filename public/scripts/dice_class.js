function DiceClass(scope) {
  this.scope = scope;
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
  var memberList = this.scope.find('.member-cell');
  var winner = this.scope.find('#winner');
  var winnerImg = winner.find('img');
  var winnerHead = winner.find('h1');
  this.stopRoll();
  this.set('rolling', setInterval($.proxy(function rollingInterval() { 
    if (false === this.get('rolling')) {
      return;
    }
    var randomIndex = Math.floor((Math.random()*memberList.length) + 1);
    var $memberImg = $(memberList[randomIndex]).find('img');
    winnerImg.attr({
      src: $memberImg.prop('src'),
      title: $memberImg.prop('title')
    });
    winnerHead.text('Winner is ' + $memberImg.prop('title'));
  }, this), 100/speed));
};
