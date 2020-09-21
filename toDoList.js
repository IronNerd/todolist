"use strict";
//window.localStorage.clear();

let tasksList = JSON.parse(window.localStorage.getItem("tasksList"));

// The DOM updater function writes to DOM the tasksList obj content
function updateDOM() { // Update DOM w/ tasksList array content
  let DataDuet = [];
  let task;
  let itemNo;
  for (let pointerToDataDuet = 0; pointerToDataDuet < tasksList.length; pointerToDataDuet++) {
    DataDuet = tasksList[pointerToDataDuet];
    task = DataDuet[1];
    console.log(`Now creating li node ${pointerToDataDuet} in HTML:`);
    // Creating elements for latter insertion into HTML
    var ul = document.getElementsByTagName('ul')[0];
    var li = document.createElement('li');
    var editBtn = document.createElement('button')
    var delBtn = document.createElement('button');
    var p = document.createElement('p');
    var hr = document.createElement('hr');
    // Add classes
    li.classList.add('items-list');
    editBtn.classList.add('edit-items');
    delBtn.classList.add('delete-item');
    // add invariant content
    delBtn.textContent = 'x';
    // add variant content
    itemNo = DataDuet[0]
    editBtn.textContent = itemNo;
    p.textContent = task;
    // Assemble components
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    li.appendChild(p);
    ul.appendChild(li);
    ul.appendChild(hr);
    console.log(`Just created li node ${pointerToDataDuet}. Its data is:`);
    console.log(`${itemNo}.  ${task}
  `);

  }
}
// The prnTasksObjToConsole function prints the tasksList array content to console
function prnTasksObjToConsole() {
  console.log(`Sending tasksList content to console.
  Please stand by...`);
  console.log(`tasksList records are:`);
  // Printing...
  let DataDuet;
  for (let pointerToDataDuet = 0; pointerToDataDuet < tasksList.length; pointerToDataDuet++) {
    DataDuet = tasksList[pointerToDataDuet];
    console.log(`${DataDuet[0]}.  ${DataDuet[1]}`);
  }
  console.log(`Done!!`);
}

// INITIAL PROCEDURE WHEN App STARTS:
if (tasksList == undefined) { // first run procedure

  console.log(`Doing first run procedure.
  Writing "first time list" to storage. 
  Please stand by...`);
  const firstRunTasks = [
    [1, `To add a new task, click the "+" green button.
    To remove a task, click an "X" red button.
    To edit a task, click its item number.`],
    [2, `Happy tasking!!`]
  ];
  window.localStorage.clear();
  window.localStorage.setItem("tasksList", JSON.stringify(firstRunTasks));
  console.log(`Done!!

Reading back "first time list" from storage. `);
  tasksList = JSON.parse(window.localStorage.getItem("tasksList"));
  console.log(`Done!!
  `);

} else { // Print tasksList array content to console
  prnTasksObjToConsole()
}
updateDOM()

// PROCEDURES TO CARRY OUT TO ADD A TASK:
// I. Grab elements into vars
//  A. For button elements
//  1. Grab add items button:
let addItemBtn = document.getElementById("addItem");
// console.log('The Add Item Button object is:');
// console.log(addItemBtn);
//  B. Add all event listeners
//  1. Add all event listeners for add items button:
addItemBtn.addEventListener("click", addService);
//  1. Define al event handlers functionality for add items button:
function addService() {
  console.log(`I am the addService subroutine. 
    There is an add request for the To Do List
    `);
  // Update tasksList array
  console.log(`Appending new data duet into tasksList array`);
  let newItemNo = 1 + tasksList.length;
  // let duetToAppend = [newItemNo, `New task ${newItemNo} added as requested.`];
  let duetToAppend = [newItemNo, ``];

  tasksList.push(duetToAppend);
  console.log(`Done!!
  `);
  console.log(`By reading tasksList array, the newly appended duet is:`);
  let lastDuetAppended = tasksList[tasksList.length - 1];
  console.log(`${lastDuetAppended[0]}.  ${lastDuetAppended[1]}
  `);
  // Save to storage augmented tasksList array
  console.log(`Saving augmented tasksList array to storage`);
  window.localStorage.clear();
  window.localStorage.setItem("tasksList", JSON.stringify(tasksList));
  console.log(`Done!!
  `);
  // Update display
  window.location.reload()
}

