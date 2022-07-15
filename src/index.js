import {
  getDay,
  isThisWeek,
  isToday,
  parseISO
} from "date-fns";

// Varaiables. Move later
const projectsListContainer = document.querySelector('#projects-list-container');
const mainPanel = document.querySelector('main');
const mainHeader = document.querySelector('h1');
const tasksListContainer = document.querySelector('#tasks-list-container');
const projectForm = document.querySelector("#projects-panel form");
const addProjectButton = document.querySelector("#add-project");
const taskForm = document.querySelector('main > form');
const addTaskButton = document.querySelector('main > button');


const dataController = (() => {
  let currentProjects = !localStorage.length ? [] : JSON.parse(localStorage.getItem("projects"));

  // Maybe move this to displayController for default startup
  let highlightedNavItem;

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

  const addItem = (obj, arr) => {
    arr.push(obj);
  }
  const removeItem = (objId, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === objId) {
        arr.splice(i, 1);
      }
    }
  }
  const setItemId = (prefix, arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].id = prefix + i;
    }
  }
  const populateLocalStorage = (arr) => {
    localStorage.setItem('projects', JSON.stringify(arr));
  };

  const updateData = (input) => {

    if (input === 'submit-project' || input === 'submit-task') {
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
        let selectedProject = mainPanel.dataset.selected;
    
        item = new Task(taskName, taskDetails, taskDue, taskImportant)
    
        dataController.currentProjects.forEach(proj => {
          if (proj.id === selectedProject) {
            container = proj.tasks;
            idPrefix = `${proj.id}-task-`;
          }
        })
      }

      addItem(item, container);
      setItemId(idPrefix, container);

    } else { // Delete action
      removeItem(input, dataController.currentProjects);
    }

    populateLocalStorage(currentProjects);
  }


  const filterTasks = (filter) => {
    let filteredTasks = [];
  
    switch (filter) {
      case 'all':
        dataController.currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            filteredTasks.push(task);
          });
        });
        break;
      case 'today':
        dataController.currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (isToday(parseISO(task.due))) {
              filteredTasks.push(task);
            }
          });
        });
        break;
      case 'week':
        dataController.currentProjects.forEach(proj => {
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
        dataController.currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (task.important) {
              filteredTasks.push(task);
            }
          });
        });
        break;
      default:
        dataController.currentProjects.forEach(proj => {
          if (proj.id === filter) {
            filteredTasks = proj.tasks;
          }
        })
    }
  
    return filteredTasks;
  }

  return {
    currentProjects,
    highlightedNavItem,
    updateData,
    filterTasks
  }
})();

