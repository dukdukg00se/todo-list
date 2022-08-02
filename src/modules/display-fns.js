import data from './data.js';
import * as contentFns from './content-fns.js';
import * as listenerFns from './listener-fns';
import * as dataFns from './data-fns';


// Show form, focus on first input, add listener to run hideFormOnClick
// Determine if add proj/task btn displayed
function displayForm(form) {
  form.classList.remove('hidden');
  form.querySelector('input').focus();

  // Hide add proj/task button when displaying form
  form.nextElementSibling.classList.add('hidden');

  listenerFns.docListener('add', 'click', hideFormOnClick);
}

// Reset, hide form, remove listener
// Determine if add proj/task btn displayed
function hideForm(form) {
  form.reset();
  form.classList.add('hidden');

  // Add proj/task btn control
  // Show add proj btn on proj form hide
  // Show add task btn on task form hide when a proj is displayed
  // Otherwise keep add task btn hidden
  if (form.id === 'project-form' || /project-/.test(data.navSelection)) {
    form.nextElementSibling.classList.remove('hidden');
  } 

  listenerFns.docListener('remove', 'click', hideFormOnClick);
}

// Hide displayed add proj/task form when clicking outside form
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

  // If not a proj/task btn or form evnt, then hide form
  if (!isTaskBtn && !isProjBtn && !isForm) {
    hideForm(displayedForm);
  }
}

// Makes sure only one form is displayed
function hideExtranForms(action) {
  const tasksListContainer = document.querySelector('#tasks-list-container');
  let editFormDisplayed = !!tasksListContainer.querySelector('form')
  let irrelForm;

  // Check if add proj/task submission form displayed
  if (action === 'add-project') {
    // Irrelevant form = task submission form
    irrelForm = document.querySelector('main > form');
  } else if (action === 'add-task') {
    // irrelForm = proj submission form
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
    // If create task/proj form displayed, hide
    if (!irrelForm.classList.contains('hidden')) {
      hideForm(irrelForm);
    }
  }


  // Check if edit task form displayed
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



// Set main header, dataset, control add task btn, display selected tasks
const setMainPanel = () => {
  const mainPanel = document.querySelector('main');
  const mainHeader = document.querySelector('h1');
  const addTaskBtn = document.querySelector('main > button');
  let selection = data.navSelection

  mainPanel.dataset.selected = selection;

  switch (selection) {
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
        if (proj.id === selection) {
          mainHeader.textContent = proj.name ? proj.name : 'No name entered';
        }
      })
  }

  // Determine whether add task btn is displayed
  // If selection is a proj then display add task btn
  /project-/.test(selection) 
    ? addTaskBtn.classList.remove('hidden')
    : addTaskBtn.classList.add('hidden');

  setTasksList(dataFns.filterTasks(selection));

}


const setProjList = (arr) => {
  display(arr);
  listenerFns.addNavListListeners('click', manageNavResponse);
}


const setTasksList = (arr) => {
  display(arr);
  listenerFns.addTasksListListener('click', manageTaskResponse);
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
    hideExtranForms(action);
    displayForm(form);

  } else {

    if (action === 'submit-project') {
      let newProj = dataFns.createProj();
      setProjList(dataFns.initItem(newProj));
      hlNavSelection();
    } else if (action === 'submit-task') {
      let newTask = dataFns.createTask();
      setTasksList(dataFns.initItem(newTask));
    }

    hideForm(form);
  }
}


const manageNavResponse = (e) => {
  const selection = e.target.closest('li');
  const mainPanel = document.querySelector('main');

  if (selection) {
    if (e.target.classList.contains('delete-icon')) {
      dataFns.deleteItem(selection.id);
      setProjList(data.projects);


      if (selection.id === mainPanel.dataset.selected) {
        dataFns.saveNavSelection('all');
        setMainPanel();
      }

      hlNavSelection();
    } else {
      dataFns.saveNavSelection(selection.id);
      setMainPanel();
      hlNavSelection();
    }
  }
}

const manageTaskResponse = (e) => {
  let selection = e.target.closest('li');
  let mainPanel = document.querySelector('main');

  if (
    e.target.classList.contains('checkbox') || 
    e.target.classList.contains('checked')
  ) {
    dataFns.editTaskProp(selection.id, 'completed');

    let checkbox = selection.querySelector('.checkbox');
    let description = selection.querySelector('.task-descr-wrapper');
    checkbox.classList.toggle('checked');
    description.classList.toggle('crossed');
    selection.classList.toggle('completed');
  } else if (e.target.classList.contains('important-icon')) {
    dataFns.editTaskProp(selection.id, 'important');

    e.target.classList.toggle('important');
  } else if (e.target.classList.contains('edit-icon')) {
    hideExtranForms();

    let wrapper = selection.querySelector('.task-wrapper');
    let task = dataFns.returnTask(selection.id);
    wrapper.classList.toggle('hidden');
    selection.append(contentFns.createEditForm(task));
  } else if (e.target.classList.contains('delete-icon')) {
    dataFns.deleteItem(selection.id);

    setTasksList(dataFns.filterTasks(data.navSelection));
  } else if (e.target.id === 'cancel-edit') {
    let editForm = document.querySelector('#edit-task-form');
    editForm.previousElementSibling.classList.toggle('hidden');
    editForm.remove();
  } else if (e.target.id === 'submit-edit') {
    dataFns.editTaskProp(selection.id, 'all');
    
    setTasksList(dataFns.filterTasks(mainPanel.dataset.selected));
  }
}

export {
  setMainPanel,
  setProjList,
  toggleMenu,
  toggleTheme,
  hlNavSelection,
  managePageBtns,
  manageNavResponse,
  manageTaskResponse
}
