import {
  getDay,
  isThisWeek,
  isToday,
  parseISO
} from "date-fns";

// Varaiables. Move later
const projectsListContainer = document.querySelector('#projects-list-container');
const projectForm = document.querySelector("#projects-panel form");
const addProjectButton = document.querySelector("#add-project");
const projectNameInput = document.querySelector("#project-name-input");
const mainPanel = document.querySelector('main');
const mainHeader = document.querySelector('h1');
const tasksListContainer = document.querySelector('#tasks-list-container');
// const taskFormContainer = document.querySelector('#task-form-container');
const addTaskButton = document.querySelector('main > button');
// const taskNameInput = document.querySelector('#task-name-input');
// const taskDetailsInput = document.querySelector('#task-details-input');
// const taskDateInput = document.querySelector('#task-date-input');
// const taskImportantInput = document.querySelector('#task-important-input');


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
}

const addItem = (item, container) => {
  container.push(item);
}
const removeItem = (itemId, container) => {
  for (let i = 0; i < container.length; i++) {
    if (container[i].id === itemId) {
      container.splice(i, 1);
    }
  }
}
const setItemId = (prefix, container) => {
  for (let i = 0; i < container.length; i++) {
    container[i].id = prefix + i;
  }
}
const updateCurrentProjects = (e) => {
  if (e.target.classList.contains('delete')) {
    let projectToDelete = e.target.parentElement.id;
    removeItem(projectToDelete, currentProjects);
  } else {
    let projectName = projectNameInput.value;
    addItem(new Project(projectName), currentProjects);
  }
}
const populateLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const createProjectContent = (projObj) => {
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

  deleteIcon.addEventListener('click', (e) => {
    let projectToDelete = e.target.parentElement.parentElement.id;
    removeItem(projectToDelete, currentProjects);
    populateLocalStorage(currentProjects);
    display(currentProjects);
    addListListeners();
  })

  projectWrapper.append(projectIcon, projectTitle, deleteIcon);
  projectListItem.append(projectWrapper);
  return projectListItem;
};

const createTaskContent = (taskObj) => {
  const taskListItem = document.createElement('li');
  const taskWrapper = document.createElement('div');
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
  taskDescrWrapper.classList.add('task-descr-wrapper');
  taskName.textContent = taskObj.name;
  taskDetails.textContent = taskObj.details;
  taskEditWrapper.classList.add('task-edit-wrapper');
  taskDueDate.classList.add('task-due-date');
  taskImportantIcon.classList.add('material-symbols-rounded', 'important-icon');
  taskImportantIcon.textContent = 'flag';
  editIcon.classList.add('material-symbols-rounded', 'edit-icon');
  editIcon.textContent = 'more_vert';
  editIcon.dataset.task = taskObj.id;
  
  if (taskObj.due) {
    taskDueDate.textContent = taskObj.due;
  } else {
    taskDueDate.textContent = 'No due date';
  }

  if (taskObj.important) {
    taskImportantIcon.classList.add('important');
  }

  taskImportantIcon.addEventListener('click', () => {
    if (taskObj.important) {
      taskObj.important = false;

    } else {
      taskObj.important = true;
    }
    taskImportantIcon.classList.toggle('important');
  })
  editIcon.addEventListener('click', (e) => {
    let selectedTaskItem = e.target.closest('li');
    let selectedTaskWrapper = e.target.closest('li > div');

    selectedTaskItem.append(createTaskForm(selectedTaskItem.id));
    addButtonListeners();

    selectedTaskWrapper.classList.add('hidden');
  })

  taskEditWrapper.append(taskDueDate, taskImportantIcon, editIcon);
  taskDescrWrapper.append(taskName, taskDetails);
  taskWrapper.append(taskDescrWrapper, taskEditWrapper);
  taskListItem.append(taskWrapper);
  
  return taskListItem;
}

