var el = document.getElementById("d")
var debug = document.getElementById("debug")
var last = window.performance.now();
var step = 1/60
var dt = 0;
var now = null;

var text = "hi"
var times = 0

var last_time = 60
var delta = 10
function updateTimes() {
  	times += 1;
}
function throtle_update(time,callback) {
	var speed = time;
  var delta = time;
  return function(step) {
  	if (delta >= speed) {
    	delta = 0;
      callback()
    } else {
    	delta += step;
    }
  }
}
var updater = throtle_update(2,updateTimes)
function update(step) {
	updater(step)
}

function render(dt) {
	el.innerHTML = text + times;
}
function mainLoop(timesince) {

	 now   = window.performance.now();
  dt = dt + Math.min(1, (now - last) / 1000);    // duration in seconds
  while(dt > step) {
    dt = dt - step;
    update(step);
  }
  render(dt);
  last = now;

	requestAnimationFrame(mainLoop)
}
