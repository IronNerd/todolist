"use strict";
//window.localStorage.clear();

// Buffer original values that could be potentialy edited
let originalItemNoOfTask = window.localStorage.getItem("nowEditingItemNo");
let originalDescrOfTask = window.localStorage.getItem("textToBeEdited");

// Read (buffer) the tasks List object
let tasksList = JSON.parse(window.localStorage.getItem("tasksList"));

// Load original task item number, original task description text, and tasksList amount of tasks to display for user to view them
document.getElementById("nowEditing").value = originalItemNoOfTask;
document.getElementById("nowEditing").max = tasksList.length;
document.getElementsByTagName("textarea")[0].innerHTML = originalDescrOfTask;
console.log(`originalItemNoOfTask: ${originalItemNoOfTask}
`);

// let textInBuffer = document.getElementsByTagName("textarea")[0].innerHTML;
console.log(`Text before editing: 
${originalDescrOfTask}
`);

// const cancelBtn = document.getElementById('cancel');
// cancelBtn.addEventListener('click', function () {
// Go back to the To Do List
// });

const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", saveText);

let alteredTask = [];
let finalItemNoForTask;

function raisePriority() { //item number will change to a lower number (change to to a higher priority)
  // delete task we are about to duplicate
  tasksList.splice(originalItemNoOfTask - 1, 1);
  // determine insertion point
  for (let PointerToTaskOfInterest = 0; PointerToTaskOfInterest < tasksList.length; PointerToTaskOfInterest++) {
    let taskOfInterestItemNo = tasksList[PointerToTaskOfInterest][0];

    if (taskOfInterestItemNo == finalItemNoForTask) {
      // Insert according to new priority (order)

      tasksList.splice(finalItemNoForTask - 1, 0, alteredTask);
      // re-assign item numbers
      for (let pointerToDuet = 0; pointerToDuet < tasksList.length; pointerToDuet++) {
        tasksList[pointerToDuet][0] = pointerToDuet + 1;
      }
    }
  }
}

function storage() { // Save object to storage
  window.localStorage.clear();
  window.localStorage.setItem("tasksList", JSON.stringify(tasksList));
  window.location.href = "index.html";
}

function saveText() {
  // grab current item number
  finalItemNoForTask = document.querySelector("input").value;

  // compare original item no to current one
  if (originalItemNoOfTask == finalItemNoForTask) {
    //originalItemNoOfTask == finalItemNoForTask; They are the same no change in list item's priority

    // Retrieve final edited text
    let editedDescrOfTask = document.querySelector("textarea").value;
    console.log(`Text after editing: 
    ${editedDescrOfTask}`);

    // Modify tasksList object
    tasksList[originalItemNoOfTask - 1][1] = editedDescrOfTask;

    // Save object to storage
    storage();

  } else if (finalItemNoForTask < originalItemNoOfTask) { // finalItemNoForTask < originalItemNoOfTask -> 
    // Create the modified task by assembling its edited components
    alteredTask[0] = finalItemNoForTask;
    alteredTask[1] = document.querySelector("textarea").value;
    raisePriority();
    storage();

  } else { // finalItemNoForTask > originalItemNoOfTask -> item number will change to a higher number (change to to a lower priority)

    // Tasks List before changes
    console.log(`Tasks List before changes:
    `);
    console.log(`${tasksList[0][0]}. ${tasksList[0][1]}
  ${tasksList[1][0]}. ${tasksList[1][1]}
  ${tasksList[2][0]}. ${tasksList[2][1]}
  ${tasksList[3][0]}. ${tasksList[3][1]}
  ${tasksList[4][0]}. ${tasksList[4][1]}
  `);
    // delete task we will duplicated
    //  console.log(`Item No to delete: ${originalItemNoOfTask}`);
    //  tasksList.splice((originalItemNoOfTask - 1), 1);

    // Create the modified task by assembling its edited components
    alteredTask[0] = finalItemNoForTask; // Final item number
    alteredTask[1] = document.querySelector("textarea").value; // Edited task description

    console.log(`Task to Insert:
    ${alteredTask[0]}. ${alteredTask[1]}
    `);

    // Insert modified task at the end of the task list
    tasksList.push(alteredTask);

    // Tasks List after inserting at end of list
    console.log(`Tasks List after inserting at end of list:`);
    console.log(`${tasksList[0][0]}. ${tasksList[0][1]}
${tasksList[1][0]}. ${tasksList[1][1]}
${tasksList[2][0]}. ${tasksList[2][1]}
${tasksList[3][0]}. ${tasksList[3][1]}
${tasksList[4][0]}. ${tasksList[4][1]}
${tasksList[5][0]}. ${tasksList[5][1]}
`);

    // Insert according to new priority (order)
    tasksList.splice(finalItemNoForTask, 0, alteredTask);

    // * delete last entry
    tasksList.pop();

    // delete original unedited task
    tasksList.splice(originalItemNoOfTask - 1, 1);

    // re-assign item numbers
    for (let pointerToDuet = 0; pointerToDuet < tasksList.length; pointerToDuet++) {
      tasksList[pointerToDuet][0] = pointerToDuet + 1;
    }

    // Tasks after insertion and item no reassignment
    console.log(`Tasks after insertion and item no reassignment:
    `);
    console.log(`${tasksList[0][0]}. ${tasksList[0][1]}
  ${tasksList[1][0]}. ${tasksList[1][1]}
  ${tasksList[2][0]}. ${tasksList[2][1]}
  ${tasksList[3][0]}. ${tasksList[3][1]}
  ${tasksList[4][0]}. ${tasksList[4][1]}
  `);
    storage();
  }
}