const contentCreator = (() => {

  const createProject = (projObj) => {
    const projectListItem = document.createElement('li');
    const projectWrapper = document.createElement('div');
    const projectIcon = document.createElement('span');
    const projectTitle = document.createElement('h3');
    const deleteIcon = document.createElement('span');
    
    projectListItem.classList.add('project-item');
    projectListItem.id = projObj.id;
    projectWrapper.classList.add('project-wrapper');
    projectIcon.classList.add('material-symbols-rounded', 'decor-icon');
    projectIcon.textContent = 'tools_power_drill';
    projectTitle.textContent = projObj.name
    deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
    deleteIcon.textContent = 'delete';
  
    projectWrapper.append(projectIcon, projectTitle, deleteIcon);
    projectListItem.append(projectWrapper);
    return projectListItem;
  };
  
  const createTask = (taskObj) => {
    const taskListItem = document.createElement('li');
    const taskWrapper = document.createElement('div');
    const taskSubWrapper = document.createElement('div');
    const checkbox = document.createElement('div');
    const taskDescrWrapper = document.createElement('div');
    const taskName = document.createElement('h3');
    const taskDetails = document.createElement('p');  
    const taskEditWrapper = document.createElement('div');
    const taskDueDate = document.createElement('span');
    const taskImportantIcon = document.createElement('span');
    const editIcon = document.createElement('span');
  
    taskListItem.classList.add('task-item');
    taskListItem.id = taskObj.id;
    taskWrapper.classList.add('task-wrapper');
    taskSubWrapper.classList.add('task-sub-wrapper');
    checkbox.classList.add('checkbox');
    taskDescrWrapper.classList.add('task-descr-wrapper');
    taskName.textContent = taskObj.name;
    taskDetails.textContent = taskObj.details;
    taskEditWrapper.classList.add('task-edit-wrapper');
    taskDueDate.classList.add('task-due-date');
    taskImportantIcon.classList.add('material-symbols-rounded', 'important-icon');
    taskImportantIcon.textContent = 'flag';
    editIcon.classList.add('material-symbols-rounded', 'edit-icon');
    editIcon.textContent = 'more_vert';
    
    if (taskObj.completed) {
      checkbox.classList.add('checked');
      taskListItem.classList.add('completed');
      taskDescrWrapper.classList.add('crossed');
    }
    if (taskObj.due) {
      taskDueDate.textContent = taskObj.due;
    } else {
      taskDueDate.textContent = 'No due date';
    }
    if (taskObj.important) {
      taskImportantIcon.classList.add('important');
    }
  
    taskEditWrapper.append(taskDueDate, taskImportantIcon, editIcon);
    taskDescrWrapper.append(taskName, taskDetails);
    taskSubWrapper.append(checkbox, taskDescrWrapper);
    taskWrapper.append(taskSubWrapper, taskEditWrapper);
    taskListItem.append(taskWrapper);
    return taskListItem;
  }
  
  const createEditForm = (task) => {
    const form = document.createElement("form");
    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const detailsLabel = document.createElement("label");
    const detailsInput = document.createElement("textarea");
    const dateLabel = document.createElement("label");
    const dateInput = document.createElement("input");
    const formSubContainer = document.createElement('div');
    const importantLabel = document.createElement("label");
    const importantInput = document.createElement("input");
    const deleteWrapper = document.createElement('div');
    const deleteIcon = document.createElement('span');
    const btnContainer = document.createElement("div");
    const submitBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
  
    form.id = 'edit-task-form';
    nameLabel.htmlFor = "edit-name-input";
    nameLabel.textContent = "Task name:";
    nameInput.id = "edit-name-input";
    nameInput.type = "text";
    nameInput.placeholder = "Get Dinner";
    detailsLabel.htmlFor = "edit-details-input";
    detailsLabel.textContent = "Details:";
    detailsInput.id = "edit-details-input";
    detailsInput.rows = "5";
    detailsInput.cols = "30";
    detailsInput.wrap = "hard";
    detailsInput.placeholder = "Taco Bell";
    dateLabel.htmlFor = "edit-date-input";
    dateLabel.textContent = "Date due:";
    dateInput.id = "edit-date-input";
    dateInput.type = "Date";
    importantLabel.htmlFor = "edit-important-input";
    importantLabel.textContent = "Important:";
    importantInput.id = "edit-important-input";
    importantInput.type = "checkbox";
    deleteWrapper.textContent = 'Delete:';
    deleteWrapper.classList.add('delete-wrapper');
    deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
    deleteIcon.textContent = 'delete';
    submitBtn.classList.add("task-button");
    submitBtn.id = "submit-edit";
    submitBtn.textContent = "Submit";
    submitBtn.type = "button";
    cancelBtn.classList.add("task-button");
    cancelBtn.id = "cancel-edit";
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
  
    nameInput.value = task.name;
    detailsInput.value = task.details;
    dateInput.value = task.due;
    importantInput.checked = task.important;
  
    importantLabel.append(importantInput);
    deleteWrapper.append(deleteIcon);
    formSubContainer.append(importantLabel, deleteWrapper);
    btnContainer.append(submitBtn, cancelBtn);
    form.append(
      nameLabel,
      nameInput,
      detailsLabel,
      detailsInput,
      dateLabel,
      dateInput,
      formSubContainer,
      btnContainer
    );
  
    return form;
  };

  return {
    createProject,
    createTask,
    createEditForm
  }
})();

