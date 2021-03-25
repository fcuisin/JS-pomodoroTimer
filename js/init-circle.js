import {timerDuration, timeLeft} from '/script.js';

const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();

function updateCircle() {

  outline.style.strokeDashoffset = (timeLeft * outlineLength) / timerDuration;

}

function initCircle() {

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

}

export {updateCircle, initCircle}