// PROCEDURES TO CARRY OUT TO EDIT A TASK:
//  2. Grab edit items buttons:
let editItemsBtns = document.querySelectorAll(".edit-items");
//console.log(`The Edit Item Buttons Array is:`);
//console.log(`${editItemsBtns}`);
//  2. Add all event listeners for edit items buttons:
let nowEditingItemNo;
let textToBeEdited;
Array.from(editItemsBtns).forEach(function (editBtn) {
  editBtn.addEventListener("click", function (e) {
    textToBeEdited = e.target.parentElement.lastElementChild.innerHTML;
    nowEditingItemNo = editBtn.innerHTML;
    console.log(`I am the event listener.
    You pressed a button corresponding to:
    item ${nowEditingItemNo}`);
    // Call edit item subroutine
    editService();
  });
});
//  B. Define al event handlers functionality:
//  2. Define al event handlers functionality for edit items buttons:
function editService() {
  console.log(`I am the editService subroutine. 
    There is an edit request for task No. ${nowEditingItemNo}
    Text to be edited is:
    ${textToBeEdited}`);
  console.log(`Saving task to be edited to storage`);
  window.localStorage.setItem("nowEditingItemNo", nowEditingItemNo);
  window.localStorage.setItem("textToBeEdited", textToBeEdited);
  console.log(`Done!!
  `);
  let url = 'editForm.html';
  window.location.href = url;
}

// PROCEDURES TO CARRY OUT TO DELETE A TASK:
//  3. Grab the delete items buttons:
let deleteItemBtns = document.querySelectorAll(".delete-item");
// console.log('The deleteItemBtns HTML Collection is:');
//console.log(deleteItemBtns);
//  3. Add all event listeners for delete items buttons:
let itemNoToRemove;
let liToRemove;

function deleteService() {
  console.log(`I am the deleteService subroutine. 
    There is a delete request for item No. ${itemNoToRemove}
    liToRemove is ${liToRemove}`);
  // Remove li from DOM
  console.log(`Removing li from DOM...`);
  liToRemove.parentNode.removeChild(liToRemove);
  console.log(`Done!!
  `);
  // Remove task from tasksList array
  console.log(`Deleting item ${itemNoToRemove} from tasksList array.`);
  tasksList.splice(itemNoToRemove - 1, 1);
  console.log(`Done!!
  `);
  // re-assign item numbers
  for (let pointerToDuet = 0; pointerToDuet < tasksList.length; pointerToDuet++) {
    tasksList[pointerToDuet][0] = pointerToDuet + 1;
  }
  // Save tasksList array to storage
  console.log(`Saving updated tasksList array to storage.`);
  window.localStorage.clear();
  window.localStorage.setItem("tasksList", JSON.stringify(tasksList));
  console.log(`Done!!
  `);
  // Read back just saved tasksList array from storage
  console.log(`Reading the back just saved tasksList array from storage.`);
  tasksList = JSON.parse(window.localStorage.getItem("tasksList"));
  console.log(`Done!!
  `);
  // Print tasksList array content to console
  console.log(`Printing updated tasksList array content to console.`);
  prnTasksObjToConsole()
  console.log(`Done!!
  `);
  // Update DOM with up to date tasksList array content
  console.log(`Updating DOM with up to date tasksList array just retrieved from storage.`);
  // updateDOM();
  window.location.reload();
  console.log(`Done!!
  `);
}

Array.from(deleteItemBtns).forEach(function (deleteBtn) {
  deleteBtn.addEventListener("click", function (e) {
    itemNoToRemove = e.target.parentElement.firstElementChild.innerHTML;
    console.log(`i am the event listener.
    You pressed a button corresponding to:
    button ${itemNoToRemove}`);
    // Call edit item subroutine
    liToRemove = e.target.parentElement;
    deleteService();
  });
});
//  3. Define al event handlers functionality for delete items buttons:




/*
// Reading back updated tasksList array from storage
console.log(`Reading back the just augmented tasksList array from storage. `);
tasksList = JSON.parse(window.localStorage.getItem("tasksList"));
console.log(`Done!!
    `);
// Update DOM and display
// Erase all old list ofv tasks from DOM

const ul = document.getElementsByTagName('ul')[0];
var mainWrapper = ul.parentNode;
var lastChild = ul.parentNode.lastElementChild;
// console.log(`mainWrapper: ${mainWrapper}
//  mainWrapper last child: ${lastChild}`);
console.log(`Removing existing ul from DOM (the wrapper's ul child).
This completely deletes from DOM the un-updated task list`);
ul.parentNode.removeChild(ul);
console.log(`Done!!
`);
// Create empty list in DOM
console.log(`Appending a ul to the wrapper
(to create an empty list in DOM)`);
mainWrapper.appendChild(ul);
console.log(`Done!!
Empty list ready to be populated.
`);
// Populate new empty list with TaskList object content
console.log(`Populating new empty list with taskList object content`);
updateDOM()
*/