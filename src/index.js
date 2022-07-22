import {
  getDay,
  isThisWeek,
  isToday,
  parseISO
} from "date-fns";
import content from './modules/content.js';


const dataController = (() => {
  let currentProjects = !JSON.parse(localStorage.getItem('projects')) 
    ? [] 
    : JSON.parse(localStorage.getItem('projects'));

  let currentNavSelection = !localStorage.getItem('display')
    ? 'all' 
    : localStorage.getItem('display'); 


  // const updateData = (input) => {
  //   let container;

  //   if (input === 'submit-project' || input === 'submit-task') {
  //     let item, idPrefix;

  //     if (input === 'submit-project') {
  //       const projName = document.querySelector("#project-name-input").value;
  //       item = new Project(projName);
  //       container = dataController.currentProjects;
  //       idPrefix = 'project-'
  //     } else if (input === 'submit-task') {
  //       const taskName = document.querySelector('#task-name-input').value;
  //       const taskDetails = document.querySelector('#task-details-input').value;
  //       const taskDue = document.querySelector('#task-date-input').value;
  //       const taskImportant = document.querySelector('#task-important-input').checked;
  //       let selectedProject = mainPanel.dataset.selected;
    
  //       item = new Task(taskName, taskDetails, taskDue, taskImportant)
    
  //       dataController.currentProjects.forEach(proj => {
  //         if (proj.id === selectedProject) {
  //           container = proj.tasks;
  //           idPrefix = `${proj.id}-task-`;
  //         }
  //       })
  //     }

  //     add(item, container);
  //     setId(idPrefix, container);

  //   } else { // Delete action

  //     container = dataController.currentProjects;
  //     remove(input, container);

  //   }

  //   populateLocalStorage(currentProjects);

  //   return container;
  // }
  const initNewItem = (input) => {
    let item, container, idPrefix;
  
    if (input === 'submit-project') {
      const projName = document.querySelector("#project-name-input").value;
      item = new Project(projName);
      container = dataController.currentProjects;
      idPrefix = 'project-'
    } else if (input === 'submit-task') {
      const taskName = document.querySelector('#task-name-input').value;
      const taskDetails = document.querySelector('#task-details-input').value;
      const taskDue = document.querySelector('#task-date-input').value;
      const taskImportant = document.querySelector('#task-important-input').checked;
      let selectedProject = document.querySelector('main').dataset.selected;
      item = new Task(taskName, taskDetails, taskDue, taskImportant)
  
      dataController.currentProjects.forEach(proj => {
        if (proj.id === selectedProject) {
          container = proj.tasks;
          idPrefix = `${proj.id}-task-`;
        }
      })
    }
  
    add(item, container);
    setId(idPrefix, container);
    populateLocalStorage(currentProjects);
  
    return container;
  }
  const deleteItem = (item, container) => {
    remove(item, container);
    populateLocalStorage(currentProjects);
  
    return container;
  }


  const filterTasks = (filter) => {
    let filteredTasks = [];
  
    switch (filter) {
      case 'all':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            filteredTasks.push(task);
          });
        });
        break;
      case 'today':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (isToday(parseISO(task.due))) {
              filteredTasks.push(task);
            }
          });
        });
        break;
      case 'week':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (task.due) {
              if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                filteredTasks.push(task);
              }
            }
          });
        });
        break;
      case 'important':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (task.important) {
              filteredTasks.push(task);
            }
          });
        });
        break;
      default:
        currentProjects.forEach(proj => {
          if (proj.id === filter) {
            filteredTasks = proj.tasks;
          }
        })
    }
  
    return filteredTasks;
  }

  const populateLocalStorage = (input) => {

    if (typeof input === 'object') {
      localStorage.setItem('projects', JSON.stringify(input));
    } else {
      localStorage.setItem('display', input);
    }
    
  };


  // Delete???
  const setNavSelection = (input) => {
    currentNavSelection = input;
    populateLocalStorage(input);
    console.log(currentNavSelection);
  }


  /* Object constructors */
  function Project(name) {
    this.name = name;
    this.tasks = [];
  }

  function Task(name, details, due, important) {
    this.name = name;
    this.details = details;
    this.due = due;
    this.important = important;
    this.completed = false;
  }

  /* Helper functions */
  // Add task/proj items
  const add = (obj, arr) => {
    arr.push(obj);
  }

  // Delete task/proj items
  const remove = (objId, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === objId) {
        arr.splice(i, 1);
      }
    }
  }

  // Set task/proj id's after adding to list
  const setId = (prefix, arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].id = prefix + i;
    }
  }

  return {
    currentProjects,
    currentNavSelection,
    // updateData,
    initNewItem,
    deleteItem,
    filterTasks,
    populateLocalStorage,
    // setNavSelection
  }
})();



