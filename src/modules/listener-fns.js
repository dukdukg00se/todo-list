// This module contains functions that add (or remove) listeners to key page elements

const addMenuToggListener = (evnt, fn) => {
  const menuToggle = document.querySelector('.menu-icon');

  menuToggle.addEventListener(evnt, fn);
}

const addThemeToggListener = (evnt, fn) => {
  const themeToggle = document.querySelector('.theme-icon');

  themeToggle.addEventListener(evnt, fn);
}

const addNavListListeners = (evnt, fn) => {
  // In lieu of adding listener to list items, add to lists
  // May be more efficient?
  let navLists = document.querySelectorAll('nav ul');

  navLists.forEach((list) => {
    list.addEventListener(evnt, fn);
  });
}

const addTasksListListener = (evnt, fn) => {
const tasksList = document.querySelector('#tasks-list');

  if (tasksList) {
    tasksList.addEventListener(evnt, fn);
  }
}

const addPageBtnListeners = (evnt, fn) => {
  const formBtns = document.querySelectorAll('button');

  formBtns.forEach(btn => {
    btn.addEventListener(evnt, fn);
  });
}

const docListener = (action, evnt, fn) => {
  action === 'add' 
    ? document.body.addEventListener(evnt, fn) 
    : document.body.removeEventListener(evnt, fn);
}

export {
  addMenuToggListener,
  addThemeToggListener,
  addNavListListeners,
  addTasksListListener,
  addPageBtnListeners,
  docListener
}

