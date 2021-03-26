import {listOfActions} from "../script.js";
import {populateList} from "./render-list.js";

const form = document.querySelector("#actions-form");

function createAction() {

  event.preventDefault();

  const input = document.getElementById("action").value;
  let action = {
    name: '',
    time: '',
  };
  const date = new Date();


  if (event.type === "submit") {

    if (input.length != '') {

      if (date.getMinutes() < 10) {
        action = {
          name: input,
          time: `${date.getHours()}:0${date.getMinutes()}`
        }
      } else {
        action = {
          name: input,
          time: `${date.getHours()}:${date.getMinutes()}`
        }
      }

      listOfActions.push(action);
      localStorage.setItem('items', JSON.stringify(listOfActions))
      this.reset();
    }

  } else {

    if (date.getMinutes() < 10) {
      action = {
        name: 'Break',
        time: `${date.getHours()}:0${date.getMinutes()}`
      }
    } else {
      action = {
        name: 'Break',
        time: `${date.getHours()}:${date.getMinutes()}`
      }
    }

    listOfActions.push(action);
    localStorage.setItem('items', JSON.stringify(listOfActions))

  }

  populateList()

}

form.addEventListener('submit', createAction);

export {createAction}
