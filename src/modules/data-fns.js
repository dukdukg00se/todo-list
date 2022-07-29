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


const returnProj = (projId) => {
  let targetProj;

  data.projects.forEach(proj => {
    if (proj.id === projId) {
      targetProj = proj;
    }
  });

  return targetProj;
}

const returnTaskContainer = (taskId) => {
  let taskContainer;

  data.projects.forEach(proj => {
    proj.tasks.forEach(task => {
      if (task.id === taskId) {
        taskContainer =  proj.tasks;
      }
    })
  })

  return taskContainer;
}

const returnTask = (taskId) => {
  let targetTask;

  data.projects.forEach(proj => {
    proj.tasks.forEach(task => {
      if (task.id === taskId) {
        targetTask =  task;
      }
    })
  })

  return targetTask;
}

/* Constructors to create new projects/tasks */
function Project(name) {
  this.name = name;
  this.tasks = [];
  // Proj id will be set later
}

function Task(name, details, due, important) {
  this.name = name;
  this.details = details;
  this.due = due;
  this.important = important;
  this.completed = false;
  // Task id will be set later
}


/* Exported fns */
// Returns a new project object
const createProj = () => {
  const projName = document.querySelector("#project-name-input").value;
  return new Project(projName);
}

// Returns a new task object
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
const initItem = (itm) => {
  let itmContainer, idPrefix;

  if (itm instanceof Project) {
    itmContainer = data.projects;
    idPrefix = 'project-'
  } else {
    let targetProj = document.querySelector('main').dataset.selected;
    let proj = returnProj(targetProj);
    itmContainer = proj.tasks;
    idPrefix = `${proj.id}-task-`;
  }

  add(itm, itmContainer);
  setId(idPrefix, itmContainer);
  popLocalStorage(data.projects);
  return itmContainer;
}

// Delete proj/task - 
// Remove item from container array,
// Save projects array to local storage
// return container for display
const deleteItem = (itmId) => {
  let isTask = /task/.test(itmId);
  let itmContainer;

  if (isTask) {
    itmContainer = returnTaskContainer(itmId);
  } else {
    itmContainer = data.projects;
  }

  remove(itmId, itmContainer);
  popLocalStorage(data.projects);
  return itmContainer;
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
      let proj = returnProj(filter);
      filteredTasks = proj.tasks;
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

const editTaskProp = (tskId, prop) => {
  let projects = data.projects;

  projects.forEach(proj => {
    proj.tasks.forEach(task => {
      if (task.id === tskId) {

        switch (prop) {
          case 'completed':
            task.completed ? (task.completed = false) : (task.completed = true);
            break;
          case 'important':
            task.important ? (task.important = false) : (task.important = true);
            break;
          case 'all':
            task.name = document.querySelector('#edit-name-input').value;
            task.details = document.querySelector('#edit-details-input').value;
            task.due = document.querySelector('#edit-date-input').value;
            task.important = document.querySelector('#edit-important-input').checked;
        }

        popLocalStorage(projects);
      }
    });
  });
}


export {
  // initNewItem,
  returnProj,
  returnTaskContainer,
  returnTask,
  createProj,
  createTask,
  editTaskProp,
  initItem,
  deleteItem,
  filterTasks,
  popLocalStorage,
  saveNavSelection
}

