const startButton = document.querySelector("#pomodoro-start");
const stopButton = document.querySelector("#pomodoro-stop");
const timer = document.querySelector(".time-display");

let isRunning = false
let timeLeft = 1500;
let shortBreak = 500;


function toggleClock() {

  if(isRunning) {

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

  } else {

    clearInterval(setTimer);
    startButton.classList.remove("active");
    stopButton.classList.add("active");

  }

}


startButton.addEventListener('click', () => { toggleClock(isRunning = true) });
stopButton.addEventListener('click', () => { toggleClock(isRunning = false) });



