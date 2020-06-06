var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var indicator = document.querySelector("#hand")

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var timer;
var isPaused = false;
var isWorking = true;
var initalSeconds;

if (localStorage.getItem("workingSec")) {
  workMinutesInput.value = parseInt(localStorage.getItem("workingSec")) / 60;
  minutesDisplay.innerHTML = workMinutesInput.value
}
if (localStorage.getItem("restingSec")) {
  restMinutesInput.value = parseInt(localStorage.getItem("restingSec")) / 60;
}

function startTimer() {

  clearInterval(timer);

  // Write code to start the timer here
  if (!isPaused) {
    if (isWorking) {
      totalSeconds = workMinutesInput.value * 60;
    } else {
      totalSeconds = restMinutesInput.value * 60;
    }
    initalSeconds = totalSeconds
  } 

  if (totalSeconds < 0 || !(Number.isInteger(totalSeconds))) {
    totalSeconds = 0;
    return;
  }

  localStorage.setItem("workingSec", totalSeconds);
  localStorage.setItem("restingSec", totalSeconds);

  isPaused = false;
  timer = setInterval(function () {
    if (totalSeconds == 0) {
      stopTimer();
      if (isWorking) {
        alert("Time for a break!");
      } else {
        alert("Time to get back to work!");
      }
      return;
    }
    totalSeconds = totalSeconds - 1;
    updateTimer();
    //console.log(totalSeconds)
  }, 1000);
}

function updateTimer() {
  var minutes = totalSeconds / 60;
  minutes = parseInt(minutes);
  minutesDisplay.innerHTML = minutes;
  secondsDisplay.innerHTML = totalSeconds - 60 * minutes;
  updateIndicator()
}

function updateIndicator() {
  var percentage = 1 - totalSeconds/initalSeconds
  var angle = 360*percentage 
  indicator.style.transform = "rotate("+ angle +"deg)"
}

function pauseTimer() {
  isPaused = true;
  clearInterval(timer);
  console.log("pause click");
}
function stopTimer() {
  totalSeconds = 0;
  clearInterval(timer);
  reset();
  console.log("stop");
}
function reset() {
  indicator.style.transform = "rotate("+ 0 +"deg)"
  minutesDisplay.innerHTML = 0;
  secondsDisplay.innerHTML = 0;
}

playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);

statusToggle.addEventListener("change", function () {
  if (this.checked) {
    isWorking = true;
    statusSpan.textContent = "Working";
    reset();
    startTimer();
  } else {
    // Checkbox is not checked..
    isWorking = false;
    statusSpan.textContent = "Resting";
    reset();
    startTimer();
    //alert("Time for a break!");
  }
});