const displayController = (() => {
  // Set initial display to "All"
  function ctrlAddTaskBtn(input) {
    const addTaskBtn = document.querySelector('main > button');

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
  }
  // Highlight displayed nav selection 
  let highlighted;
  function highlight(item) {
    if (highlighted) {
      highlighted.classList.remove('highlight');
    }

    highlighted = item;
    highlighted.classList.add('highlight');
  }

  let selection = dataController.currentNavSelection;
  setMainHeader(selection);
  document.querySelector('main').dataset.selected = selection;
  display(dataController.filterTasks(selection));
  ctrlAddTaskBtn(selection);
  // After moving listenerController below
  // Need to add task list listener

  display(dataController.currentProjects);
  highlight(document.getElementById(selection)); 
  // Need to add proj list listener

  // Need to add rest of page listeners





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


  // Excludes task edit form btns
  const managePageBtns = (e) => {
    let isProjBtn = e.currentTarget.classList.contains('project-button');
    let action = e.currentTarget.id;
    let form = isProjBtn 
      ? document.querySelector('#projects-panel form')
      : document.querySelector('main > form');
  
    if (action === 'add-project' || action === 'add-task') {
      hideExtraneousForms(action);
      displayTargetForm(form);
    }
  
    if (action === 'cancel-project' || action === 'cancel-task') {
      hideTargetForm(form);

    }
  
    if (action === 'submit-project' || action === 'submit-task') {
      display(dataController.initNewItem(action));
      hideTargetForm(form);


      if (action === 'submit-project') {
        let elem = document.getElementById(dataController.currentNavSelection);
        highlight(elem);
        listenersController.addNavListsListeners();
      } else {
        listenersController.addTasksListListener();
      }

    }
  }

  const manageNavResponse = (e) => {
    const selection = e.target.closest('li');
    const addTaskBtn = document.querySelector('main > button');
    const mainPanel = document.querySelector('main');

    // If a home option/proj clicked
    if (selection) { 
      // If click is on a delete icon
      if (e.target.classList.contains('delete-icon')) {        
        // Remove item, redisplay + add listener to container list
        display(dataController.deleteItem(selection.id, dataController.currentProjects))
        listenersController.addNavListsListeners();

        // If deleted item was displayed in main, display 'All' tasks
        if (selection.id === mainPanel.dataset.selected) {

          dataController.currentNavSelection = 'all';
          dataController.populateLocalStorage(dataController.currentNavSelection);

          let selection = dataController.currentNavSelection;
          setMainHeader(selection);
          display(dataController.filterTasks(selection));
          addTaskBtn.classList.add('hidden');
          // Add task listener here
        } 

        highlight(document.getElementById(dataController.currentNavSelection)); 

      } else {

        dataController.currentNavSelection = selection.id;
        dataController.populateLocalStorage(selection.id);

        mainPanel.dataset.selected = selection.id;
        (e.target.closest('ul').id === 'home-list') ? addTaskBtn.classList.add('hidden') : addTaskBtn.classList.remove('hidden');
        setMainHeader(selection.id);
        highlight(selection);
        display(dataController.filterTasks(selection.id));
        listenersController.addTasksListListener();  

      }
    }
  }

  const manageTaskResponse = (e) => {
    let editForm = document.querySelector('#edit-task-form');
    let listItem = e.target.closest('li');
    let mainPanel = document.querySelector('main');
    let currentProjs = dataController.currentProjects;
    let selection;
    let wrapper;
    let description;
    let checkbox;
  
    if (listItem) {
      selection = listItem.id;
      wrapper = listItem.querySelector('.task-wrapper');
      description = listItem.querySelector('.task-descr-wrapper');
      checkbox = listItem.querySelector('.checkbox');
    }
  
    for (let i = 0; i < currentProjs.length; i++) {
      for (let j = 0; j < currentProjs[i].tasks.length; j++) {

        if (currentProjs[i].tasks[j].id === selection) {
          let task = currentProjs[i].tasks[j];
  
          if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

            console.log(dataController.currentProjects);
  
            (task.completed) ? task.completed = false : task.completed = true;
            dataController.populateLocalStorage(dataController.currentProjects);
  
            console.log(dataController.currentProjects);

            checkbox.classList.toggle('checked');
            listItem.classList.toggle('completed');
            description.classList.toggle('crossed');
  
          }  
          
          if (e.target.classList.contains('important-icon')) {
  
            (task.important) ? task.important = false : task.important = true; 
            dataController.populateLocalStorage(dataController.currentProjects);
  

  
            e.target.classList.toggle('important');
  
          } 
          
          if (e.target.classList.contains('edit-icon')) {
            hideExtraneousForms();

            listItem.append(content.createEditForm(task));
            wrapper.classList.toggle('hidden');
  
          } 
          
          if (e.target.classList.contains('delete-icon')) {
            dataController.currentProjects[i].tasks.splice(j, 1);
            dataController.populateLocalStorage(dataController.currentProjects);

            display(dataController.filterTasks(mainPanel.dataset.selected))
            listenersController.addTasksListListener();
          }
  




          if (e.target.id === 'cancel-edit') {
            editForm.previousElementSibling.classList.toggle('hidden');
            editForm.remove();
  
          } else if (e.target.id === 'submit-edit') {
            task.name = document.querySelector('#edit-name-input').value;
            task.details = document.querySelector('#edit-details-input').value;
            task.due = document.querySelector('#edit-date-input').value;
            task.important = document.querySelector('#edit-important-input').checked;
    
            dataController.populateLocalStorage(dataController.currentProjects);
            display(dataController.filterTasks(mainPanel.dataset.selected))
            listenersController.addTasksListListener();
          }
  
        }
      }
    }
  }


  /* Helper functions: */


  // Create item and add to appropriate list
  function display (data) {
    let oldList, listId, container;
    let isProj = (data === dataController.currentProjects);
  
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
    data.forEach(item => { 
      newList.append(
        isProj ? content.createProject(item) : content.createTask(item)
      );
    })
  
    container.append(newList);
  }
  
  // Set main h1 text 
  function setMainHeader(input) {
    const mainHeader = document.querySelector('h1');

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
      dataController.currentProjects.forEach(proj => {
        if (proj.id === input) {
          mainHeader.textContent = proj.name;
        }
      })
    }
  }

  // Show correct form (either proj or task)
  function displayTargetForm(form) {
    // Show selected form
    form.classList.remove('hidden');
    // Focus on first input box
    form.querySelector('input').focus();
    // Hide add button
    form.nextElementSibling.classList.add('hidden');

    window.addEventListener('click', hideFormOnClick);

  }

  function hideFormOnClick(e) {

    let isTaskBtn = 
      e.target.classList.contains('task-button') || 
      e.target.parentElement.classList.contains('task-button');
    let isProjBtn = 
      e.target.classList.contains('project-button') || 
      e.target.parentElement.classList.contains('project-button');
    let isForm = !!e.target.closest('form');
    let displayed;

    let pgForms = document.querySelectorAll('form');
    pgForms.forEach(form => {
      if (!form.classList.contains('hidden')) {
        displayed = form;
      }
    })

    if (!isTaskBtn && !isProjBtn && !isForm) {
      hideTargetForm(displayed);
    }
  }




  // Hide input form
  function hideTargetForm(form) {
    // Reset form
    form.reset();
    // Hide selected form
    form.classList.add('hidden');
    // Show add button
    form.nextElementSibling.classList.remove('hidden');


    window.removeEventListener('click', hideFormOnClick);
  }

  // Hide/remove irrelevant forms 
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
      let pageForms = document.querySelectorAll('#projects-panel > form, main > form');

      pageForms.forEach(form => {
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
        window.removeEventListener('click', hideFormOnClick);
      }
    }
  
    // If edit task form displayed, hide
    if (editFormDisplayed) {
      let editForm = tasksListContainer.querySelector('form');
  
      editForm.previousElementSibling.classList.toggle('hidden');
      editForm.remove();
    }
  }


  return {
    toggleMenu, 
    toggleTheme,
    managePageBtns,
    manageNavResponse,
    manageTaskResponse
  }
})();



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




  addMenuToggListener();
  addThemeToggListener();
  // Only on task views on start
  addNavListsListeners(); 
  addTasksListListener();
  addPageBtnListeners();

  return {
    addMenuToggListener,
    addThemeToggListener,
    addNavListsListeners,
    addTasksListListener,
    addPageBtnListeners
  }
})();

