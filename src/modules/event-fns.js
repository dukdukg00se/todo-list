/* This module contains the functions that are called by the event listeners following user actions */ 

import data from './site-data';
import { docListener } from './listener-fns';
import * as creatorFns from './creator-fns';
import * as dataHndlrs from './data-hndlrs';
import * as displayFns from './display-fns';


// Hide/remove displayed form by clicking outside form
const rmvFormOnClick = (e) => {
  let isTaskBtn =
    e.target.classList.contains('task-button') ||
    e.target.parentElement.classList.contains('task-button');
  let isProjBtn =
    e.target.classList.contains('project-button') ||
    e.target.parentElement.classList.contains('project-button');
  let isEditBtn =
    e.target.classList.contains('edit-icon') ||
    e.target.classList.contains('edit-button');
  let isForm = !!e.target.closest('form');
  let displayedForm;

  let pgForms = document.querySelectorAll('form');
  pgForms.forEach(form => {
    if (!form.classList.contains('hidden')) {
      displayedForm = form;
    }
  })

  // If not a proj/task/edit btn or form evnt, then hide form
  if (!isTaskBtn && !isProjBtn && !isEditBtn && !isForm) {
    if (displayedForm) {
      displayFns.formCntrlr.removeForm(displayedForm);
    }
  }
}

// Submit, escape form w/ "Enter", "Escape" keys
const cntrlFormByKey = (e) => {
  let form = e.target.closest('form');

  if (e.key === 'Enter') {
    // Make sure not on btn or delete
    // These events handles by manageBtn, manageTaskList
    if (
      !e.target.classList.contains('project-button') &&
      !e.target.classList.contains('task-button') &&
      !e.target.classList.contains('edit-button') &&
      !e.target.classList.contains('delete-icon')
    ) {

      if (form.id === 'edit-task-form') {
        let targetTask = e.target.closest('li').id;
        dataHndlrs.editTaskProp(targetTask, 'all');
        displayFns.contentCntrlr.setTaskList(dataHndlrs.filterTasks(data.navSelection));
      } else if (form.id === 'project-form') {
        let newProj = dataHndlrs.createProj();
        displayFns.contentCntrlr.setNavPanel(dataHndlrs.initItem(newProj));
      } else if (form.id === 'task-form') {
        let newTask = dataHndlrs.createTask();
        displayFns.contentCntrlr.setTaskList(dataHndlrs.initItem(newTask));
      }

      displayFns.formCntrlr.removeForm(form);
    }
  } else if (e.key === 'Escape') {
    displayFns.formCntrlr.removeForm(form);
  }  
}

// Minimize/expand nav panel
const toggleMenu = () => {
  const navPanel = document.querySelector('nav');
  const menuIcon = document.querySelector('.menu-icon');
  const menuToggleTooltip = document.querySelector('#menu-icon-wrapper > .tooltip-text');

  navPanel.classList.toggle('hidden');

  if (navPanel.classList.contains('hidden')) {
    menuToggleTooltip.textContent = 'Expand menu';
    menuIcon.textContent = 'menu';
  } else {
    menuToggleTooltip.textContent = 'Collapse menu';
    menuIcon.textContent = 'menu_open';
  }
};  

// Toggle between light/dark theme
const toggleTheme = () => {
  const themeIcon = document.querySelector('.theme-icon');
  const themeToggleTooltip = document.querySelector('#theme-icon-wrapper > .tooltip-text');

  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    themeToggleTooltip.textContent = 'Light theme';
    themeIcon.textContent = 'brightness_high';
  } else {
    themeToggleTooltip.textContent = 'Dark theme';
    themeIcon.textContent = 'brightness_4';
  }
};