const displayController = ((e) => {



  // Helper function: create item and add to appropriate list
  const display = (list, isProject = true) => {
    let oldList, listId, container;
  
    if (isProject) {
      container = projectsListContainer;
      oldList = document.querySelector('#projects-list');
      listId = 'projects-list';
    } else {
      container = tasksListContainer;
      oldList = document.querySelector('#tasks-list');
      listId = 'tasks-list';
    }
  
    if (container.contains(oldList)) {
      oldList.remove();
    }
  
    const currentList = document.createElement('ul');
    currentList.id = listId;
    list.forEach(item => { 
      currentList.append(
        isProject ? contentCreator.createProject(item) : contentCreator.createTask(item)
      );
    })
  
    container.append(currentList);
  }




  const setMainHeader = (input) => {
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

  const controlForm = (e) => {
    let isProjBtn = e.currentTarget.classList.contains('project-button');
    let action = e.currentTarget.id;
    let form;

    // Form helper functions
    const displayTargetForm = (form) => {
      // Show selected form
      form.classList.remove('hidden');
      // Focus on first input box
      form.querySelector('input').focus();
      // Hide add button
      form.nextElementSibling.classList.add('hidden');
    }
    const hideTargetForm = (form) => {
      // Reset form
      form.reset();
      // Hide selected form
      form.classList.add('hidden');
      // SHow add button
      form.nextElementSibling.classList.remove('hidden');
    }
    const hideExtraneousForms = (action) => {
      const tasksListContainer = document.querySelector('#tasks-list-container');
      let editFormDisplayed = !!tasksListContainer.querySelector('form')
      let irrelForm;
    
    
      if (action === 'add-project') {
        // Task submission form
        irrelForm = document.querySelector('main > form');
      } else if (action === 'add-task') {
        // Proj submission form
        irrelForm = document.querySelector("#projects-panel form");
      }
    
      // If task/proj submission form displayed, hide
      if (!irrelForm.classList.contains('hidden')) {
        irrelForm.classList.toggle('hidden');
        irrelForm.nextElementSibling.classList.toggle('hidden');
      }
    
      // If task edit form displayed, hide
      if (editFormDisplayed) {
        let editForm = tasksListContainer.querySelector('form');
    
        editForm.previousElementSibling.classList.toggle('hidden');
        editForm.remove();
      }
    }
  
    if (isProjBtn) { // Add, Submit, Cancel Project buttons
      form = document.querySelector("#projects-panel form");
    } else {
      form = document.querySelector('main > form'); 
    }
  
    if (action === 'add-project' || action === 'add-task') {
      hideExtraneousForms(action);
      displayTargetForm(form);
    }
  
    if (action === 'cancel-project' || action === 'cancel-task') {
      hideTargetForm(form);
    }
  
    if (action === 'submit-project' || action === 'submit-task') {
      dataController.updateData(action);
  

      // Move DOM stuff below 
      display(dataController.currentProjects);
      listenersController.addNavListener();
      hideTargetForm(form);
    }
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

  const controlNavAction = (e) => {
    const mainPanel = document.querySelector('main');
    const selection = e.target.closest('li');
    const addTaskBtn = document.querySelector('main > button');

    // Function highlights nav selection
    const highlight = (item) => {
      if (dataController.highlightedNavItem) {
        dataController.highlightedNavItem.classList.remove('highlight');
      }
    
      dataController.highlightedNavItem = item;
      dataController.highlightedNavItem.classList.add('highlight');
    }


    // If view option/proj is clicked
    if (selection) { 
      // If click is on a delete icon
      if (e.target.classList.contains('delete-icon')) {
        dataController.updateData(selection.id);
        display(dataController.currentProjects);
        listenersController.addNavListener();
      } else {
        mainPanel.dataset.selected = selection.id;
        
        (e.target.closest('ul').id === 'view-options-list') ? addTaskBtn.classList.add('hidden') : addTaskBtn.classList.remove('hidden');


        setMainHeader(selection.id);
        display(dataController.filterTasks(selection.id), false);
        listenersController.addTaskListener();  
        highlight(selection);
        
      }

      // if (e.target.closest('ul').id === 'view-options-list') {
      //   mainPanel.dataset.selected = selection.id;
  

      //   display(dataController.filterTasks(selection.id), false);


      //   // switch (selection.id) {
      //   //   case 'all':
      //   //     mainHeader.textContent = 'All Tasks';
      //   //     dataController.currentProjects.forEach(proj => {
      //   //       proj.tasks.forEach(task => {
      //   //         tasksToDisplay.push(task);
      //   //       });
      //   //     });
      //   //     break;
      //   //   case 'today':
      //   //     mainHeader.textContent = 'Today';
      //   //     dataController.currentProjects.forEach(proj => {
      //   //       proj.tasks.forEach(task => {
      //   //         if (isToday(parseISO(task.due))) {
      //   //           tasksToDisplay.push(task);
      //   //         }
      //   //       });
      //   //     });
      //   //     break;
      //   //   case 'week':
      //   //     mainHeader.textContent = 'Next 7 Days';
      //   //     dataController.currentProjects.forEach(proj => {
      //   //       proj.tasks.forEach(task => {
      //   //         if (task.due) {
      //   //           if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
      //   //             tasksToDisplay.push(task);
      //   //           }
      //   //         }
      //   //       });
      //   //     });
      //   //     break;
      //   //   case 'important':
      //   //     mainHeader.textContent = 'Important';
      //   //     dataController.currentProjects.forEach(proj => {
      //   //       proj.tasks.forEach(task => {
      //   //         if (task.important) {
      //   //           tasksToDisplay.push(task);
      //   //         }
      //   //       });
      //   //     });
      //   // }
    
      //   // display(tasksToDisplay, false);
      //   addTaskBtn.classList.add('hidden');
      // }
  
      // if (e.target.closest('ul').id === 'projects-list') {
      //   if (e.target.classList.contains('delete-icon')) {
      //     // dataController.removeItem(selection.id, dataController.currentProjects);
      //     // populateLocalStorage(dataController.currentProjects);


      //     /** */
      //     dataController.updateData(selection.id);
      //     display(dataController.currentProjects);
      //     // addProjectsListListener();
    
      //     // Main display All Tasks after deleting proj
      //     display(dataController.filterTasks('all'), false);
    
      //   } else {
      //     // dataController.currentProjects.forEach(proj => {
      //     //   if (proj.id === selection.id) {
      //     //     mainPanel.dataset.selected = selection.id;
      //     //     mainHeader.textContent = proj.name;
      
      //     //     display(proj.tasks, false);
      //     //     addTaskBtn.classList.remove('hidden');
      //     //   }
      //     // })

      //     display(dataController.filterTasks(selection.id), false);

      //     addTaskBtn.classList.remove('hidden');
      //   }
      // }

    }
  }

  return {
    controlForm,
    toggleMenu, 
    toggleTheme,
    controlNavAction
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

  const addNavListener = () => {
    // In lieu of adding listener to list items, add to lists
    // May be more efficient?
    let navLists = document.querySelectorAll('nav ul');

    navLists.forEach(list => {
      list.addEventListener('click', displayController.controlNavAction)
    })
  }


  const addTaskListener = () => {
  const tasksList = document.querySelector('#tasks-list');

  if (tasksList) {
    tasksList.addEventListener('click', (e) => {

      let editForm = tasksList.querySelector('#edit-task-form');
      let listItem = e.target.closest('li');
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

      for (let i = 0; i < currentProjects.length; i++) {
        for (let j = 0; j < currentProjects[i].tasks.length; j++) {

          if (currentProjects[i].tasks[j].id === selection) {
            let task = currentProjects[i].tasks[j];

            if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

              (task.completed) ? task.completed = false : task.completed = true;
              populateLocalStorage(currentProjects);

              checkbox.classList.toggle('checked');
              listItem.classList.toggle('completed');
              description.classList.toggle('crossed');

            } else if (e.target.classList.contains('important-icon')) {

              (task.important) ? task.important = false : task.important = true; 
              populateLocalStorage(currentProjects);

              // console.log(e.target.classList.contains('important'));

              e.target.classList.toggle('important');

            } else if (e.target.classList.contains('edit-icon')) {

              if (editForm) {
                editForm.previousElementSibling.classList.toggle('hidden');
                editForm.remove();
              }

              if (!projectForm.classList.contains('hidden')) {
                projectForm.classList.toggle('hidden');
                addProjectButton.classList.toggle('hidden');
              }

              if (!taskForm.classList.contains('hidden')) {
                taskForm.classList.toggle('hidden');
                addTaskButton.classList.toggle('hidden');
              }

              listItem.append(createEditForm(task));
              wrapper.classList.toggle('hidden');

            } else if (e.target.classList.contains('delete-icon')) {
              currentProjects[i].tasks.splice(j, 1);
              populateLocalStorage(currentProjects);

              let selectedTasks = [];

              if (mainPanel.dataset.selected === 'all') {

                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
                    selectedTasks.push(task)

                  })
                })

              } else if (mainPanel.dataset.selected === 'today') {
      
                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
      
                    if (isToday(parseISO(task.due))) {
                      selectedTasks.push(task);
                    }
      
                  })
                })
      
              } else if (mainPanel.dataset.selected === 'week') {

                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
      
                    if (task.due) {
                      if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                        selectedTasks.push(task)
                      }
                    }
      
                  })
                })
      

              } else if (mainPanel.dataset.selected === 'important') {

                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
                    if (task.important) {
                      selectedTasks.push(task);
                    }
                  })
                })
                
              } else {

                currentProjects[i].tasks.forEach(task => {
                  selectedTasks.push(task);
                })
              }

              display(selectedTasks, false);
              addTaskListener();
            }

            if (e.target.id === 'cancel-edit') {
              editForm.previousElementSibling.classList.toggle('hidden');
              editForm.remove();

              // console.log(editForm.previousElementSibling);


            } else if (e.target.id === 'submit-edit') {
      
              task.name = tasksList.querySelector('#edit-name-input').value;
              task.details = tasksList.querySelector('#edit-details-input').value;
              task.due = tasksList.querySelector('#edit-date-input').value;
              task.important = tasksList.querySelector('#edit-important-input').checked;
      
              populateLocalStorage(currentProjects);
      
              let selectedTasks = [];
      
              if (mainPanel.dataset.selected === 'all') {
      
                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
                    selectedTasks.push(task)
      
                  })
                })
      
              } else if (mainPanel.dataset.selected === 'today') {
      
                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
      
                    if (isToday(parseISO(task.due))) {
                      selectedTasks.push(task);
                    }
      
                  })
                })
      
              } else if (mainPanel.dataset.selected === 'week') {
      
                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
      
                    if (task.due) {
                      if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                        selectedTasks.push(task)
                      }
                    }
      
                  })
                })
      
      
              } else if (mainPanel.dataset.selected === 'important') {
      
                currentProjects.forEach(proj => {
                  proj.tasks.forEach(task => {
                    if (task.important) {
                      selectedTasks.push(task);
                    }
                  })
                })
                
              } else {
      
                currentProjects[i].tasks.forEach(task => {
                  selectedTasks.push(task);
                })
              }
      
              display(selectedTasks, false);
              addTaskListener();
            }

          }
        }
      }
    })
  }
  }

  const addFormButtonListeners = () => {
    const formBtns = document.querySelectorAll('button');
  
    formBtns.forEach(btn => {
      btn.addEventListener('click', displayController.controlForm);
    })
  }



  addMenuToggListener();
  addThemeToggListener();
  // listener only on task views on start, no projects list yet!
  addNavListener();
  addTaskListener();
  addFormButtonListeners();

  return {
    addMenuToggListener,
    addThemeToggListener,
    addNavListener,
    addTaskListener,
    addFormButtonListeners
  }
})();



