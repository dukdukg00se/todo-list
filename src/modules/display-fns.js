/* This module's functions control the display content, e.g., showing the proj/tasks, highlighting current nav selection, etc... */

import data from './data.js';
import * as contentFns from './content-fns.js';
import * as listenerFns from './listener-fns';
import * as dataFns from './data-fns';



function display(arr) {
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


const setTaskList = (arr) => {
  display(arr);

  listenerFns.addTaskListListener(manageTaskResponse, 'click');
  listenerFns.docListener(keyContrlr, 'add', 'keydown');
}



/** Form module */
// Show input form, focus on first input, add listeners     
// For new proj/task forms hide add proj/task btn 
// For edit task form, hide task info
function displayForm(form, task) {
  if (form.id === 'edit-task-form') {
    task.append(form);

    // Hide task info when edit form displayed
    form.previousElementSibling.classList.toggle('hidden');

    
    listenerFns.addPageBtnListeners(managePageBtns, 'click');
  } else {
    form.classList.remove('hidden');

    // Hide add proj/task button when displaying form
    form.nextElementSibling.classList.add('hidden');
  }

  // Focus on first form input field
  form.querySelector('input').focus();

  listenerFns.docListener(removeFormOnClick, 'add', 'click');
  listenerFns.docListener(testForm, 'add', 'keydown');
}

// Reset, hide/remove form, remove listener
function removeForm(form) {
  if (form.id === 'edit-task-form') {
    form.previousElementSibling.classList.toggle('hidden');
    form.remove();
  } else {
    form.reset();
    form.classList.add('hidden');
  
    // Add proj/task btn control
    // Show add proj btn on proj form hide
    // Show add task btn on task form hide when a proj is displayed in main
    // Otherwise keep add task btn hidden
    if (form.id === 'project-form' || /project-/.test(data.navSelection)) {
      form.nextElementSibling.classList.remove('hidden');
    } 
  }

  listenerFns.docListener(removeFormOnClick, 'remove', 'click');
  listenerFns.docListener(testForm, 'remove', 'keydown');
}

// Hide/remove displayed forms when clicking outside form
function removeFormOnClick(e) {
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

// Makes sure only one form is displayed 
function removeExtranForms(action) {
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
/** */



// Set main header, dataset, control add task btn, display selected tasks
const setMainPanel = () => {
  const mainPanel = document.querySelector('main');
  const mainHeader = document.querySelector('h1');
  const addTaskBtn = document.querySelector('main > button');
  let selection = data.navSelection;

  // Used in manageNavResponse()
  // Setting dataset may be unnecessary, can use data.navSelection
  // Need to see if one is more efficient
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



// Display user projects in proj panel, add listener
const setProjList = (arr) => {
  display(arr);  
  listenerFns.addNavListListeners(manageNavResponse, 'click');      
  listenerFns.docListener(keyContrlr, 'add', 'keydown');
}

// Highlight current selection displayed in main panel
const hlNavSelection = () => {
  const navItems = document.querySelectorAll('nav li');
  navItems.forEach(item => {
    if (item.classList.contains('highlight') && item.id !== data.navSelection) {
      item.classList.remove('highlight');
    }
  });

  document.getElementById(data.navSelection).classList.add('highlight');
}



// Minimize/expand nav panel
const toggleMenu = (e) => {
  if (e.type === 'click' || e.key === 'Enter') {
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
  } else if (e.key === 'Escape') {
    document.activeElement.blur();  
  }
}   

// Toggle between light/dark theme
const toggleTheme = (e) => {
  if (e.type === 'click' || e.key === 'Enter') {
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
  } else if (e.key === 'Escape') {
    document.activeElement.blur();  
  }
}



const managePageBtns = (e) => {  

  let form, action;

  if (e.target.parentElement.id === 'add-project') {
    action = 'add-project';
  } else if (e.target.parentElement.id === 'add-task') {
    action = 'add-task';
  } else {
    action = e.target.id;
  }

  if (
    action === 'add-project' || 
    action === 'submit-project' || 
    action === 'cancel-project'
  ) {
    form = document.querySelector('#projects-panel form');
  } else if (
    action === 'add-task' || 
    action === 'submit-task' || 
    action === 'cancel-task'
  ) {
    form = document.querySelector('main > form');
  } else {
    form = document.querySelector('#edit-task-form');
  }


  if (action === 'add-project' || action === 'add-task') {
    removeExtranForms(action);
    displayForm(form);
  } 
  
  else if (action === 'submit-edit') {
    let targetTask = e.target.closest('li').id;
    dataFns.editTaskProp(targetTask, 'all');
    setTaskList(dataFns.filterTasks(data.navSelection));
  } 
  
  else if (action === 'cancel-edit') {

    // let editForm = document.querySelector('#edit-task-form');
    // removeForm(editForm);

    removeForm(form);
  } 
  
  else { 

    if (action === 'submit-project') {
      let newProj = dataFns.createProj();
      setProjList(dataFns.initItem(newProj));
      hlNavSelection();
    } else if (action === 'submit-task') {
      let newTask = dataFns.createTask();
      setTaskList(dataFns.initItem(newTask));
    }

    removeForm(form);
  }
} 



const manageNavResponse = (e) => {

  const selection = e.target.closest('li');
  const mainPanel = document.querySelector('main');

  if (selection) {
    if (e.target.classList.contains('delete-icon')) {
      dataFns.deleteItem(selection.id);
      setProjList(data.projects);

      // Instead of using dataset, can compare to data.navSelection
      // Will need to see if one is more efficient
      if (selection.id === mainPanel.dataset.selected) {
        dataFns.saveNavSelection('all');
        setMainPanel();
      }

    } else {
      dataFns.saveNavSelection(selection.id);
      setMainPanel();
    }
    hlNavSelection();

    // tab focus
    // if (e.key) {
    //   document.getElementById(data.navSelection).focus(); 
      // document.getElementById('home-panel').focus(); 
    // }    
  } 

}




const manageTaskResponse = (e) => {
  let selection = e.target.closest('li');

  if (e.target.classList.contains('edit-icon')) {
    removeExtranForms();    
    let taskInfo = dataFns.returnTask(selection.id);
    displayForm(contentFns.createEditForm(taskInfo), selection);
    
    // listenerFns.addPageBtnListeners(managePageBtns, 'click');
  } else {

    if (
      e.target.classList.contains('checkbox') || 
      e.target.classList.contains('checked')
    ) {
      dataFns.editTaskProp(selection.id, 'completed');
    } 
    
    else if (e.target.classList.contains('important-icon')) {
      dataFns.editTaskProp(selection.id, 'important');
    } 
    
    else if (e.target.classList.contains('delete-icon')) {
      dataFns.deleteItem(selection.id);
      listenerFns.docListener(testForm, 'remove', 'keydown');
    } 

    else {
      // E.g., events within the edit form; handled by 
      return;
    }

    setTaskList(dataFns.filterTasks(data.navSelection));
  }
}




// const manageTaskResponse = (e) => {
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


//       removeExtranForms();    
//       let task = dataFns.returnTask(selection.id);
//       displayForm(contentFns.createEditForm(task), selection);
//       listenerFns.addPageBtnListeners(managePageBtns, 'click', 'keydown');


//       e.preventDefault();
//     } 

//   } else if (e.key === 'Escape') {
//     document.activeElement.blur();
//   }
// }



const keyContrlr = (e) => {

  if (e.key === 'Enter') {

    if (e.target.classList.contains('menu-icon')) {
      toggleMenu(e);
    }

    else if (e.target.classList.contains('theme-icon')) {
      toggleTheme(e);
    }

    else if (e.target.classList.contains('task-view') || e.target.classList.contains('project-item')) {
      manageNavResponse(e);
    }

    else if (e.target.nodeName === 'BUTTON') {
      managePageBtns(e);
      e.preventDefault();   
    }

    else if (e.target.classList.contains('delete-icon')) {

      if (e.target.parentElement.classList.contains('project-wrapper')) {
        manageNavResponse(e);
      } else {
        manageTaskResponse(e);
      }

    }

    else if (e.target.classList.contains('github')) {
      return;
    }

    else {
      manageTaskResponse(e);  
      e.preventDefault();
    }

  } 

  else if (e.key === 'Escape') {
    document.activeElement.blur();
  }

}


// keybrd cntrl of form
const testForm = (e) => {
  let form, action;

  if (e.target.parentElement.id === 'project-form') {
    form = e.target.parentElement;
    action = 'submit-project';
  } else if (
    e.target.parentElement.id === 'task-form' ||
    e.target.id === 'task-important-input'
  ) {
    form = document.querySelector('main > form');
    action = 'submit-task';
  } else {
    form = document.querySelector('#edit-task-form');
    action = 'submit-edit';
  }


  if (e.key === 'Enter') {

    if (
      !e.target.classList.contains('project-button') &&
      !e.target.classList.contains('task-button') &&
      !e.target.classList.contains('edit-button')
    ) {

      if (action === 'submit-edit') {
        let targetTask = e.target.closest('li').id;
        dataFns.editTaskProp(targetTask, 'all');
        setTaskList(dataFns.filterTasks(data.navSelection));
      } 
      
      else if (action === 'submit-project') {
        let newProj = dataFns.createProj();
        setProjList(dataFns.initItem(newProj));
        hlNavSelection();
      } 
      
      else if (action === 'submit-task') {
        let newTask = dataFns.createTask();
        setTaskList(dataFns.initItem(newTask));
      }

      removeForm(form);
    }

  } else if (e.key === 'Escape') {
    removeForm(form);
  }  
}



export {
  keyContrlr,

  setMainPanel,
  setProjList,
  toggleMenu,
  toggleTheme,
  hlNavSelection,
  managePageBtns,
  manageNavResponse,
  manageTaskResponse
}
