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

const addTaskListListener = (fn, ...evnts) => {
  const taskList = document.querySelector('#tasks-list');

  evnts.forEach(evnt => {
    taskList.addEventListener(evnt, fn);
  });

  // if (taskList) {
  //   taskList.addEventListener(evnt, fn);
  // }
}




// const addPageBtnListeners = (fn, evnt) => {
//   const formBtns = document.querySelectorAll('button');

//   formBtns.forEach(btn => {
//     btn.addEventListener(evnt, fn);
//   });
// }
const addPageBtnListeners = (fn, ...evnts) => {
  const formBtns = document.querySelectorAll('button');

  for (let i = 0; i < formBtns.length; i++) {
    for (let j = 0; j < evnts.length; j++) {
      formBtns[i].addEventListener(evnts[j], fn);
    }
  }

}




const docListener = (fn, action, evnt) => {
  action === 'add' 
    ? document.body.addEventListener(evnt, fn) 
    : document.body.removeEventListener(evnt, fn);
}

export {
  addMenuToggListener,
  addThemeToggListener,
  addNavListListeners,
  addTaskListListener,
  addPageBtnListeners,
  docListener
}

