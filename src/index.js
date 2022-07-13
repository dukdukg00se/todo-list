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
// const projectNameInput = document.querySelector("#project-name-input");
// const taskNameInput = document.querySelector('#task-name-input');
// const taskDetailsInput = document.querySelector('#task-details-input');
// const taskDateInput = document.querySelector('#task-date-input');
// const taskImportantInput = document.querySelector('#task-important-input');

// let currentProjects = !localStorage.length ? [] : JSON.parse(localStorage.getItem("projects"));

// function Project(name) {
//   this.name = name;
//   this.tasks = [];
// }

// function Task(name, details, due, important) {
//   this.name = name;
//   this.details = details;
//   this.due = due;
//   this.important = important;
//   this.completed = false;
// }

// const addItem = (obj, arr) => {
//   arr.push(obj);
// }

// const removeItem = (objId, arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].id === objId) {
//       arr.splice(i, 1);
//     }
//   }
// }

// const setItemId = (prefix, arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i].id = prefix + i;
//   }
// }

// const populateLocalStorage = (projects) => {
//   localStorage.setItem('projects', JSON.stringify(projects));
// };

// const createProject = (projObj) => {
//   const projectListItem = document.createElement('li');
//   const projectWrapper = document.createElement('div');
//   const projectIcon = document.createElement('span');
//   const projectTitle = document.createElement('h3');
//   const deleteIcon = document.createElement('span');
  
//   projectListItem.classList.add('project-item');
//   projectListItem.id = projObj.id;
//   projectWrapper.classList.add('project-wrapper');
//   projectIcon.classList.add('material-symbols-rounded', 'decor-icon');
//   projectIcon.textContent = 'tools_power_drill';
//   projectTitle.textContent = projObj.name
//   deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
//   deleteIcon.textContent = 'delete';

//   projectWrapper.append(projectIcon, projectTitle, deleteIcon);
//   projectListItem.append(projectWrapper);
//   return projectListItem;
// };

// const createTask = (taskObj) => {
//   const taskListItem = document.createElement('li');
//   const taskWrapper = document.createElement('div');
//   const taskSubWrapper = document.createElement('div');
//   const checkbox = document.createElement('div');
//   const taskDescrWrapper = document.createElement('div');
//   const taskName = document.createElement('h3');
//   const taskDetails = document.createElement('p');  
//   const taskEditWrapper = document.createElement('div');
//   const taskDueDate = document.createElement('span');
//   const taskImportantIcon = document.createElement('span');
//   const editIcon = document.createElement('span');

//   taskListItem.classList.add('task-item');
//   taskListItem.id = taskObj.id;
//   taskWrapper.classList.add('task-wrapper');
//   taskSubWrapper.classList.add('task-sub-wrapper');
//   checkbox.classList.add('checkbox');
//   taskDescrWrapper.classList.add('task-descr-wrapper');
//   taskName.textContent = taskObj.name;
//   taskDetails.textContent = taskObj.details;
//   taskEditWrapper.classList.add('task-edit-wrapper');
//   taskDueDate.classList.add('task-due-date');
//   taskImportantIcon.classList.add('material-symbols-rounded', 'important-icon');
//   taskImportantIcon.textContent = 'flag';
//   editIcon.classList.add('material-symbols-rounded', 'edit-icon');
//   editIcon.textContent = 'more_vert';
//   // editIcon.dataset.task = taskObj.id;
  
//   if (taskObj.completed) {
//     checkbox.classList.add('checked');
//     taskListItem.classList.add('completed');
//     taskDescrWrapper.classList.add('crossed');
//   }
//   if (taskObj.due) {
//     taskDueDate.textContent = taskObj.due;
//   } else {
//     taskDueDate.textContent = 'No due date';
//   }
//   if (taskObj.important) {
//     taskImportantIcon.classList.add('important');
//   }

//   taskEditWrapper.append(taskDueDate, taskImportantIcon, editIcon);
//   taskDescrWrapper.append(taskName, taskDetails);
//   taskSubWrapper.append(checkbox, taskDescrWrapper);
//   taskWrapper.append(taskSubWrapper, taskEditWrapper);
//   taskListItem.append(taskWrapper);
  
//   return taskListItem;
// }

// const createEditForm = (task) => {
//   const form = document.createElement("form");
//   const nameLabel = document.createElement("label");
//   const nameInput = document.createElement("input");
//   const detailsLabel = document.createElement("label");
//   const detailsInput = document.createElement("textarea");
//   const dateLabel = document.createElement("label");
//   const dateInput = document.createElement("input");
//   const formSubContainer = document.createElement('div');
//   const importantLabel = document.createElement("label");
//   const importantInput = document.createElement("input");
//   const deleteWrapper = document.createElement('div');
//   const deleteIcon = document.createElement('span');
//   const btnContainer = document.createElement("div");
//   const submitBtn = document.createElement("button");
//   const cancelBtn = document.createElement("button");