const display = (list, isProject = true) => {
  let oldList, listId, container;

  if (isProject) {
    container = projectsListContainer;
    oldList = document.querySelector('#projects-list');
    listId = 'projects-list';
  } else {
    container = tasksListContainer;
    oldList = document.querySelector('#tasks-list');
    listId = 'tasks-list';
  }

  if (container.contains(oldList)) {
    oldList.remove();
  }

  const currentList = document.createElement('ul');
  currentList.id = listId;
  list.forEach(item => { 
    currentList.append(
      isProject ? contentCreator.createProject(item) : contentCreator.createTask(item)
    );
  })

  container.append(currentList);
}


display(dataController.currentProjects);

listenersController.addNavListener();


// Add listeners to Add, Submit, Cancel Project/Task buttons
// const addFormButtonListeners = () => {
//   const formBtns = document.querySelectorAll('button');

//   formBtns.forEach(btn => {
//     btn.addEventListener('click', displayController.controlForm);
//   })
// }
// const addTaskListener = () => {
//   const tasksList = document.querySelector('#tasks-list');

//   if (tasksList) {
//     tasksList.addEventListener('click', (e) => {

//       let editForm = tasksList.querySelector('#edit-task-form');
//       let listItem = e.target.closest('li');
//       let selection;
//       let wrapper;
//       let description;
//       let checkbox;

