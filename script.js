const startButton = document.querySelector("#pomodoro-start");
const stopButton = document.querySelector("#pomodoro-stop");
const resetButton = document.querySelector("#pomodoro-reset");
const timer = document.querySelector(".time-display");
const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();

let isRunning = false
let timerDuration = 1500
let timeLeft = timerDuration;
let startCounter = 0;

function displayTime(time) {

  let seconds = time % 60

  if(seconds < 10) {
    seconds = `0${seconds}`
  }

  const minutes = Math.floor((time / 60) % 60);
  timer.innerText = `${minutes}:${seconds}`
}


function toggleClock() {

  if(isRunning) {

    startCounter++;

    if(startCounter === 1) {

      startButton.classList.add("active");
      stopButton.classList.remove("active");

      setTimer = setInterval(() => {
        if(timeLeft > 0) {
          timeLeft--;
          updateCircle()
          displayTime(timeLeft);
        } else {
          startButton.classList.remove("active");
        }
      }, 1000)

    }

  } else {

    clearInterval(setTimer);
    startCounter = 0;
    startButton.classList.remove("active");
    stopButton.classList.add("active");

  }

}

function resetTimer() {

  clearInterval(setTimer);
  isRunning = false;
  timeLeft = 1500
  startCounter = 0;

  document.querySelectorAll(['[id^="pomodoro"]']).forEach((node) => {
    node.classList.remove("active");
  });

  initCircle();
  displayTime(timeLeft);

}


function updateCircle() {

  outline.style.strokeDashoffset = (timeLeft * outlineLength) / timerDuration;

}

function initCircle() {

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

}

startButton.addEventListener('click', () => { toggleClock(isRunning = true) });
stopButton.addEventListener('click', () => { toggleClock(isRunning = false) });
resetButton.addEventListener('click', resetTimer);
initCircle();

