/**
 * This module's functions control the displayed content
 * E.g., showing proj/tasks, highlighting nav selection, etc...
 */

/* eslint-disable no-nested-ternary, no-use-before-define, no-unused-expressions */

import {
  addNavListListeners,
  addTaskListListener,
  addPageBtnListeners,
  docListener,
} from './listener-fns';
import data from './site-data';
import * as creatorFns from './creator-fns';
import * as dataHndlrs from './data-hndlrs';

const contentCntrlr = (() => {
  const hlNavSelection = () => {
    const navItems = document.querySelectorAll('nav li');
    navItems.forEach((item) => {
      if (item.classList.contains('highlight') && item.id !== data.navSelection) {
        item.classList.remove('highlight');
      }
    });

    document.getElementById(data.navSelection).classList.add('highlight');
  };

  const display = (arr) => {
    let oldList; let listId; let
      container;
    const isProj = (arr === data.projects);

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
    arr.forEach((item) => {
      newList.append(
        isProj ? creatorFns.createProj(item) : creatorFns.createTask(item),
      );
    });
    container.append(newList);
  };

  const setProjList = (arr) => {
    display(arr);
    addNavListListeners(manageNavListResponse, 'click');
  };

  const setTaskList = (arr) => {
    display(arr);
    addTaskListListener(manageTaskListResponse, 'click');
  };

  const setNavPanel = (arr) => {
    const projs = arr || data.projects;

    setProjList(projs);
    hlNavSelection();
  };

  const setMainPanel = () => {
    const mainPanel = document.querySelector('main');
    const mainHeader = document.querySelector('h1');
    const addTaskBtn = document.querySelector('main > button');
    const selection = data.navSelection;

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
        data.projects.forEach((proj) => {
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
  };

  return {
    hlNavSelection,
    setProjList,
    setTaskList,
    setNavPanel,
    setMainPanel,
  };
})();

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
  };

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
  };

  // Make sure only one form is displayed
  const rmvExtranForm = (action) => {
    const tasksListContainer = document.querySelector('#tasks-list-container');
    const editFormDisplayed = tasksListContainer.querySelector('form');
    let irrelForm;

    // Use to check if add proj/task form is displayed
    if (action === 'add-project') {
      // Irrelevant form = add new task form
      irrelForm = document.querySelector('main > form');
    } else if (action === 'add-task') {
      // irrelForm = add new proj form
      irrelForm = document.querySelector('#projects-panel form');
    } else { // action === 'show edit form'
      // If either task/proj form not hidden, set as irrelForm
      const pgForms = document.querySelectorAll('#projects-panel > form, main > form');
      pgForms.forEach((form) => {
        if (!form.classList.contains('hidden')) {
          irrelForm = form;
        }
      });
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
  };

  const rmvFormOnClick = (e) => {
    const isTaskBtn = e.target.classList.contains('task-button')
      || e.target.parentElement.classList.contains('task-button');
    const isProjBtn = e.target.classList.contains('project-button')
      || e.target.parentElement.classList.contains('project-button');
    const isEditBtn = e.target.classList.contains('edit-icon')
      || e.target.classList.contains('edit-button');
    const isForm = !!e.target.closest('form');
    let displayedForm;

    const pgForms = document.querySelectorAll('form');
    pgForms.forEach((form) => {
      if (!form.classList.contains('hidden')) {
        displayedForm = form;
      }
    });

    // If not a proj/task/edit btn or form evnt, then hide form
    if (!isTaskBtn && !isProjBtn && !isEditBtn && !isForm) {
      if (displayedForm) {
        removeForm(displayedForm);
      }
    }
  };

  const cntrlFormByKey = (e) => {
    const form = e.target.closest('form');

    if (e.key === 'Enter') {
      // Make sure not on btn or delete
      // These events handles by manageBtn, manageTaskList
      if (
        !e.target.classList.contains('project-button')
        && !e.target.classList.contains('task-button')
        && !e.target.classList.contains('edit-button')
        && !e.target.classList.contains('delete-icon')
      ) {
        if (form.id === 'edit-task-form') {
          const targetTask = e.target.closest('li').id;
          dataHndlrs.editTaskProp(targetTask, 'all');
          contentCntrlr.setTaskList(dataHndlrs.filterTasks(data.navSelection));
        } else if (form.id === 'project-form') {
          const newProj = dataHndlrs.createProj();
          contentCntrlr.setNavPanel(dataHndlrs.initItem(newProj));
        } else if (form.id === 'task-form') {
          const newTask = dataHndlrs.createTask();
          contentCntrlr.setTaskList(dataHndlrs.initItem(newTask));
        }

        formCntrlr.removeForm(form);
      }
    } else if (e.key === 'Escape') {
      formCntrlr.removeForm(form);
    }
  };

  return {
    displayForm,
    removeForm,
    rmvExtranForm,
    rmvFormOnClick,
    cntrlFormByKey,
  };
})();

