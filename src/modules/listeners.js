const listenersController = (() => {

  const addMenuToggListener = () => {
    const menuToggle = document.querySelector('.menu-icon');

    menuToggle.addEventListener('click', displayController.toggleMenu);
  }

  const addThemeToggListener = () => {
    const themeToggle = document.querySelector('.theme-icon');

    themeToggle.addEventListener('click', displayController.toggleTheme);
  }

  const addNavListsListeners = () => {
    // In lieu of adding listener to list items, add to lists
    // May be more efficient?
    let navLists = document.querySelectorAll('nav ul');

    navLists.forEach(list => {
      list.addEventListener('click', displayController.manageNavResponse)
    })
  }

  const addTasksListListener = () => {
  const tasksList = document.querySelector('#tasks-list');

    if (tasksList) {
      tasksList.addEventListener('click', displayController.manageTaskResponse)
    }
  }

  const addPageBtnListeners = () => {
    const formBtns = document.querySelectorAll('button');
  
    formBtns.forEach(btn => {
      btn.addEventListener('click', displayController.managePageBtns);
    })
  }




  // addMenuToggListener();
  // addThemeToggListener();
  // Only on task views on start
  // addNavListsListeners(); 
  // addTasksListListener();
  // addPageBtnListeners();

  return {
    addMenuToggListener,
    addThemeToggListener,
    addNavListsListeners,
    addTasksListListener,
    addPageBtnListeners
  }
})();