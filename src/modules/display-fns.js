/* This module's functions control the display content, e.g., showing the proj/tasks, highlighting current nav selection, etc... */

import data from './data.js';
import * as contentFns from './content-fns.js';
import * as listenerFns from './listener-fns';
import * as dataFns from './data-fns';



const formCntrlr = (() => {
  const displayForm = (form, task) => {
    if (form.id === 'edit-task-form') {
      task.append(form);

      // Hide task info when edit form displayed
      form.previousElementSibling.classList.toggle('hidden');

      listenerFns.addPageBtnListeners(manageBtnResponse, 'click');
    } else {
      form.classList.remove('hidden');

      // Hide add proj/task button when displaying form
      form.nextElementSibling.classList.add('hidden');
    }

    // Focus on first form input field
    form.querySelector('input').focus();

    listenerFns.docListener(rmvFormOnClick, 'add', 'click');
    listenerFns.docListener(sbmtFormByKey, 'add', 'keydown');
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

    listenerFns.docListener(rmvFormOnClick, 'remove', 'click');
    listenerFns.docListener(sbmtFormByKey, 'remove', 'keydown');
  }

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
        removeForm(displayedForm);
      }
    }
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

  // Submit, escape form w/ "Enter", "Escape"
  const sbmtFormByKey = (e) => {
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
          dataFns.editTaskProp(targetTask, 'all');
          contentCntrlr.setTaskList(dataFns.filterTasks(data.navSelection));
        } else if (form.id === 'project-form') {
          let newProj = dataFns.createProj();
          contentCntrlr.setNavPanel(dataFns.initItem(newProj));
        } else if (form.id === 'task-form') {
          let newTask = dataFns.createTask();
          contentCntrlr.setTaskList(dataFns.initItem(newTask));
        }
        removeForm(form);
      }
    } else if (e.key === 'Escape') {
      removeForm(form);
    }  
  }

  return {
    displayForm,
    removeForm, 
    rmvExtranForm,
    sbmtFormByKey
  }
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
    toggleTheme
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
        isProj ? contentFns.createProj(item) : contentFns.createTask(item)
      );
    })
    container.append(newList);
  }

  const setProjList = (arr) => {
    display(arr);  
    listenerFns.addNavListListeners(manageNavListResponse, 'click');      
    listenerFns.docListener(masterKeyCntrlr, 'add', 'keydown');
  }

  const setTaskList = (arr) => {
    display(arr);
  
    listenerFns.addTaskListListener(manageTaskListResponse, 'click');
    listenerFns.docListener(masterKeyCntrlr, 'add', 'keydown');
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
  
    // Used in manageNavListResponse()
    // Setting dataset may be unnecessary, can use data.navSelection
    // Need to see if one is more preferable
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
  
    // Determine whether add task btn is displayed
    // If selection is a proj then display add task btn
    /project-/.test(selection) 
      ? addTaskBtn.classList.remove('hidden')
      : addTaskBtn.classList.add('hidden');
  
    setTaskList(dataFns.filterTasks(selection));
  
  }

  return {
    hlNavSelection,
    setProjList,
    setTaskList,
    setNavPanel,
    setMainPanel
  }
})();









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
    formCntrlr.rmvExtranForm(action);
    formCntrlr.displayForm(form);
  } else { 

    if (action === 'submit-project') {
      let newProj = dataFns.createProj();
      contentCntrlr.setNavPanel(dataFns.initItem(newProj));
    } else if (action === 'submit-task') {
      let newTask = dataFns.createTask();
      contentCntrlr.setTaskList(dataFns.initItem(newTask));
    } else if (action === 'submit-edit') {
      let targetTask = e.target.closest('li').id;
      dataFns.editTaskProp(targetTask, 'all');
      contentCntrlr.setTaskList(dataFns.filterTasks(data.navSelection));
    } 

    formCntrlr.removeForm(form);
  }
} 

const manageNavListResponse = (e) => {
  const selection = e.target.closest('li');
  const mainPanel = document.querySelector('main');

  if (selection) {

    if (e.target.classList.contains('delete-icon')) {
      dataFns.deleteItem(selection.id);
      contentCntrlr.setProjList(data.projects);

      // Instead of using dataset, can compare to data.navSelection
      // One more preferable?
      if (selection.id === mainPanel.dataset.selected) {
        dataFns.saveNavSelection('all');
        contentCntrlr.setMainPanel();
      }

    } else {
      dataFns.saveNavSelection(selection.id);
      contentCntrlr.setMainPanel();
    }

    contentCntrlr.hlNavSelection();
  } 
}

const manageTaskListResponse = (e) => {
  let selection = e.target.closest('li');

  if (e.target.classList.contains('edit-icon')) {
    formCntrlr.rmvExtranForm();    
    let taskInfo = dataFns.returnTask(selection.id);
    formCntrlr.displayForm(contentFns.createEditForm(taskInfo), selection);
  } else {

    if (
      e.target.classList.contains('checkbox') || 
      e.target.classList.contains('checked')
    ) {
      dataFns.editTaskProp(selection.id, 'completed');
    } else if (e.target.classList.contains('important-icon')) {
      dataFns.editTaskProp(selection.id, 'important');
    } else if (e.target.classList.contains('delete-icon')) {
      dataFns.deleteItem(selection.id);
      listenerFns.docListener(formCntrlr.sbmtFormByKey, 'remove', 'keydown');
    } else {
      // E.g., key events within task edit form. 
      // Handled by formCntrlr module
      return;
    }

    contentCntrlr.setTaskList(dataFns.filterTasks(data.navSelection));
  }
}

