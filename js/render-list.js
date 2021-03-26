import {listOfActions} from "/script.js";

const list = document.getElementById("actions-list");

function populateList() {

  list.innerHTML = listOfActions.map((action, index) => {
     return `
      <div data-key=${index} class="action-item">
        <li>${action.name} - ${action.time}</li>
        <button class="delete-action"><i class="far fa-trash-alt"></i></button>
      </div>
    `
  }).join('');

  const itemsToDelete = document.querySelectorAll(".delete-action");
  itemsToDelete.forEach( item => {

    item.addEventListener("click", function() {
      return deleteAction(this.parentNode.dataset.key)
    });

  });

}

function deleteAction(id) {

  listOfActions.splice(id, 1);
  localStorage.setItem('items', JSON.stringify(listOfActions));

  return populateList();

}

export {populateList, deleteAction}