//       if (listItem) {
//         selection = listItem.id;
//         wrapper = listItem.querySelector('.task-wrapper');
//         description = listItem.querySelector('.task-descr-wrapper');
//         checkbox = listItem.querySelector('.checkbox');
//       }

//       for (let i = 0; i < dataController.currentProjects.length; i++) {
//         for (let j = 0; j < dataController.currentProjects[i].tasks.length; j++) {

//           if (dataController.currentProjects[i].tasks[j].id === selection) {
//             let task = dataController.currentProjects[i].tasks[j];

//             if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

//               (task.completed) ? task.completed = false : task.completed = true;
//               populateLocalStorage(dataController.currentProjects);

//               checkbox.classList.toggle('checked');
//               listItem.classList.toggle('completed');
//               description.classList.toggle('crossed');

//             } else if (e.target.classList.contains('important-icon')) {

//               (task.important) ? task.important = false : task.important = true; 
//               populateLocalStorage(dataController.currentProjects);

//               // console.log(e.target.classList.contains('important'));

//               e.target.classList.toggle('important');

//             } else if (e.target.classList.contains('edit-icon')) {

//               if (editForm) {
//                 editForm.previousElementSibling.classList.toggle('hidden');
//                 editForm.remove();
//               }

//               if (!projectForm.classList.contains('hidden')) {
//                 projectForm.classList.toggle('hidden');
//                 addProjectButton.classList.toggle('hidden');
//               }

//               if (!taskForm.classList.contains('hidden')) {
//                 taskForm.classList.toggle('hidden');
//                 addTaskButton.classList.toggle('hidden');
//               }