const masterKeyCntrlr = (e) => {

  if (e.key === 'Enter') {

    if (e.target.classList.contains('menu-icon')) {
      settingsCntrlr.toggleMenu();
    }

    if (e.target.classList.contains('theme-icon')) {
      settingsCntrlr.toggleTheme();
    }

    if (e.target.closest('ul')) {

      if (
        e.target.closest('ul').id === 'home-list' || 
        e.target.closest('ul').id === 'projects-list' 
      ) {
        manageNavListResponse(e);
      } else {
        manageTaskListResponse(e);

        if (e.target.classList.contains('delete-icon')) {
          listenerFns.docListener(formCntrlr.sbmtFormByKey, 'remove', 'keydown');
        }

      }

    }

    if (e.target.nodeName === 'BUTTON') {
      manageBtnResponse(e);
    }

    e.preventDefault();

    // else if (e.target.classList.contains('delete-icon')) {

    //   if (e.target.parentElement.classList.contains('project-wrapper')) {
    //     manageNavListResponse(e);
    //   } else {


    //     // listenerFns.docListener(formCntrlr.sbmtFormByKey, 'remove', 'keydown');
    //     manageTaskListResponse(e);
    //   }

    // }

  

    // else {
    //   manageTaskListResponse(e);  
    //   e.preventDefault();
    // }

  } 

  else if (e.key === 'Escape') {
    document.activeElement.blur();
  }

}





export {
  masterKeyCntrlr,
  settingsCntrlr,
  contentCntrlr,
  manageBtnResponse,
  manageNavListResponse,
  manageTaskListResponse
}

// const manageTaskListResponse = (e) => {
//   if (e.type === 'click' || e.key === 'Enter') {
//     let selection = e.target.closest('li');

//     if (
//       e.target.classList.contains('checkbox') || 
//       e.target.classList.contains('checked')
//     ) {
//       dataFns.editTaskProp(selection.id, 'completed');

//       console.log(document.activeElement);
//       // Set a unique id for checkbox?

//       setTaskList(dataFns.filterTasks(data.navSelection));



//       // let checkbox = selection.querySelector('.checkbox');
//       // let description = selection.querySelector('.task-descr-wrapper');
//       // checkbox.classList.toggle('checked');
//       // description.classList.toggle('crossed');
//       // selection.classList.toggle('completed');
//     } else if (e.target.classList.contains('important-icon')) {
//       dataFns.editTaskProp(selection.id, 'important');

//       focusedElem = document.activeElement.id;


//       setTaskList(dataFns.filterTasks(data.navSelection));


//       if (e.key) {
//         document.getElementById(focusedElem).focus();
//       }

  
//       // No need to toggle since redisplaying task list
//       // e.target.classList.toggle('important');
//     } else if (e.target.classList.contains('delete-icon')) {
//       dataFns.deleteItem(selection.id);
//       setTaskList(dataFns.filterTasks(data.navSelection));
//     } else if (e.target.classList.contains('edit-icon')) {
//       focusedElem = document.activeElement.id;


//       rmvExtranForms();    
//       let task = dataFns.returnTask(selection.id);
//       displayForm(contentFns.createEditForm(task), selection);
//       listenerFns.addPageBtnListeners(manageBtnResponse, 'click', 'keydown');


//       e.preventDefault();
//     } 

//   } else if (e.key === 'Escape') {
//     document.activeElement.blur();
//   }
// }



// const masterKeyCntrlr = (e) => {
//   if (e.key === 'Enter') {

//     if (e.target.closest('form')) {
//       formCntrlr.sbmtFormByKey(e);
//     }


//     if (e.target.classList.contains('menu-icon')) {
//       toggle.menu();
//     }

//     else if (e.target.classList.contains('theme-icon')) {
//       toggle.theme();
//     }

//     else if (e.target.classList.contains('task-view') || e.target.classList.contains('project-item')) {
//       manageNavListResponse(e);
//     }

//     else if (e.target.nodeName === 'BUTTON') {
//       manageBtnResponse(e);
//       e.preventDefault();   
//     }

//     else if (e.target.classList.contains('delete-icon')) {

//       if (e.target.parentElement.classList.contains('project-wrapper')) {
//         manageNavListResponse(e);
//       } else {


//         // listenerFns.docListener(formCntrlr.sbmtFormByKey, 'remove', 'keydown');
//         manageTaskListResponse(e);
//       }

//     }

//     else if (e.target.classList.contains('github')) {
//       return;
//     }

//     else {
//       manageTaskListResponse(e);  
//       e.preventDefault();
//     }

//   } 

//   else if (e.key === 'Escape') {
//     document.activeElement.blur();
//   }

// }