const manageBtnResponse = (e) => {  
  let action = 
    e.target.parentElement.id === 'add-project' 
      ? 'add-project' 
      : e.target.parentElement.id === 'add-task' 
      ? 'add-task' 
      : e.target.id;

  let form = 
    /project/.test(action) 
      ? document.querySelector('#projects-panel form')
      : /edit/.test(action)
      ? document.querySelector('#edit-task-form')
      : document.querySelector('main > form');


  if (action === 'add-project' || action === 'add-task') {
    displayFns.formCntrlr.rmvExtranForm(action);
    displayFns.formCntrlr.displayForm(form);
  } else { 

    if (action === 'submit-project') {
      let newProj = dataHndlrs.createProj();
      displayFns.contentCntrlr.setNavPanel(dataHndlrs.initItem(newProj));
    } else if (action === 'submit-task') {
      let newTask = dataHndlrs.createTask();
      displayFns.contentCntrlr.setTaskList(dataHndlrs.initItem(newTask));
    } else if (action === 'submit-edit') {
      let targetTask = e.target.closest('li').id;
      dataHndlrs.editTaskProp(targetTask, 'all');
      displayFns.contentCntrlr.setTaskList(dataHndlrs.filterTasks(data.navSelection));
    } 

    displayFns.formCntrlr.removeForm(form);
  }
} 

const manageNavListResponse = (e) => {
  const selection = e.target.closest('li');
  const mainPanel = document.querySelector('main');

  if (selection) {

    if (e.target.classList.contains('delete-icon')) {
      dataHndlrs.deleteItem(selection.id);
      displayFns.contentCntrlr.setProjList(data.projects);

      // Instead of using dataset, can compare to data.navSelection
      // One more preferable?
      if (selection.id === mainPanel.dataset.selected) {
        dataHndlrs.saveNavSelection('all');
        displayFns.contentCntrlr.setMainPanel();
      }

    } else {
      dataHndlrs.saveNavSelection(selection.id);
      displayFns.contentCntrlr.setMainPanel();
    }

    displayFns.contentCntrlr.hlNavSelection();
  } 
}

const manageTaskListResponse = (e) => {
  let selection = e.target.closest('li');

  if (e.target.classList.contains('edit-icon')) {
    displayFns.formCntrlr.rmvExtranForm();    
    let taskInfo = dataHndlrs.returnTask(selection.id);
    displayFns.formCntrlr.displayForm(creatorFns.createEditForm(taskInfo), selection);
  } else {

    if (
      e.target.classList.contains('checkbox') || 
      e.target.classList.contains('checked')
    ) {
      dataHndlrs.editTaskProp(selection.id, 'completed');
    } else if (e.target.classList.contains('important-icon')) {
      dataHndlrs.editTaskProp(selection.id, 'important');
    } else if (e.target.classList.contains('delete-icon')) {
      dataHndlrs.deleteItem(selection.id);
      docListener(cntrlFormByKey, 'remove', 'keydown');
    } else {
      // E.g., key events within task edit form. 
      // Handled by formCntrlr module
      return;
    }

    displayFns.contentCntrlr.setTaskList(dataHndlrs.filterTasks(data.navSelection));
  }
}

/**
 * Control keyboard page navigation 
 * Manage all keyboard events except form keyboard events (controlled by cntrlFormByKey)
 * This because cntrlFormByKey was originally grouped w/ form display fns and moved here
 * May combine both at a later data
 */
const manageKeyResponse = (e) => {
  if (e.key === 'Enter') {
    if (e.target.classList.contains('menu-icon')) {
      toggleMenu();
    } else if (e.target.classList.contains('theme-icon')) {
      toggleTheme();
    } else if (e.target.closest('ul')) {

      if (
        e.target.closest('ul').id === 'home-list' || 
        e.target.closest('ul').id === 'projects-list' 
      ) {
        manageNavListResponse(e);
      } else {
        manageTaskListResponse(e);

        if (e.target.classList.contains('delete-icon')) {
          docListener(cntrlFormByKey, 'remove', 'keydown');
        }

      }

    }

    // If "Enter" on btn
    // Captures btns on task edit form as well
    if (e.target.nodeName === 'BUTTON') {
      manageBtnResponse(e);
    }

    e.preventDefault();
  } else if (e.key === 'Escape') {
    document.activeElement.blur();
  }
}

export {
  rmvFormOnClick,
  cntrlFormByKey,
  toggleMenu,
  toggleTheme,
  manageBtnResponse,
  manageNavListResponse,
  manageTaskListResponse,
  manageKeyResponse
}