//               listItem.append(createEditForm(task));
//               wrapper.classList.toggle('hidden');

//             } else if (e.target.classList.contains('delete-icon')) {
//               dataController.currentProjects[i].tasks.splice(j, 1);
//               populateLocalStorage(dataController.currentProjects);

//               let selectedTasks = [];

//               if (mainPanel.dataset.selected === 'all') {

//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     selectedTasks.push(task)

//                   })
//                 })

//               } else if (mainPanel.dataset.selected === 'today') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (isToday(parseISO(task.due))) {
//                       selectedTasks.push(task);
//                     }
      
//                   })
//                 })
      
//               } else if (mainPanel.dataset.selected === 'week') {

//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (task.due) {
//                       if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
//                         selectedTasks.push(task)
//                       }
//                     }
      
//                   })
//                 })
      

//               } else if (mainPanel.dataset.selected === 'important') {

//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     if (task.important) {
//                       selectedTasks.push(task);
//                     }
//                   })
//                 })
                
//               } else {

//                 dataController.currentProjects[i].tasks.forEach(task => {
//                   selectedTasks.push(task);
//                 })
//               }

//               display(selectedTasks, false);
//               addTaskListener();
//             }

//             if (e.target.id === 'cancel-edit') {
//               editForm.previousElementSibling.classList.toggle('hidden');
//               editForm.remove();
  
//               // console.log(editForm.previousElementSibling);
  
  
//             } else if (e.target.id === 'submit-edit') {
      
//               task.name = tasksList.querySelector('#edit-name-input').value;
//               task.details = tasksList.querySelector('#edit-details-input').value;
//               task.due = tasksList.querySelector('#edit-date-input').value;
//               task.important = tasksList.querySelector('#edit-important-input').checked;
      
//               populateLocalStorage(dataController.currentProjects);
      
//               let selectedTasks = [];
      
//               if (mainPanel.dataset.selected === 'all') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     selectedTasks.push(task)
      
//                   })
//                 })
      
//               } else if (mainPanel.dataset.selected === 'today') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (isToday(parseISO(task.due))) {
//                       selectedTasks.push(task);
//                     }
      
//                   })
//                 })
      
//               } else if (mainPanel.dataset.selected === 'week') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (task.due) {
//                       if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
//                         selectedTasks.push(task)
//                       }
//                     }
      
//                   })
//                 })
      
      
//               } else if (mainPanel.dataset.selected === 'important') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     if (task.important) {
//                       selectedTasks.push(task);
//                     }
//                   })
//                 })
                
//               } else {
      
//                 dataController.currentProjects[i].tasks.forEach(task => {
//                   selectedTasks.push(task);
//                 })
//               }
      
//               display(selectedTasks, false);
//               addTaskListener();
//             }

//           }
//         }
//       }
//     })
//   }
// }
// const addProjectsListListener = () => {
//   const projectsPanelList = document.querySelector('#projects-list');

//   projectsPanelList.addEventListener('click', (e) => {
//     let selection = e.target.closest('li');
//     let addButton = document.querySelector('main > button');

//     if (e.target.classList.contains('delete-icon')) {
//       removeItem(selection.id, dataController.currentProjects);
//       populateLocalStorage(dataController.currentProjects);
//       display(dataController.currentProjects);
//       addProjectsListListener();

//       // Add code to revert main panel display to All Tasks after deleting proj

//     } else {
//       dataController.currentProjects.forEach(proj => {
//         if (proj.id === selection.id) {
//           mainPanel.dataset.selected = proj.id;
//           mainHeader.textContent = proj.name;
  
//           display(proj.tasks, false);
//           // Add task listeners
//           addTaskListener();
//           addButton.classList.remove('hidden');
//         }
//       })
//     }

//     highlight(selection);

//   })


// }
// const addMenuToggListener = () => {
//   const navPanel = document.querySelector('nav'); 
//   const menuIcon = document.querySelector('.menu-icon');
//   const menuToggleTooltip = document.querySelector('#menu-icon-wrapper > .tooltip-text');


//   const menuToggle = document.querySelector('.menu-icon');
//   menuToggle.addEventListener('click', () => {

//     navPanel.classList.toggle('hidden');

//     if (navPanel.classList.contains('hidden')) {
//       menuToggleTooltip.textContent = 'Expand menu';
//       menuIcon.textContent = 'menu'
//     } else {
//       menuToggleTooltip.textContent = 'Collapse menu';
//       menuIcon.textContent = 'menu_open'
//     }
//   })
// }
// const addThemeToggListener = () => {
//   const themeToggle = document.querySelector('.theme-icon');
//   const themeIcon = document.querySelector('.theme-icon');
//   const themeToggleTooltip = document.querySelector('#theme-icon-wrapper > .tooltip-text');