const createTaskForm = () => {
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

  nameLabel.htmlFor = "task-name-input";
  nameLabel.textContent = "Task name:";
  nameInput.id = "task-name-input";
  nameInput.type = "text";
  nameInput.placeholder = "Get Dinner";
  detailsLabel.htmlFor = "task-details-input";
  detailsLabel.textContent = "Details:";
  detailsInput.id = "task-details-input";
  detailsInput.rows = "5";
  detailsInput.cols = "30";
  detailsInput.wrap = "hard";
  detailsInput.placeholder = "Taco Bell";
  dateLabel.htmlFor = "task-date-input";
  dateLabel.textContent = "Date due:";
  dateInput.id = "task-date-input";
  dateInput.type = "Date";
  importantLabel.htmlFor = "task-important-input";
  importantLabel.textContent = "Important:";
  importantInput.id = "task-important-input";
  importantInput.type = "checkbox";
  deleteWrapper.textContent = 'Delete:';
  deleteWrapper.classList.add('delete-wrapper');
  deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
  deleteIcon.textContent = 'delete';
  submitBtn.classList.add("task-button");
  submitBtn.id = "submit-task";
  submitBtn.textContent = "Submit";
  submitBtn.type = "button";
  cancelBtn.classList.add("task-button");
  cancelBtn.id = "cancel-task";
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";


  let taskToEdit = '';

  if (taskToEdit) {
    currentProjects.forEach(proj => {
      proj.tasks.forEach(task => {

        if (task.id == taskToEdit) {
          nameInput.value = task.name;
          detailsInput.value = task.details;
          dateInput.value = task.due;
          importantInput.checked = task.important;
        }
      })
    })
  }

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


const display = (list, isProject = true) => {
  let oldList, listId, container;

  if (isProject) {
    container = projectsListContainer;
    oldList = document.querySelector('#projects-list');
    listId = 'projects-list';
  } else {
    container = tasksListContainer;
    oldList = document.querySelector('#project-tasks-list');
    listId = 'project-tasks-list';
  }

  if (container.contains(oldList)) {
    oldList.remove();
  }

  const currentList = document.createElement('ul');
  currentList.id = listId;
  list.forEach(item => { 
    currentList.append(
      isProject ? createProjectContent(item) : createTaskContent(item)
    );
  })

  container.append(currentList);
}

const addButtonListeners = (e) => {
  const pageBtns = document.querySelectorAll('button');

  pageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Buttons in the projects panel
      if (e.currentTarget.classList.contains('project-button')) {
        if (e.currentTarget.id === 'add-project') {
          projectForm.classList.remove('hidden');
          projectNameInput.focus();
          addProjectButton.classList.add('hidden');
        }

        if (e.target.id === 'cancel-project') {
          projectForm.reset();
          projectForm.classList.add('hidden');
          addProjectButton.classList.remove('hidden');
        }

        if (e.target.id === 'submit-project') {
          updateCurrentProjects(e);
          setItemId('project-', currentProjects);
          populateLocalStorage(currentProjects);

          display(currentProjects);
          addListListeners();

          projectForm.reset();
          projectForm.classList.add('hidden');
          addProjectButton.classList.remove('hidden');
        }
      }

      if (e.currentTarget.classList.contains('task-button')) {
        let taskItem = e.target.closest('li');

        // let task;
        // if (taskItem) {
        //   task = taskItem.querySelector('.task-wrapper');
        // }

        if (!taskItem) {
          const taskForm = document.querySelector('main form');

          if (e.currentTarget.id === 'add-task') {

            // Need to make sure to remove taskForm here
            // If not, will have multiple forms
            // Not sure why but may be cuz remove()/removeChild() doesn't delete from memory only unreference it?
            if (taskFormContainer.contains(taskForm)) {
              taskForm.remove();
            }

            taskFormContainer.append(createTaskForm());
            addButtonListeners(e);
          }

          if (e.target.id === 'cancel-task') {
            taskForm.remove();
          }

          if (e.target.id === 'submit-task') {
            let taskName = document.querySelector('#task-name-input').value;
            let taskDetails = document.querySelector('#task-details-input').value;
            let taskDue = document.querySelector('#task-date-input').value;
            let taskImportant = document.querySelector('#task-important-input').checked;
            let targetProject = mainPanel.dataset.shownTasks;


            currentProjects.forEach(proj => {
              if (proj.id === targetProject) {
                addItem(new Task(taskName, taskDetails, taskDue, taskImportant), proj.tasks);

                let itemIdPrefix = `${proj.id}-task-`;
                setItemId(itemIdPrefix, proj.tasks);
                populateLocalStorage(currentProjects);

                display(proj.tasks, false);
                // Add task icon listeners here

                taskForm.remove();
                addTaskButton.classList.remove('hidden');
              }
            })
          }    

        }


        // if (e.target.id === 'cancel-task') {
        //   // task.classList.toggle('hidden');
        //   // taskForm.remove();

        //   let editTask = e.target.closest('li');
        //   const taskForm = document.querySelector('main form');


        //   taskForm.remove();
        // }


        // if (e.target.id === 'submit-task') {
        //   let taskName = taskNameInput.value;
        //   let taskDetails = taskDetailsInput.value;
        //   let taskDue = taskDateInput.value;
        //   let taskImportant = taskImportantInput.checked;
        //   let targetProject = e.target.dataset.submitTaskTo;

        //   currentProjects.forEach(proj => {
        //     if (proj.id === targetProject) {
        //       addItem(new Task(taskName, taskDetails, taskDue, taskImportant), proj.tasks);

        //       let itemIdPrefix = `${proj.id}-task-`;
        //       setItemId(itemIdPrefix, proj.tasks);
        //       populateLocalStorage(currentProjects);

        //       display(proj.tasks, false);
        //       hideForm(taskForm, addTaskButton);
        //     }
        //   })
        // }        
      }
    })
  })
}

const addListListeners = () => {
  // Instead of adding listener to all list items, add to lists
  // May be more efficient?
  const viewOptionsList = document.querySelectorAll('nav ul');
  viewOptionsList.forEach(list => {
    list.addEventListener('click', (e) => {
      let selection = e.target.closest('li');

      if (selection.classList.contains('project-item')) {
        let projectToDisplay = selection.id;

        currentProjects.forEach(proj => {
          if (proj.id === projectToDisplay) {
            mainPanel.dataset.shownTasks = projectToDisplay;
            mainHeader.textContent = proj.name;
  
            display(proj.tasks, false);
            // Add task listeners: edit, important

          }
        })

        addTaskButton.classList.remove('hidden');
      }




      if (selection.classList.contains('task-view')) {

        if (selection.id === 'all') {
          mainHeader.textContent = 'All Tasks';
          mainPanel.dataset.shownTasks = selection.id;

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
          mainPanel.dataset.shownTasks = selection.id;

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
          mainPanel.dataset.shownTasks = selection.id;

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
          mainPanel.dataset.shownTasks = selection.id;

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

        addTaskButton.classList.add('hidden');
      }

    })
  }) 
}

const addDeleteListeners  = () => {
  const deleteBtn = document.querySelectorAll('.delete-icon');

  deleteBtn.forEach(btn => {
    btn.addEventListener('click', () => {

    })
  })
}

display(currentProjects);
addButtonListeners();
addListListeners();