const settingsCntrlr = (() => {
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

  return {
    toggleMenu,
    toggleTheme,
  };
})();

const manageBtnResponse = (e) => {
  const action = e.target.parentElement.id === 'add-project'
    ? 'add-project'
    : e.target.parentElement.id === 'add-task'
      ? 'add-task'
      : e.target.id;

  const form = /project/.test(action)
    ? document.querySelector('#projects-panel form')
    : /edit/.test(action)
      ? document.querySelector('#edit-task-form')
      : document.querySelector('main > form');

  if (action === 'add-project' || action === 'add-task') {
    formCntrlr.rmvExtranForm(action);
    formCntrlr.displayForm(form);
  } else {
    if (action === 'submit-project') {
      const newProj = dataHndlrs.createProj();
      contentCntrlr.setNavPanel(dataHndlrs.initItem(newProj));
    } else if (action === 'submit-task') {
      const newTask = dataHndlrs.createTask();
      contentCntrlr.setTaskList(dataHndlrs.initItem(newTask));
    } else if (action === 'submit-edit') {
      const targetTask = e.target.closest('li').id;
      dataHndlrs.editTaskProp(targetTask, 'all');
      contentCntrlr.setTaskList(dataHndlrs.filterTasks(data.navSelection));
    }

    formCntrlr.removeForm(form);
  }
};

const manageNavListResponse = (e) => {
  const selection = e.target.closest('li');
  const mainPanel = document.querySelector('main');

  if (selection) {
    if (e.target.classList.contains('delete-icon')) {
      dataHndlrs.deleteItem(selection.id);
      contentCntrlr.setProjList(data.projects);

      // Instead of using dataset, can compare to data.navSelection
      // One more preferable?
      if (selection.id === mainPanel.dataset.selected) {
        dataHndlrs.saveNavSelection('all');
        contentCntrlr.setMainPanel();
      }
    } else {
      dataHndlrs.saveNavSelection(selection.id);
      contentCntrlr.setMainPanel();
    }

    contentCntrlr.hlNavSelection();
  }
};

const manageTaskListResponse = (e) => {
  const selection = e.target.closest('li');

  if (e.target.classList.contains('edit-icon')) {
    formCntrlr.rmvExtranForm();
    const taskInfo = dataHndlrs.returnTask(selection.id);
    formCntrlr.displayForm(creatorFns.createEditForm(taskInfo), selection);
  } else {
    if (
      e.target.classList.contains('checkbox')
      || e.target.classList.contains('checked')
    ) {
      dataHndlrs.editTaskProp(selection.id, 'completed');
    } else if (e.target.classList.contains('important-icon')) {
      dataHndlrs.editTaskProp(selection.id, 'important');
    } else if (e.target.classList.contains('delete-icon')) {
      dataHndlrs.deleteItem(selection.id);
      docListener(formCntrlr.cntrlFormByKey, 'remove', 'keydown');
    } else {
      // E.g., key events within task edit form.
      // Handled by formCntrlr module
      return;
    }

    contentCntrlr.setTaskList(dataHndlrs.filterTasks(data.navSelection));
  }
};

/**
 * Control keyboard page navigation
 * Manage all keyboard events except form keyboard events (controlled by cntrlFormByKey)
 * May combine both at a later date
 */
const manageKeyResponse = (e) => {
  if (e.key === 'Enter') {
    if (e.target.classList.contains('menu-icon')) {
      settingsCntrlr.toggleMenu();
    } else if (e.target.classList.contains('theme-icon')) {
      settingsCntrlr.toggleTheme();
    } else if (e.target.closest('ul')) {
      if (
        e.target.closest('ul').id === 'home-list'
        || e.target.closest('ul').id === 'projects-list'
      ) {
        manageNavListResponse(e);
      } else {
        manageTaskListResponse(e);

        if (e.target.classList.contains('delete-icon')) {
          docListener(formCntrlr.cntrlFormByKey, 'remove', 'keydown');
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
};

export {
  formCntrlr,
  contentCntrlr,
  settingsCntrlr,
  manageBtnResponse,
  manageKeyResponse,
};