//   form.id = 'edit-task-form';
//   nameLabel.htmlFor = "edit-name-input";
//   nameLabel.textContent = "Task name:";
//   nameInput.id = "edit-name-input";
//   nameInput.type = "text";
//   nameInput.placeholder = "Get Dinner";
//   detailsLabel.htmlFor = "edit-details-input";
//   detailsLabel.textContent = "Details:";
//   detailsInput.id = "edit-details-input";
//   detailsInput.rows = "5";
//   detailsInput.cols = "30";
//   detailsInput.wrap = "hard";
//   detailsInput.placeholder = "Taco Bell";
//   dateLabel.htmlFor = "edit-date-input";
//   dateLabel.textContent = "Date due:";
//   dateInput.id = "edit-date-input";
//   dateInput.type = "Date";
//   importantLabel.htmlFor = "edit-important-input";
//   importantLabel.textContent = "Important:";
//   importantInput.id = "edit-important-input";
//   importantInput.type = "checkbox";
//   deleteWrapper.textContent = 'Delete:';
//   deleteWrapper.classList.add('delete-wrapper');
//   deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
//   deleteIcon.textContent = 'delete';
//   submitBtn.classList.add("task-button");
//   submitBtn.id = "submit-edit";
//   submitBtn.textContent = "Submit";
//   submitBtn.type = "button";
//   cancelBtn.classList.add("task-button");
//   cancelBtn.id = "cancel-edit";
//   cancelBtn.textContent = "Cancel";
//   cancelBtn.type = "button";

//   nameInput.value = task.name;
//   detailsInput.value = task.details;
//   dateInput.value = task.due;
//   importantInput.checked = task.important;

//   importantLabel.append(importantInput);
//   deleteWrapper.append(deleteIcon);
//   formSubContainer.append(importantLabel, deleteWrapper);
//   btnContainer.append(submitBtn, cancelBtn);
//   form.append(
//     nameLabel,
//     nameInput,
//     detailsLabel,
//     detailsInput,
//     dateLabel,
//     dateInput,
//     formSubContainer,
//     btnContainer
//   );

//   return form;
// };


// Wrap in IIFE; can then use returned functions


