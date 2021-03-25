import {populateList, deleteAction} from './js/render-list.js';
import {createAction} from './js/create-action.js';
import {updateCircle, initCircle} from './js/init-circle.js';
import {displayTime} from './js/update-timer.js';

export const listOfActions = JSON.parse(localStorage.getItem('items')) || [];

const startButton = document.querySelector("#pomodoro-start");
const stopButton = document.querySelector("#pomodoro-stop");
const resetButton = document.querySelector("#pomodoro-reset");
const breakButton = document.querySelector("#pomodoro-break");

let setTimer = null;
let isRunning = false;
let isBreak = false;
let timerDuration = 1500;
let userChoiceDuration = 1500;
let timeLeft = 1500;
let startCounter = 0;


function toggleClock() {

  if(isRunning) {

    startCounter++;
    breakButton.classList.remove("hidden");

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
          clearInterval(setTimer);
          document.querySelector(".end-sound").play();
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
  isBreak = false;
  timerDuration = userChoiceDuration
  timeLeft = timerDuration;
  startCounter = 0;

  document.querySelectorAll(['[id^="pomodoro"]']).forEach((node) => {
    node.classList.remove("active");
  });

  initCircle();
  displayTime(timeLeft);

}

function shortBreak() {

  timerDuration = 300;
  timeLeft = timerDuration;
  isRunning = false;
  startCounter = 0;

  isBreak = true;

  clearInterval(setTimer);

  document.querySelectorAll(['[id^="pomodoro"]']).forEach((node) => {
    node.classList.remove("active");
  });

  createAction();
  initCircle();
  displayTime(timeLeft)

}

function playerSetup() {

  if (isBreak != true) {

    if(event.target.id === "minus") {
      timerDuration -= 60;
      displayTime(timerDuration)
    }

    if(event.target.id === "plus") {
      timerDuration += 60;
      displayTime(timerDuration)
    }

    timeLeft = timerDuration;
    userChoiceDuration = timerDuration;

  }

  const userSessionLength = document.querySelector(".user-setup-duration");
  userSessionLength.innerText = `${Math.floor((userChoiceDuration / 60) % 60)} min`;

}

document.querySelectorAll(".user-setup-variation").forEach((btn) => {
  btn.addEventListener('click', playerSetup)
});

breakButton.addEventListener('click', shortBreak );
startButton.addEventListener('click', () => { toggleClock(isRunning = true) });
stopButton.addEventListener('click', () => { toggleClock(isRunning = false) });
resetButton.addEventListener('click', resetTimer);
initCircle();
populateList();

export {timeLeft, timerDuration}
