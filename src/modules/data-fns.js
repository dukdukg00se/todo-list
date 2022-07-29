/* This module's functions create/control/manipulate the data, e.g., deleting/adding items from projects array, saving to local storage, etc.. */

import { getDay, isThisWeek, isToday, parseISO } from 'date-fns';
import data from './data.js';

/* Helper functions used in exported fns */
const add = (obj, arr) => {
  arr.push(obj);
}

const remove = (objId, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === objId) {
      arr.splice(i, 1);
    }
  }
}

const setId = (prefix, arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].id = prefix + i;
  }
}

/* Constructors to create new projects/tasks */
function Project(name) {
  this.name = name;
  this.tasks = [];
}

function Task(name, details, due, important) {
  this.name = name;
  this.details = details;
  this.due = due;
  this.important = important;
  this.completed = false;
}


/* Exported fns */
const createProj = () => {
  const projName = document.querySelector("#project-name-input").value;
  return new Project(projName);
}

const createTask = () => {
  const taskName = document.querySelector('#task-name-input').value;
  const taskDetails = document.querySelector('#task-details-input').value;
  const taskDue = document.querySelector('#task-date-input').value;
  const taskImportant = document.querySelector('#task-important-input').checked;
  return new Task(taskName, taskDetails, taskDue, taskImportant);
}

// Set up a new item -
// Add item to container array, 
// set id of items in array, 
// save projects array to local storage, 
// return container for display
const initItem = (item) => {
  let container, idPrefix;

  if (item instanceof Project) {
    container = data.projects;
    idPrefix = 'project-'
  } else {
    let targetProj = document.querySelector('main').dataset.selected;
    data.projects.forEach(proj => {
      if (proj.id === targetProj) {
        container = proj.tasks;
        idPrefix = `${proj.id}-task-`;
      }
    })
  }

  add(item, container);
  setId(idPrefix, container);
  popLocalStorage(data.projects);
  return container;
}

// const initNewItem = (input) => {
//   let item, container, idPrefix;

//   if (input === 'submit-project') {
//     const projName = document.querySelector("#project-name-input").value;
//     item = new Project(projName);

//     container = data.projects;
//     idPrefix = 'project-'
//   } else if (input === 'submit-task') {
//     const taskName = document.querySelector('#task-name-input').value;
//     const taskDetails = document.querySelector('#task-details-input').value;
//     const taskDue = document.querySelector('#task-date-input').value;
//     const taskImportant = document.querySelector('#task-important-input').checked;
//     item = new Task(taskName, taskDetails, taskDue, taskImportant);

//     let selectedProject = document.querySelector('main').dataset.selected;
//     data.projects.forEach(proj => {
//       if (proj.id === selectedProject) {
//         container = proj.tasks;
//         idPrefix = `${proj.id}-task-`;
//       }
//     })
//   }

//   add(item, container);
//   setId(idPrefix, container);
//   popLocalStorage(data.projects);
//   return container;
// }

// Delete proj/task - 
// Remove item from container array,
// Save projects array to local storage
// return container for display
const deleteItem = (objId) => {
  let isTask = /task/.test(objId);
  let container;

  if (isTask) {
    // for (let i = 0; i < projects.length; i++) {
    //   for (let j = 0; j < projects[i].tasks.length; j++) {
    //     if (projects[i].tasks[j].id === objId) {
    //       container = projects[i].tasks;
    //     }
    //   }
    // }

    data.projects.forEach(proj => {
      proj.tasks.forEach(task => {
        if (task.id === objId) {
          container = proj.tasks;
        }
      })
    })

  } else {
    container = data.projects;
  }

  remove(objId, container);
  popLocalStorage(data.projects);
  return container;
}

// Returns selected tasks based on criteria
const filterTasks = (filter) => {
  let filteredTasks = [];

  switch (filter) {
    case 'all':
      data.projects.forEach(proj => {
        proj.tasks.forEach(task => {
          filteredTasks.push(task);
        });
      });
      break;
    case 'today':
      data.projects.forEach(proj => {
        proj.tasks.forEach(task => {
          if (isToday(parseISO(task.due))) {
            filteredTasks.push(task);
          }
        });
      });
      break;
    case 'week':
      data.projects.forEach(proj => {
        proj.tasks.forEach(task => {
          if (task.due) {
            if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
              filteredTasks.push(task);
            }
          }
        });
      });
      break;
    case 'important':
      data.projects.forEach(proj => {
        proj.tasks.forEach(task => {
          if (task.important) {
            filteredTasks.push(task);
          }
        });
      });
      break;
    default:
      data.projects.forEach(proj => {
        if (proj.id === filter) {
          filteredTasks = proj.tasks;
        }
      })
  }

  return filteredTasks;
}

// Save projects or nav selection to local storage
const popLocalStorage = (input) => {

  if (typeof input === 'object') {
    localStorage.setItem('projects', JSON.stringify(input));
  } else {
    localStorage.setItem('display', input);
  }
  
};

// Save user nav panel selection
const saveNavSelection = (input) => {
  data.navSelection = input;
  popLocalStorage(data.navSelection);
}


export {
  // initNewItem,
  createProj,
  createTask,
  initItem,
  deleteItem,
  filterTasks,
  popLocalStorage,
  saveNavSelection
}