const dataController = (() => {
  let currentProjects = !localStorage.length ? [] : JSON.parse(localStorage.getItem("projects"));

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
  const populateLocalStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };


  const updateProjectsInfo = (action) => {
    let item, container, idPrefix;
  
    if (action === 'submit-project') {
      const projName = document.querySelector("#project-name-input").value;
      item = new Project(projName);
      container = currentProjects;
      idPrefix = 'project-'
    } else if (action === 'submit-task') {
      const taskName = document.querySelector('#task-name-input').value;
      const taskDetails = document.querySelector('#task-details-input').value;
      const taskDue = document.querySelector('#task-date-input').value;
      const taskImportant = document.querySelector('#task-important-input').checked;
      let selectedProject = mainPanel.dataset.selected;
  
      item = new Task(taskName, taskDetails, taskDue, taskImportant)
  
      currentProjects.forEach(proj => {
        if (proj.id === selectedProject) {
          container = proj.tasks;
          idPrefix = `${proj.id}-task-`;
        }
      })
    }
  
    addItem(item, container);
    setItemId(idPrefix, container);
    populateLocalStorage(currentProjects);
  }

  return {
    currentProjects,
    updateProjectsInfo
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



let selectedLi;
const highlight = (li) => {

  if (selectedLi) {
    selectedLi.classList.remove('highlight');
  }

  selectedLi = li;
  selectedLi.classList.add('highlight');

}



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
const formController = (e) => {
  let isProjBtn = e.currentTarget.classList.contains('project-button');
  let action = e.currentTarget.id;
  let form;

  // Add, Submit, Cancel Project buttons
  if (isProjBtn) {
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
    dataController.updateProjectsInfo(action);

    display(currentProjects);
    addProjectsListListener();
    hideTargetForm(form);
  }

}

// Add listeners to Add, Submit, Cancel Project/Task buttons
const addFormButtonListeners = () => {
  const formBtns = document.querySelectorAll('button');

  formBtns.forEach(btn => {
    btn.addEventListener('click', formController)
  })
}






// const addFormButtonListeners = () => {
//   const formBtns = document.querySelectorAll('button');

//   formBtns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       let form;
//       let addButton;

//       // Add, Submit, Cancel Project buttons
//       if (e.currentTarget.classList.contains('project-button')) {
//         form = document.querySelector("#projects-panel form");
//         addButton = document.querySelector("#add-project");

//         if (e.currentTarget.id === 'add-project') {

//           if (!taskForm.classList.contains('hidden')) {
//             taskForm.classList.toggle('hidden');
//             addTaskButton.classList.toggle('hidden');
//           }

//           if (tasksListContainer.querySelector('form')) {

//             let editForm = tasksListContainer.querySelector('form');

//             editForm.previousElementSibling.classList.toggle('hidden');
//             editForm.remove();
//           }

//           displayTargetForm(form, projectNameInput, addButton)

//         }

//         if (e.target.id === 'cancel-project') {
//           hideTargetForm(form, addButton)
//         }

//         if (e.target.id === 'submit-project') {
//           updateCurrentProjects(e);
//           setItemId('project-', currentProjects);
//           populateLocalStorage(currentProjects);
          
//           display(currentProjects);
//           addProjectsListListener();
//           hideTargetForm(form, addButton)
//         }
//       }

//       // Add, Submit, Cancel Task buttons
//       if (e.currentTarget.classList.contains('task-button')) {
//         form = document.querySelector('main > form'); 
//         addButton = document.querySelector('main > button');

//         if (e.currentTarget.id === 'add-task') {


//           if (!projectForm.classList.contains('hidden')) {
//             projectForm.classList.toggle('hidden');
//             addProjectButton.classList.toggle('hidden');
//           }

//           if (tasksListContainer.querySelector('form')) {

//             let editForm = tasksListContainer.querySelector('form');

//             editForm.previousElementSibling.classList.toggle('hidden');
//             editForm.remove();
//           }

//           displayTargetForm(form, taskNameInput, addButton)
//         }

//         if (e.target.id === 'cancel-task') {

//           hideTargetForm(form, addButton)
//         }

//         if (e.target.id === 'submit-task') {
//           let taskName = taskNameInput.value;
//           let taskDetails = taskDetailsInput.value;
//           let taskDue = taskDateInput.value;
//           let taskImportant = taskImportantInput.checked;
//           let selectedProject = mainPanel.dataset.selected;
          
//           currentProjects.forEach(proj => {
//             if (proj.id === selectedProject) {
//               let itemIdPrefix = `${proj.id}-task-`;
              
//               addItem(new Task(taskName, taskDetails, taskDue, taskImportant), proj.tasks);
//               setItemId(itemIdPrefix, proj.tasks);
//               populateLocalStorage(currentProjects);

//               display(proj.tasks, false);
//               // Add task listeners here
//               addTaskListener();

//               hideTargetForm(form, addButton)

//             }
//           })
//         }    
//       }
//     })
//   })
// }

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



const addViewOptionsListListener = () => {
  // Instead of adding listener to each list item, add to list
  // May be more efficient?
  const viewOptionsList = document.querySelector('#view-options-list');
  viewOptionsList.addEventListener('click', (e) => {
    let selection = e.target.closest('li');

    if (selection.id === 'all') {
      mainHeader.textContent = 'All Tasks';
      mainPanel.dataset.selected = selection.id;

      let allTasks = [];
      currentProjects.forEach(proj => {
        proj.tasks.forEach(task => {
          allTasks.push(task)
        })
      })

      display(allTasks, false);
    }

    if (selection.id === 'today') {
      mainHeader.textContent = 'Today';
      mainPanel.dataset.selected = selection.id;

      let todayTasks = [];
      currentProjects.forEach(proj => {
        proj.tasks.forEach(task => {
          if (isToday(parseISO(task.due))) {
            todayTasks.push(task);
          }
        })
      })

      display(todayTasks, false);
    }

    if (selection.id === 'week') {
      mainHeader.textContent = 'Next 7 Days';
      mainPanel.dataset.selected = selection.id;

      let weekTasks = [];
      currentProjects.forEach(proj => {
        proj.tasks.forEach(task => {
          if (task.due) {
            if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
              weekTasks.push(task)
            }
          }
        })
      })

      display(weekTasks, false);
    }

    if (selection.id === 'important') {
      mainHeader.textContent = 'Important';
      mainPanel.dataset.selected = selection.id;

      let importantTasks = [];
      currentProjects.forEach(proj => {
        proj.tasks.forEach(task => {
          if (task.important) {
            importantTasks.push(task);
          }
        })
      })

      display(importantTasks, false);
    }

    // Add task listeners
    addTaskListener();
    addTaskButton.classList.add('hidden');

    highlight(selection);
  })
}
const addProjectsListListener = () => {
  const projectsPanelList = document.querySelector('#projects-list');

  projectsPanelList.addEventListener('click', (e) => {
    let selection = e.target.closest('li');
    let addButton = document.querySelector('main > button');

    if (e.target.classList.contains('delete-icon')) {
      removeItem(selection.id, currentProjects);
      populateLocalStorage(currentProjects);
      display(currentProjects);
      addProjectsListListener();

      // Add code to revert main panel display to All Tasks after deleting proj

    } else {
      currentProjects.forEach(proj => {
        if (proj.id === selection.id) {
          mainPanel.dataset.selected = proj.id;
          mainHeader.textContent = proj.name;
  
          display(proj.tasks, false);
          // Add task listeners
          addTaskListener();
          addButton.classList.remove('hidden');
        }
      })
    }

    highlight(selection);

  })


}



const addMenuToggleListener = () => {
  const navPanel = document.querySelector('nav'); 
  const menuIcon = document.querySelector('.menu-icon');
  const menuToggleTooltip = document.querySelector('#menu-icon-wrapper > .tooltip-text');


  const menuToggle = document.querySelector('.menu-icon');
  menuToggle.addEventListener('click', () => {

    navPanel.classList.toggle('hidden');

    if (navPanel.classList.contains('hidden')) {
      menuToggleTooltip.textContent = 'Expand menu';
      menuIcon.textContent = 'menu'
    } else {
      menuToggleTooltip.textContent = 'Collapse menu';
      menuIcon.textContent = 'menu_open'
    }
  })
}
addMenuToggleListener();



const addThemeToggleListener = () => {
  const themeToggle = document.querySelector('.theme-icon');
  const themeIcon = document.querySelector('.theme-icon');
  const themeToggleTooltip = document.querySelector('#theme-icon-wrapper > .tooltip-text');

  themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
      themeToggleTooltip.textContent = 'Light theme'; 
      themeIcon.textContent = 'brightness_high';
    } else {
      themeToggleTooltip.textContent = 'Dark theme'; 
      themeIcon.textContent = 'brightness_4';
    }
  })

}
addThemeToggleListener();


