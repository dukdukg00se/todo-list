import data from './data.js';
import * as contentFns from './content-fns.js';
import * as listenerFns from './listener-fns';
import * as dataFns from './data-fns';




const setTasksList = (arr) => {
  display(arr);
  listenerFns.addTasksListListener('click', manageTaskResponse);
}
function displayTargetForm(form) {
  // Show selected form
  form.classList.remove('hidden');
  // Focus on first input box
  form.querySelector('input').focus();
  // Hide add button
  form.nextElementSibling.classList.add('hidden');

  // window.addEventListener('click', hideFormOnClick);
  listenerFns.docListener('add', 'click', hideFormOnClick);
}
function hideFormOnClick(e) {
  let isTaskBtn =
    e.target.classList.contains('task-button') ||
    e.target.parentElement.classList.contains('task-button');
  let isProjBtn =
    e.target.classList.contains('project-button') ||
    e.target.parentElement.classList.contains('project-button');
  let isForm = !!e.target.closest('form');
  let displayedForm;

  let pgForms = document.querySelectorAll('form');
  pgForms.forEach(form => {
    if (!form.classList.contains('hidden')) {
      displayedForm = form;
    }
  })

  if (!isTaskBtn && !isProjBtn && !isForm) {
    hideTargetForm(displayedForm);
  }
}
function hideTargetForm(form) {
  // Reset form
  form.reset();
  // Hide selected form
  form.classList.add('hidden');
  // Show add button
  form.nextElementSibling.classList.remove('hidden');

  // window.removeEventListener('click', hideFormOnClick);
  listenerFns.docListener('remove', 'click', hideFormOnClick);
}
function hideExtraneousForms(action) {
  const tasksListContainer = document.querySelector('#tasks-list-container');
  let editFormDisplayed = !!tasksListContainer.querySelector('form')
  let irrelForm;

  if (action === 'add-project') {
    // Task submission form
    irrelForm = document.querySelector('main > form');
  } else if (action === 'add-task') {
    // Proj submission form
    irrelForm = document.querySelector("#projects-panel form");
  } else { // action === 'show edit form'
    // If create task/proj form not hidden, set = irrelForm
    let pgForms = document.querySelectorAll('#projects-panel > form, main > form');
    pgForms.forEach(form => {
      if (!form.classList.contains('hidden')) {
        irrelForm = form;
      }
    })
  }

  if (irrelForm) {
    // If create task/proj form displayed, hide
    if (!irrelForm.classList.contains('hidden')) {
      irrelForm.classList.toggle('hidden');
      irrelForm.nextElementSibling.classList.toggle('hidden');
      // window.removeEventListener('click', hideFormOnClick);
      listenerFns.docListener('remove', 'click', hideFormOnClick);
    }
  }

  // If edit task form displayed, hide
  if (editFormDisplayed) {
    let editForm = tasksListContainer.querySelector('form');

    editForm.previousElementSibling.classList.toggle('hidden');
    editForm.remove();
  }
}
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
  
  return isProj;
}




const setMainPanel = () => {
  const mainPanel = document.querySelector('main');
  const mainHeader = document.querySelector('h1');
  const addTaskBtn = document.querySelector('main > button');
  let input = data.navSelection

  // Set selected data on main
  mainPanel.dataset.selected = input;

  // Set header
  switch (input) {
    case 'all':
      mainHeader.textContent = 'All Tasks';
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
        if (proj.id === input) {
          mainHeader.textContent = proj.name ? proj.name : 'No name entered';
        }
      })
  }

  // Control add task btn
  switch (input) {
    case 'all':
    case 'today':
    case 'week':
    case 'important':
      addTaskBtn.classList.add('hidden');
      break;
    default:
      addTaskBtn.classList.remove('hidden');
  }

  setTasksList(dataFns.filterTasks(input));

  // Filter tasks by input, display, add tasks listener
  // setTasksList(dataFns.filterTasks(input));
  // display(dataFns.filterTasks(input));
  // listenerFns.addTasksListListener('click', manageTaskResponse);
}

const setProjPanel = (arr) => {
  display(arr);
  listenerFns.addNavListListeners('click', manageNavResponse);
}

const hlNavSelection = () => {
  const navItems = document.querySelectorAll('nav li');
  navItems.forEach(item => {
    if (item.classList.contains('highlight') && item.id !== data.navSelection) {
      item.classList.remove('highlight');
    }
  });

  document.getElementById(data.navSelection).classList.add('highlight');
}

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
}

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
}

const managePageBtns = (e) => {
  let isProjBtn = e.currentTarget.classList.contains('project-button');
  let action = e.currentTarget.id;
  let form = isProjBtn
    ? document.querySelector('#projects-panel form')
    : document.querySelector('main > form');

  if (action === 'add-project' || action === 'add-task') {
    displayTargetForm(form);
    hideExtraneousForms(action);
  } else {

    if (action === 'submit-project') {
      setProjPanel(dataFns.initNewItem(action));
      hlNavSelection();
    } else if (action === 'submit-task') {
      setTasksList(dataFns.initNewItem(action));
    }

    hideTargetForm(form);
  }
}

