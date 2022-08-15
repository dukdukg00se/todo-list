/* This module contains functions that add/remove listeners to key page elements */

/* eslint-disable no-plusplus */

/**
 * Originally wanted to run same fn for "keydown" and "click" events, thus the rest parameter
 * Later decided to control "keydown" events with separate fn
 */
const addMenuToggListener = (fn, ...evnts) => {
  const menuToggle = document.querySelector('.menu-icon');

  evnts.forEach((evnt) => {
    menuToggle.addEventListener(evnt, fn);
  });
};

const addThemeToggListener = (fn, ...evnts) => {
  const themeToggle = document.querySelector('.theme-icon');

  evnts.forEach((evnt) => {
    themeToggle.addEventListener(evnt, fn);
  });
};

const addNavListListeners = (fn, ...evnts) => {
  // In lieu of adding listener to list items, add to lists
  // More efficient?
  const navLists = document.querySelectorAll('nav ul');

  for (let i = 0; i < navLists.length; i++) {
    for (let j = 0; j < evnts.length; j++) {
      navLists[i].addEventListener(evnts[j], fn);
    }
  }
};

const addTaskListListener = (fn, ...evnts) => {
  const taskList = document.querySelector('#tasks-list');

  evnts.forEach((evnt) => {
    taskList.addEventListener(evnt, fn);
  });
};

const addPageBtnListeners = (fn, ...evnts) => {
  const formBtns = document.querySelectorAll('button');

  for (let i = 0; i < formBtns.length; i++) {
    for (let j = 0; j < evnts.length; j++) {
      formBtns[i].addEventListener(evnts[j], fn);
    }
  }
};

const docListener = (fn, action, evnt) => {
  // eslint-disable-next-line no-unused-expressions
  action === 'add'
    ? document.body.addEventListener(evnt, fn)
    : document.body.removeEventListener(evnt, fn);
};

export {
  addMenuToggListener,
  addThemeToggListener,
  addNavListListeners,
  addTaskListListener,
  addPageBtnListeners,
  docListener,
};
