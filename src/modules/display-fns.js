/**
 * This module's functions control the displayed content
 * E.g., showing proj/tasks, highlighting nav selection, etc...
 */

import { 
  rmvFormOnClick,
  cntrlFormByKey,
  manageBtnResponse, 
  manageNavListResponse, 
  manageTaskListResponse 
} from './event-fns';
import {
  addNavListListeners,
  addTaskListListener,
  addPageBtnListeners,
  docListener
} from './listener-fns';
import data from './site-data';
import * as creatorFns from './creator-fns';
import * as dataHndlrs from './data-hndlrs';

const formCntrlr = (() => {
  const displayForm = (form, task) => {
    if (form.id === 'edit-task-form') {
      task.append(form);

      // Hide task info when edit form displayed
      form.previousElementSibling.classList.toggle('hidden');

      addPageBtnListeners(manageBtnResponse, 'click');
    } else {
      form.classList.remove('hidden');

      // Hide add proj/task button when displaying form
      form.nextElementSibling.classList.add('hidden');
    }

    // Focus on first form input field
    form.querySelector('input').focus();

    docListener(rmvFormOnClick, 'add', 'click');
    docListener(cntrlFormByKey, 'add', 'keydown');
  }

  const removeForm = (form) => {
    if (form.id === 'edit-task-form') {
      form.previousElementSibling.classList.toggle('hidden');
      form.remove();
    } else {
      form.reset();
      form.classList.add('hidden');

      /**
       * Add proj/task btn cntrlr
       * Show add proj btn on proj form hide
       * Show add task btn on task form hide when a proj displayed in main
       * Otherwise keep add task btn hidden
       */
      if (form.id === 'project-form' || /project-/.test(data.navSelection)) {
        form.nextElementSibling.classList.remove('hidden');
      } 
    }

    docListener(rmvFormOnClick, 'remove', 'click');
    docListener(cntrlFormByKey, 'remove', 'keydown');
  }

  // Make sure only one form is displayed 
  const rmvExtranForm = (action) => {
    const tasksListContainer = document.querySelector('#tasks-list-container');
    let editFormDisplayed = tasksListContainer.querySelector('form')
    let irrelForm;

    // Use to check if add proj/task form is displayed
    if (action === 'add-project') {
      // Irrelevant form = add new task form
      irrelForm = document.querySelector('main > form');
    } else if (action === 'add-task') {
      // irrelForm = add new proj form
      irrelForm = document.querySelector("#projects-panel form");
    } else { // action === 'show edit form'
      // If either task/proj form not hidden, set as irrelForm
      let pgForms = document.querySelectorAll('#projects-panel > form, main > form');
      pgForms.forEach(form => {
        if (!form.classList.contains('hidden')) {
          irrelForm = form;
        }
      })
    }

    if (irrelForm) {
      // If add task/proj form displayed, hide
      if (!irrelForm.classList.contains('hidden')) {
        removeForm(irrelForm);
      }
    }

    // Check if edit task form is displayed
    if (editFormDisplayed) {
      removeForm(editFormDisplayed);
    }
  }

  return {
    displayForm,
    removeForm, 
    rmvExtranForm,
  }
})();

const contentCntrlr = (() => {
  const hlNavSelection = () => {
    const navItems = document.querySelectorAll('nav li');
    navItems.forEach(item => {
      if (item.classList.contains('highlight') && item.id !== data.navSelection) {
        item.classList.remove('highlight');
      }
    });
  
    document.getElementById(data.navSelection).classList.add('highlight');
  }

  const display = (arr) => {
    let oldList, listId, container;
    let isProj = (arr === data.projects);
  
    if (isProj) {
      container = document.querySelector('#projects-list-container');
      oldList = document.querySelector('#projects-list');
      listId = 'projects-list';
    } else {
      container = document.querySelector('#tasks-list-container');
      oldList = document.querySelector('#tasks-list');
      listId = 'tasks-list';
    }
  
    if (container.contains(oldList)) {
      oldList.remove();
    }
  
    const newList = document.createElement('ul');
    newList.id = listId;
    arr.forEach(item => {
      newList.append(
        isProj ? creatorFns.createProj(item) : creatorFns.createTask(item)
      );
    })
    container.append(newList);
  }

  const setProjList = (arr) => {
    display(arr);  
    addNavListListeners(manageNavListResponse, 'click');      
  }

  const setTaskList = (arr) => {
    display(arr);
    addTaskListListener(manageTaskListResponse, 'click');
  }

  const setNavPanel = (arr) => {
    let projs = arr ? arr : data.projects;

    setProjList(projs);
    hlNavSelection();
  }

  const setMainPanel = () => {
    const mainPanel = document.querySelector('main');
    const mainHeader = document.querySelector('h1');
    const addTaskBtn = document.querySelector('main > button');
    let selection = data.navSelection;

    /**
     * Used in manageNavListResponse()
     * Setting dataset unnecessary, can use data.navSelection
     * One more preferable?
     */
    mainPanel.dataset.selected = selection;
  
    switch (selection) {
      case 'all':
        mainHeader.textContent = 'All';
        break;
      case 'today':
        mainHeader.textContent = 'Today';
        break;
      case 'week':
        mainHeader.textContent = 'Next 7 Days';
        break;
      case 'important':
        mainHeader.textContent = 'Important';
        break;
      default:
        data.projects.forEach(proj => {
          if (proj.id === selection) {
            mainHeader.textContent = proj.name ? proj.name : 'No name entered';
          }
        });
    }
  
    // Determine if add task btn displayed
    // If selection is a proj then display add task btn
    /project-/.test(selection) 
      ? addTaskBtn.classList.remove('hidden')
      : addTaskBtn.classList.add('hidden');
  
    setTaskList(dataHndlrs.filterTasks(selection));
  }

  return {
    hlNavSelection,
    setProjList,
    setTaskList,
    setNavPanel,
    setMainPanel
  }
})();

export {
  formCntrlr,
  contentCntrlr
}