const manageNavResponse = (e) => {
  const selection = e.target.closest('li');
  const mainPanel = document.querySelector('main');

  if (selection) {
    if (e.target.classList.contains('delete-icon')) {
      setProjPanel(dataFns.deleteItem(selection.id, data.projects));

      if (selection.id === mainPanel.dataset.selected) {
        dataFns.setNavSelection('all');
        setMainPanel();
      }

      hlNavSelection();
    } else {
      dataFns.setNavSelection(selection.id);
      setMainPanel();
      hlNavSelection();
    }
  }
}

const manageTaskResponse = (e) => {
  let selection = e.target.closest('li');
  let mainPanel = document.querySelector('main');
  let editForm = document.querySelector('#edit-task-form');
  let projects = data.projects;
  let wrapper, description, checkbox;

  if (selection) {
    wrapper = selection.querySelector('.task-wrapper');
    description = selection.querySelector('.task-descr-wrapper');
    checkbox = selection.querySelector('.checkbox');
  }

  projects.forEach(proj => {
    proj.tasks.forEach(task => {
      if (task.id === selection.id) {
        if (
          e.target.classList.contains('checkbox') || 
          e.target.classList.contains('checked')
        ) {
          task.completed ? (task.completed = false) : (task.completed = true);
          dataFns.popLocalStorage(projects);

          checkbox.classList.toggle('checked');
          selection.classList.toggle('completed');
          description.classList.toggle('crossed');
        }

        if (e.target.classList.contains('important-icon')) {
          task.important ? (task.important = false) : (task.important = true);
          dataFns.popLocalStorage(projects);

          e.target.classList.toggle('important');
        }

        if (e.target.classList.contains('edit-icon')) {
          hideExtraneousForms();
          selection.append(contentFns.createEditForm(task));
          wrapper.classList.toggle('hidden');
        }

        if (e.target.classList.contains('delete-icon')) {
          setTasksList(dataFns.deleteItem(task.id, proj.tasks))
        }


        if (e.target.id === 'cancel-edit') {
          editForm.previousElementSibling.classList.toggle('hidden');
          editForm.remove();
        } else if (e.target.id === 'submit-edit') {
          task.name = document.querySelector('#edit-name-input').value;
          task.details = document.querySelector('#edit-details-input').value;
          task.due = document.querySelector('#edit-date-input').value;
          task.important = document.querySelector('#edit-important-input').checked;
          dataFns.popLocalStorage(projects);

          setTasksList(dataFns.filterTasks(mainPanel.dataset.selected));
        }
      }
    })
  })
}


export {
  setMainPanel,
  setProjPanel,
  toggleMenu,
  toggleTheme,
  hlNavSelection,
  managePageBtns,
  manageNavResponse,
  manageTaskResponse
}

// const managePageBtns = (e) => {
//   let isProjBtn = e.currentTarget.classList.contains('project-button');
//   let action = e.currentTarget.id;
//   let form = isProjBtn
//     ? document.querySelector('#projects-panel form')
//     : document.querySelector('main > form');

//   if (action === 'add-project' || action === 'add-task') {
//     displayTargetForm(form);
//     hideExtraneousForms(action);
//   }

//   if (action === 'cancel-project' || action === 'cancel-task') {
//     hideTargetForm(form);
//   }

//   if (action === 'submit-project' || action === 'submit-task') {
//     // setMain or setTasksList?


//     display(data.initNewItem(action));


//     if (action === 'submit-project') {
//       highlight(data.navSelection);
//       listenersController.addNavListsListeners();

//     } else {
//       listenersController.addTasksListListener();
//     }

//     hideTargetForm(form);
//   }
// }

// const manageNavResponse = (e) => {
//   const selection = e.target.closest('li');
//   const mainPanel = document.querySelector('main');

//   // If a home option/proj clicked
//   if (selection) {
//     // If click is on a delete icon
//     if (e.target.classList.contains('delete-icon')) {

//       display(dataFns.deleteItem(selection.id, data.projects))
//       listenerFns.addNavListListeners('click', manageNavResponse);

//       // If deleted item was displayed in main, display 'All' tasks
//       if (selection.id === mainPanel.dataset.selected) {

//         data.navSelection = 'all';
//         dataFns.popLocalStorage(data.navSelection);

//         setMainPanel(data.navSelection);

//         // display(data.filterTasks(selection));
//         // Add task listener here
//       }

//       highlight(data.navSelection);

//     } else {

//       data.navSelection = selection.id;
//       dataFns.popLocalStorage(data.navSelection);

//       setMainPanel(selection.id);

//       // display(dataFns.filterTasks(selection.id));
//       // listenerFns.addTasksListListener('click', manageTaskResponse);

//       // Move highlight to own module??
//       highlight(selection.id);
//     }
//   }
// }

// const manageTaskResponse = (e) => {
//   let selection = e.target.closest('li');
//   let mainPanel = document.querySelector('main');
//   let currentProjects = data.projects;
//   let wrapper, description, checkbox;

//   // Move to below; cancel/submit edit
//   let editForm = document.querySelector('#edit-task-form');



