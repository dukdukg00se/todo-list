// This module contains functions that add (or remove) listeners to key page elements

const addMenuToggListener = (fn, ...evnts) => {
  const menuToggle = document.querySelector('.menu-icon');

  evnts.forEach(evnt => {
    menuToggle.addEventListener(evnt, fn);
  });
}

const addThemeToggListener = (fn, ...evnts) => {
  const themeToggle = document.querySelector('.theme-icon');

  evnts.forEach(evnt => {
    themeToggle.addEventListener(evnt, fn);
  });

}

const addNavListListeners = (fn, ...evnts) => {
  // In lieu of adding listener to list items, add to lists
  // May be more efficient?
  let navLists = document.querySelectorAll('nav ul');

  for (let i = 0; i < navLists.length; i++) {
    for (let j = 0; j < evnts.length; j++) {
      navLists[i].addEventListener(evnts[j], fn);
    }
  }
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

