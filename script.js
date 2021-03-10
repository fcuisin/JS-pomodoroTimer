const startButton = document.querySelector("#pomodoro-start");
const stopButton = document.querySelector("#pomodoro-stop");
const resetButton = document.querySelector("#pomodoro-reset");
const timer = document.querySelector(".time-display");

let isRunning = false
let timeLeft = 1500;
let shortBreak = 500;
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

    console.log(startCounter);

    if(startCounter === 1) {

      startButton.classList.add("active");
      stopButton.classList.remove("active");

      setTimer = setInterval(() => {
        if(timeLeft > 0) {
          timeLeft--;
          displayTime(timeLeft);
        } else {
          startButton.classList.remove("active");
        }
      }, 1000)

    }

  } else {

    clearInterval(setTimer);
    console.log(startCounter);
    startCounter = 0;
    console.log(startCounter);
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

  displayTime(timeLeft);
}


startButton.addEventListener('click', () => { toggleClock(isRunning = true) });
stopButton.addEventListener('click', () => { toggleClock(isRunning = false) });
resetButton.addEventListener('click', resetTimer)