//   themeToggle.addEventListener('click', () => {

//     document.body.classList.toggle('dark');
    
//     if (document.body.classList.contains('dark')) {
//       themeToggleTooltip.textContent = 'Light theme'; 
//       themeIcon.textContent = 'brightness_high';
//     } else {
//       themeToggleTooltip.textContent = 'Dark theme'; 
//       themeIcon.textContent = 'brightness_4';
//     }
//   })

// }
// const addNavListeners = () => {
//   // In lieu of adding listener to list items, add to lists
//   // May be more efficient?
//   let viewOptions = document.querySelectorAll('nav ul');

//   viewOptions.forEach(option => {
//     option.addEventListener('click', displayController.controlNavAction)
//   })
// }

// addMenuToggListener();
// addThemeToggListener();
// addFormButtonListeners();
// addTaskListener();
// addNavListeners();


// Display projects in projects panel
















// Add listeners to Add, Submit, Cancel Project/Task buttons
// const addFormButtonListeners = () => {
//   const formBtns = document.querySelectorAll('button');

//   formBtns.forEach(btn => {
//     btn.addEventListener('click', displayController.controlForm);
//   })
// }
// const addTaskListener = () => {
//   const tasksList = document.querySelector('#tasks-list');

//   if (tasksList) {
//     tasksList.addEventListener('click', (e) => {

//       let editForm = tasksList.querySelector('#edit-task-form');
//       let listItem = e.target.closest('li');
//       let selection;
//       let wrapper;
//       let description;
//       let checkbox;

//       if (listItem) {
//         selection = listItem.id;
//         wrapper = listItem.querySelector('.task-wrapper');
//         description = listItem.querySelector('.task-descr-wrapper');
//         checkbox = listItem.querySelector('.checkbox');
//       }

//       for (let i = 0; i < dataController.currentProjects.length; i++) {
//         for (let j = 0; j < dataController.currentProjects[i].tasks.length; j++) {

//           if (dataController.currentProjects[i].tasks[j].id === selection) {
//             let task = dataController.currentProjects[i].tasks[j];

//             if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

//               (task.completed) ? task.completed = false : task.completed = true;
//               populateLocalStorage(dataController.currentProjects);

//               checkbox.classList.toggle('checked');
//               listItem.classList.toggle('completed');
//               description.classList.toggle('crossed');

//             } else if (e.target.classList.contains('important-icon')) {

//               (task.important) ? task.important = false : task.important = true; 
//               populateLocalStorage(dataController.currentProjects);

//               // console.log(e.target.classList.contains('important'));

//               e.target.classList.toggle('important');

//             } else if (e.target.classList.contains('edit-icon')) {

//               if (editForm) {
//                 editForm.previousElementSibling.classList.toggle('hidden');
//                 editForm.remove();
//               }

//               if (!projectForm.classList.contains('hidden')) {
//                 projectForm.classList.toggle('hidden');
//                 addProjectButton.classList.toggle('hidden');
//               }

//               if (!taskForm.classList.contains('hidden')) {
//                 taskForm.classList.toggle('hidden');
//                 addTaskButton.classList.toggle('hidden');
//               }

//               listItem.append(createEditForm(task));
//               wrapper.classList.toggle('hidden');

//             } else if (e.target.classList.contains('delete-icon')) {
//               dataController.currentProjects[i].tasks.splice(j, 1);
//               populateLocalStorage(dataController.currentProjects);

//               let selectedTasks = [];

//               if (mainPanel.dataset.selected === 'all') {

//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     selectedTasks.push(task)

//                   })
//                 })

//               } else if (mainPanel.dataset.selected === 'today') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (isToday(parseISO(task.due))) {
//                       selectedTasks.push(task);
//                     }
      
//                   })
//                 })
      
//               } else if (mainPanel.dataset.selected === 'week') {

//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (task.due) {
//                       if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
//                         selectedTasks.push(task)
//                       }
//                     }
      
//                   })
//                 })
      

//               } else if (mainPanel.dataset.selected === 'important') {

//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     if (task.important) {
//                       selectedTasks.push(task);
//                     }
//                   })
//                 })
                
//               } else {

//                 dataController.currentProjects[i].tasks.forEach(task => {
//                   selectedTasks.push(task);
//                 })
//               }

//               display(selectedTasks, false);
//               addTaskListener();
//             }