// Display projects in projects panel
display(dataController.currentProjects);

// Add listeners to page
addFormButtonListeners();
// addViewOptionsListListener();
// addProjectsListListener();
addTaskListener();




const displaySelection = (e) => {
  const mainPanel = document.querySelector('main');
  const mainHeader = document.querySelector('h1');
  const selection = e.target.closest('li');
  const addTaskBtn = document.querySelector('main > button');
  let tasksToDisplay = [];

  if (selection) {
    if (e.target.closest('ul').id === 'view-options-list') {
      mainPanel.dataset.selected = selection.id;
  
      switch (selection.id) {
        case 'all':
          mainHeader.textContent = 'All Tasks';
          currentProjects.forEach(proj => {
            proj.tasks.forEach(task => {
              tasksToDisplay.push(task);
            });
          });
          break;
        case 'today':
          mainHeader.textContent = 'Today';
          currentProjects.forEach(proj => {
            proj.tasks.forEach(task => {
              if (isToday(parseISO(task.due))) {
                tasksToDisplay.push(task);
              }
            });
          });
          break;
        case 'week':
          mainHeader.textContent = 'Next 7 Days';
          currentProjects.forEach(proj => {
            proj.tasks.forEach(task => {
              if (task.due) {
                if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                  tasksToDisplay.push(task);
                }
              }
            });
          });
          break;
        case 'important':
          mainHeader.textContent = 'Important';
          currentProjects.forEach(proj => {
            proj.tasks.forEach(task => {
              if (task.important) {
                tasksToDisplay.push(task);
              }
            });
          });
      }
  
      display(tasksToDisplay, false);
      addTaskBtn.classList.add('hidden');
    }

    if (e.target.closest('ul').id === 'projects-list') {
      if (e.target.classList.contains('delete-icon')) {
        removeItem(selection.id, currentProjects);
        populateLocalStorage(currentProjects);
        display(currentProjects);
        addProjectsListListener();
  
        // Main display All Tasks after deleting proj
        mainHeader.textContent = 'All Tasks';
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            tasksToDisplay.push(task);
          });
        });
        display(tasksToDisplay, false);
  
      } else {
        currentProjects.forEach(proj => {
          if (proj.id === selection.id) {
            mainPanel.dataset.selected = selection.id;
            mainHeader.textContent = proj.name;
    
            display(proj.tasks, false);
            addTaskBtn.classList.remove('hidden');
          }
        })
      }
    }

    addTaskListener();  
    highlight(selection);
  }
}


const addNavListeners = () => {
  // In lieu of adding listener to list items, add to lists
  // May be more efficient?
  let viewOptions = document.querySelectorAll('nav ul');

  viewOptions.forEach(option => {
    option.addEventListener('click', displaySelection)
  })
}
addNavListeners();