//   if (selection) {
//     wrapper = selection.querySelector('.task-wrapper');
//     description = selection.querySelector('.task-descr-wrapper');
//     checkbox = selection.querySelector('.checkbox');
//   }

//   for (let i = 0; i < currentProjects.length; i++) {
//     for (let j = 0; j < currentProjects[i].tasks.length; j++) {

//       if (currentProjects[i].tasks[j].id === selection.id) {
//         let task = currentProjects[i].tasks[j];

//         if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

//           (task.completed) ? task.completed = false : task.completed = true;
//           data.popLocalStorage(currentProjects);

//           checkbox.classList.toggle('checked');
//           selection.classList.toggle('completed');
//           description.classList.toggle('crossed');

//         }

//         if (e.target.classList.contains('important-icon')) {

//           (task.important) ? task.important = false : task.important = true;
//           dataController.populateLocalStorage(currentProjects);

//           e.target.classList.toggle('important');

//         }

//         if (e.target.classList.contains('edit-icon')) {
//           hideExtraneousForms();

//           selection.append(content.createEditForm(task));
//           wrapper.classList.toggle('hidden');

//         }

//         if (e.target.classList.contains('delete-icon')) {
//           data.projects[i].tasks.splice(j, 1);
//           data.popLocalStorage(currentProjects);


//           // let container = data.projects[i].tasks
//           // let itemToDelete = task.id
//           // deleteItem(itemToDelete, container) unnecessary?????
//           // display(deleteItem(itemToDelete, container)) works?????
//           // AddListener
//           // or just...
//           // setTasksList()

//           display(dataFns.filterTasks(mainPanel.dataset.selected))
//           listenerFns.addTasksListListener('click', manageTaskResponse);
//         }


//         if (e.target.id === 'cancel-edit') {
//           editForm.previousElementSibling.classList.toggle('hidden');
//           editForm.remove();

//         } else if (e.target.id === 'submit-edit') {
//           task.name = document.querySelector('#edit-name-input').value;
//           task.details = document.querySelector('#edit-details-input').value;
//           task.due = document.querySelector('#edit-date-input').value;
//           task.important = document.querySelector('#edit-important-input').checked;

//           data.popLocalStorage(currentProjects);



//           display(data.filterTasks(mainPanel.dataset.selected))
//           listenerFns.addTasksListListener('click', manageTaskResponse);
//         }

//       }
//     }
//   }
// }

// const manageTaskResponse = (e) => {
//   let selection = e.target.closest('li');
//   let mainPanel = document.querySelector('main');
//   let currentProjects = data.projects;
//   let wrapper, description, checkbox;

//   // Move to below; cancel/submit edit
//   let editForm = document.querySelector('#edit-task-form');



//   if (selection) {
//     wrapper = selection.querySelector('.task-wrapper');
//     description = selection.querySelector('.task-descr-wrapper');
//     checkbox = selection.querySelector('.checkbox');
//   }

//   for (let i = 0; i < currentProjects.length; i++) {
//     for (let j = 0; j < currentProjects[i].tasks.length; j++) {

//       if (currentProjects[i].tasks[j].id === selection.id) {
//         let task = currentProjects[i].tasks[j];

//         if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

//           (task.completed) ? task.completed = false : task.completed = true;
//           dataFns.popLocalStorage(currentProjects);

//           checkbox.classList.toggle('checked');
//           selection.classList.toggle('completed');
//           description.classList.toggle('crossed');

//         }

//         if (e.target.classList.contains('important-icon')) {

//           (task.important) ? task.important = false : task.important = true;
//           dataFns.popLocalStorage(currentProjects);

//           e.target.classList.toggle('important');

//         }

//         if (e.target.classList.contains('edit-icon')) {
//           hideExtraneousForms();

//           selection.append(content.createEditForm(task));
//           wrapper.classList.toggle('hidden');

//         }

//         if (e.target.classList.contains('delete-icon')) {
//           data.projects[i].tasks.splice(j, 1);
//           dataFns.popLocalStorage(currentProjects);


//           // let container = data.projects[i].tasks
//           // let itemToDelete = task.id
//           // deleteItem(itemToDelete, container) unnecessary?????
//           // display(deleteItem(itemToDelete, container)) works?????
//           // AddListener
//           // or just...
//           // setTasksList()

//           display(dataFns.filterTasks(mainPanel.dataset.selected))
//           listenerFns.addTasksListListener('click', manageTaskResponse);
//         }


//         if (e.target.id === 'cancel-edit') {
//           editForm.previousElementSibling.classList.toggle('hidden');
//           editForm.remove();

//         } else if (e.target.id === 'submit-edit') {
//           task.name = document.querySelector('#edit-name-input').value;
//           task.details = document.querySelector('#edit-details-input').value;
//           task.due = document.querySelector('#edit-date-input').value;
//           task.important = document.querySelector('#edit-important-input').checked;

//           data.popLocalStorage(currentProjects);



//           display(dataFns.filterTasks(mainPanel.dataset.selected))
//           listenerFns.addTasksListListener('click', manageTaskResponse);
//         }

//       }
//     }
//   }
// }