//             if (e.target.id === 'cancel-edit') {
//               editForm.previousElementSibling.classList.toggle('hidden');
//               editForm.remove();
  
//               // console.log(editForm.previousElementSibling);
  
  
//             } else if (e.target.id === 'submit-edit') {
      
//               task.name = tasksList.querySelector('#edit-name-input').value;
//               task.details = tasksList.querySelector('#edit-details-input').value;
//               task.due = tasksList.querySelector('#edit-date-input').value;
//               task.important = tasksList.querySelector('#edit-important-input').checked;
      
//               populateLocalStorage(dataController.currentProjects);
      
//               let selectedTasks = [];
      
//               if (mainPanel.dataset.selected === 'all') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     selectedTasks.push(task)
      
//                   })
//                 })
      
//               } else if (mainPanel.dataset.selected === 'today') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (isToday(parseISO(task.due))) {
//                       selectedTasks.push(task);
//                     }
      
//                   })
//                 })
      
//               } else if (mainPanel.dataset.selected === 'week') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
      
//                     if (task.due) {
//                       if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
//                         selectedTasks.push(task)
//                       }
//                     }
      
//                   })
//                 })
      
      
//               } else if (mainPanel.dataset.selected === 'important') {
      
//                 dataController.currentProjects.forEach(proj => {
//                   proj.tasks.forEach(task => {
//                     if (task.important) {
//                       selectedTasks.push(task);
//                     }
//                   })
//                 })
                
//               } else {
      
//                 dataController.currentProjects[i].tasks.forEach(task => {
//                   selectedTasks.push(task);
//                 })
//               }
      
//               display(selectedTasks, false);
//               addTaskListener();
//             }

//           }
//         }
//       }
//     })
//   }
// }
// const addProjectsListListener = () => {
//   const projectsPanelList = document.querySelector('#projects-list');

//   projectsPanelList.addEventListener('click', (e) => {
//     let selection = e.target.closest('li');
//     let addButton = document.querySelector('main > button');

//     if (e.target.classList.contains('delete-icon')) {
//       removeItem(selection.id, dataController.currentProjects);
//       populateLocalStorage(dataController.currentProjects);
//       display(dataController.currentProjects);
//       addProjectsListListener();

//       // Add code to revert main panel display to All Tasks after deleting proj

//     } else {
//       dataController.currentProjects.forEach(proj => {
//         if (proj.id === selection.id) {
//           mainPanel.dataset.selected = proj.id;
//           mainHeader.textContent = proj.name;
  
//           display(proj.tasks, false);
//           // Add task listeners
//           addTaskListener();
//           addButton.classList.remove('hidden');
//         }
//       })
//     }

//     highlight(selection);

//   })


// }
// const addMenuToggListener = () => {
//   const navPanel = document.querySelector('nav'); 
//   const menuIcon = document.querySelector('.menu-icon');
//   const menuToggleTooltip = document.querySelector('#menu-icon-wrapper > .tooltip-text');


//   const menuToggle = document.querySelector('.menu-icon');
//   menuToggle.addEventListener('click', () => {

//     navPanel.classList.toggle('hidden');

//     if (navPanel.classList.contains('hidden')) {
//       menuToggleTooltip.textContent = 'Expand menu';
//       menuIcon.textContent = 'menu'
//     } else {
//       menuToggleTooltip.textContent = 'Collapse menu';
//       menuIcon.textContent = 'menu_open'
//     }
//   })
// }
// const addThemeToggListener = () => {
//   const themeToggle = document.querySelector('.theme-icon');
//   const themeIcon = document.querySelector('.theme-icon');
//   const themeToggleTooltip = document.querySelector('#theme-icon-wrapper > .tooltip-text');

//   themeToggle.addEventListener('click', () => {

//     document.body.classList.toggle('dark');
    
//     if (document.body.classList.contains('dark')) {
//       themeToggleTooltip.textContent = 'Light theme'; 
//       themeIcon.textContent = 'brightness_high';
//     } else {
//       themeToggleTooltip.textContent = 'Dark theme'; 
//       themeIcon.textContent = 'brightness_4';
//     }
//   })

// }
// const addNavListeners = () => {
//   // In lieu of adding listener to list items, add to lists
//   // May be more efficient?
//   let viewOptions = document.querySelectorAll('nav ul');

//   viewOptions.forEach(option => {
//     option.addEventListener('click', displayController.controlNavAction)
//   })
// }

// addMenuToggListener();
// addThemeToggListener();
// addFormButtonListeners();
// addTaskListener();
// addNavListeners();


// Display projects in projects panel













