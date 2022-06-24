import {
  getDay,
  isThisWeek,
  isToday,
  parseISO
} from "date-fns";

// Varaiables. Move later
const projectsPanel = document.querySelector('#projects-panel');
const projectForm = document.querySelector("#projects-panel form");
const addProjectButton = document.querySelector("#add-project");
const projectNameInput = document.querySelector("#project-name-input");

const mainPanel = document.querySelector('main');
const mainHeader = document.querySelector('h1');
const taskForm = document.querySelector('main > form');
const addTaskButton = document.querySelector('main > button');
const taskNameInput = document.querySelector('#task-name-input');
const taskDetailsInput = document.querySelector('#task-details-input');
const taskDateInput = document.querySelector('#task-date-input');
const taskUrgentInput = document.querySelector('#task-urgent-input');
const taskSubmitButton = document.querySelector('#submit-task');

// Data stuff
let currentProjects = !localStorage.length
  ? []
  : JSON.parse(localStorage.getItem("projects"));

// Adding methods to projects
// This saves getId for each proj; inefficient
// currentProjects.forEach(proj => {
//   proj.getId = function () {
//     console.log(this.id);
//   }
// })

// This doesn't work
// "this" points to index.js
// const getId = () => {
//   console.log(this);
// }
// currentProjects.forEach(proj => {
//   proj.getId = getId;
// })
// console.log(currentProjects);


function getName() {
  console.log(this.name);
}

function Project(name) {
  this.name = name;
  this.tasks = [

  ];
}
function Task(name, details, due, urgent) {
  this.name = name;
  this.details = details;
  this.due = due;
  this.urgent = urgent;
}


const addItem = (itemObj, container) => {
  // console.log(container);
  container.push(itemObj);
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
  // console.log(e.target);
  // let isProject = e.target.classList.contains('project');
  // setItemId(isProject, currentProjects);
  // populateLocalStorage(currentProjects);
}
const populateLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

// Can I combine updateCurrentProjects and updateTasks into one function?
const updateTasks = (container) => {
  let taskName = taskNameInput.value;
  let taskDetails = taskDetailsInput.value;
  let taskDue = taskDateInput.value;
  let taskUrgent = taskUrgentInput.checked;

  addItem(new Task(taskName, taskDetails, taskDue, taskUrgent), container)
}

/*
const updateTasks = (e) => {
  // console.log(currentProjects); 
  if (e.target.classList.contains('delete')) {
    let taskToDelete = e.target.parentElement.id;
  } else {
    let taskName = taskNameInput.value;
    let taskDetails = taskDetailsInput.value;
    let taskDue = taskDateInput.value;
    let taskUrgent = taskUrgentInput.checked;
  }

  // currentProjects.forEach(proj => { 
  //   proj.tasks.forEach(task => {
  //     if (task.id === taskToDelete) {
  //       removeItem(taskToDelete, proj.tasks)
  //       console.log(proj.tasks.length);

  //       let isProject = e.target.classList.contains('project');
  //       setItemId(isProject, proj.tasks);
  //       populateLocalStorage(currentProjects);
  //     }

  //   })
  // })
}
*/


// Content creators
const createTaskForm = () => {
  const form = document.createElement("form");

  // const nameLabel = doument.createElement('label');

  const [
    nameLabel,
    detailsLabel,
    dateLabel,
    urgentLabel
  ] = [
    document.createElement("label"),
    document.createElement("label"),
    document.createElement("label"),
    document.createElement("label")
  ];

  [
    nameLabel.htmlFor,
    nameLabel.textContent,
    detailsLabel.htmlFor,
    detailsLabel.textContent,
    dateLabel.htmlFor,
    dateLabel.textContent,
    urgentLabel.htmlFor,
    urgentLabel.textContent
  ] = [
    "name-input",
    "Task name:",
    "details-input",
    "Details:",
    "date-input",
    "Date due:",
    "urgent-input",
    "Important:"
  ];

  const [
    nameInput, 
    dateInput, 
    urgentInput
  ] = [
    document.createElement("input"),
    document.createElement("input"),
    document.createElement("input")
  ];
  const detailsInput = document.createElement("textarea");

  [
    nameInput.id,
    nameInput.type,
    nameInput.placeholder,
    detailsInput.id,
    detailsInput.rows,
    detailsInput.cols,
    detailsInput.wrap,
    detailsInput.placeholder,
    dateInput.id,
    dateInput.type,
    urgentInput.id,
    urgentInput.type
  ] = [
    "name-input",
    "text",
    "buy groceries",
    "details-input",
    "5",
    "30",
    "hard",
    "Carrots, milk, bread",
    "date-input",
    "Date",
    "urgent-input",
    "checkbox"
  ];

  form.append(
    nameLabel,
    nameInput,
    detailsLabel,
    detailsInput,
    dateLabel,
    dateInput,
    urgentLabel,
    urgentInput
  );

  return form;

  // nameLabel.htmlFor =
};


const createProjectContent = (projObj) => {
  const projectListItem = document.createElement('li');
  projectListItem.classList.add('project-item');
  projectListItem.id = projObj.id;

  const projectWrapper = document.createElement('div');
  projectWrapper.classList.add('project-wrapper');
  // projectWrapper.id = projObj.id;

  const projectIcon = document.createElement('span');
  projectIcon.classList.add('material-symbols-rounded', 'icon');
  projectIcon.textContent = 'tools_power_drill';


  const projectTitle = document.createElement('h3');
  projectTitle.textContent = projObj.name

  // const editWrapper = document.createElement('div');
  // editWrapper.classList.add('edit-wrapper');

  // const editIcon = document.createElement('span');
  // editIcon.classList.add('material-symbols-rounded', 'edit');
  // editIcon.textContent = 'more_vert';


  // const editMenu = document.createElement('div');
  // editMenu.classList.add('hidden');

  const projectDeleteBtn = document.createElement('button');
  projectDeleteBtn.classList.add('material-symbols-rounded', 'delete');
  projectDeleteBtn.textContent = 'close';
  projectDeleteBtn.addEventListener('click', (e) => {
    // updateCurrentProjects(e);


    let projectToDelete = e.target.parentElement.parentElement.id;
    // let projectToDelete = e.target.parentElement.id;
    removeItem(projectToDelete, currentProjects);

    // // Reset project Id's after deleting project
    // setItemId('project-', currentProjects);
    // // Reset task Id's within each project after deleting project
    // currentProjects.forEach(proj => {
    //   let itemIdPrefix = `${proj.id}-task-`;
    //   setItemId(itemIdPrefix, proj.tasks);
    // })
    populateLocalStorage(currentProjects);
    
    display(currentProjects);
    addProjectListeners();
  })




  // editWrapper.append(editIcon, editMenu);
  
  projectWrapper.append(projectIcon, projectTitle, projectDeleteBtn);
  projectListItem.append(projectWrapper);
  return projectListItem;
};

const createTaskContent = (taskObj) => {
  const taskListItem = document.createElement('li');
  taskListItem.classList.add('task-item');

  const taskWrapper = document.createElement('div');
  taskWrapper.classList.add('task-wrapper');
  taskWrapper.id = taskObj.id;

  const taskDescrWrapper = document.createElement('div');
  taskDescrWrapper.classList.add('task-descr-wrapper');
  const taskName = document.createElement('h3');
  const taskDetails = document.createElement('p');

  const taskEditWrapper = document.createElement('div');
  taskEditWrapper.classList.add('task-edit-wrapper');
  const taskDueDate = document.createElement('span');
  taskDueDate.classList.add('task-due-date');
  if (taskObj.due) {
    taskDueDate.textContent = taskObj.due;
  } else {
    taskDueDate.textContent = 'No due date';
  }

  const taskUrgentIcon = document.createElement('span');
  taskUrgentIcon.classList.add('material-symbols-rounded', 'urgent-icon');
  taskUrgentIcon.textContent = 'flag';
  if (taskObj.urgent) {
    taskUrgentIcon.classList.add('urgent');
  }
  taskUrgentIcon.addEventListener('click', () => {

    if (taskObj.urgent) {
      taskObj.urgent = false;
    } else {
      taskObj.urgent = true;
    }

    taskUrgentIcon.classList.toggle('urgent');
  })


  const editIcon = document.createElement('span');
  editIcon.classList.add('material-symbols-rounded', 'edit-icon');
  editIcon.textContent = 'more_vert';
  editIcon.dataset.task = taskObj.id;
  editIcon.addEventListener('click', (e) => {
    console.log(e.target.dataset.task)


  })



  taskName.textContent = taskObj.name;
  taskDetails.textContent = taskObj.details;
  // taskDueDate.textContent = taskObj.due;
  // taskUrgent.textContent = taskObj.urgent;






  // const taskDeleteBtn = document.createElement('button');
  // taskDeleteBtn.classList.add('delete');
  // taskDeleteBtn.classList.add('task');

  // taskDeleteBtn.textContent = 'X';
  // taskDeleteBtn.dataset.delete = taskObj.id;

  // taskDeleteBtn.addEventListener('click', (e) => {
  //   // Can also use e.target.parentElement.id
  //   // This is the way when deleting projects
  //   let taskToDelete = e.target.dataset.delete;

  //   for (let i = 0; i < currentProjects.length; i++) {
  //     for (let j = 0; j < currentProjects[i].tasks.length; j++) {
  //       if (currentProjects[i].tasks[j].id === taskToDelete) {
  //         currentProjects[i].tasks.splice(j, 1);
  //         populateLocalStorage(currentProjects);

  //         if (mainPanel.dataset.shownTasks === 'project') {
  //           display(currentProjects[i].tasks, false);
  //         }

  //         if (mainPanel.dataset.shownTasks === 'all') {
  //           let allTasks = [];
  //           currentProjects.forEach(proj => {
  //             proj.tasks.forEach(task => {
  //               allTasks.push(task)
  //               // console.log(task);
  //             })
  //           })
  //           display(allTasks, false);
  //         }

  //         if (mainPanel.dataset.shownTasks === 'today') {
  
  //           let todayTasks = [];
  //           currentProjects.forEach(proj => {
  //             proj.tasks.forEach(task => {
  
  //               if (isToday(parseISO(task.due))) {
  //                 todayTasks.push(task);
  //               }
  
  //             })
  //           })
  
  //           display(todayTasks, false);
  //         }

  //         if (mainPanel.dataset.shownTasks === 'week') {

  //           let weekTasks = [];
  //           currentProjects.forEach(proj => {
  //             proj.tasks.forEach(task => {
  
  //               if (task.due) {
  //                 if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
  //                   weekTasks.push(task)
  //                 }
  //               }
  
  //             })
  //           })
  
  //           display(weekTasks, false);
  //         }

  //         if (mainPanel.dataset.shownTasks === 'important') {
  //           let importantTasks = [];
  //           currentProjects.forEach(proj => {
  //             proj.tasks.forEach(task => {
  //               if (task.urgent) {
  //                 importantTasks.push(task);
  //               }
  //             })
  //           })
  
  //           display(importantTasks, false);
  //         }
  //       }
  //     }
  //   } 

  // })


  taskEditWrapper.append(taskDueDate, taskUrgentIcon, editIcon);
  taskDescrWrapper.append(taskName, taskDetails);
  // taskWrapper.append(taskDescrWrapper, taskEditWrapper, taskDeleteBtn);

  taskWrapper.append(taskDescrWrapper, taskEditWrapper);
  taskListItem.append(taskWrapper);
  
  return taskListItem;
}


// Display controllers
const showForm = (form, input, initBtn) => {
  form.classList.remove("hidden");
  input.focus();
  initBtn.classList.add("hidden");
};
const hideForm = (form, initBtn) => {
  form.reset();
  form.classList.add("hidden");
  initBtn.classList.remove("hidden");
};
const display = (list, isProject = true) => {
  let oldList;
  let listId;
  let container;
  let form;

  if (isProject) {
    oldList = document.querySelector('#project-list');
    listId = 'project-list';
    container = projectsPanel;
    form = projectForm;
  } else {
    oldList = document.querySelector('#task-list');
    listId = 'task-list';
    container = mainPanel;
    form = taskForm;
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

  container.insertBefore(currentList, form);
}


// Listeners
const addButtonListeners = () => {
  const applicationButtons = document.querySelectorAll('button');
  // console.log(applicationButtons);
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Buttons in the projects panel
      if (e.target.classList.contains('project')) {

        if (e.target.id === 'add-project') {
          showForm(projectForm, projectNameInput, addProjectButton);
        }

        if (e.target.id === 'cancel-project') {
          hideForm(projectForm, addProjectButton);
        }

        if (e.target.id === 'submit-project') {
          updateCurrentProjects(e);
          setItemId('project-', currentProjects);
          populateLocalStorage(currentProjects);

          display(currentProjects);
          hideForm(projectForm, addProjectButton);
          addProjectListeners();
        }
      }

      if (e.target.classList.contains('task')) {

        if (e.target.id === 'add-task') {
          showForm(taskForm, taskNameInput, addTaskButton);
        }

        if (e.target.id === 'cancel-task') {
          hideForm(taskForm, addTaskButton);
        }

        if (e.target.id === 'submit-task') {
          let taskName = taskNameInput.value;
          let taskDetails = taskDetailsInput.value;
          let taskDue = taskDateInput.value;
          let taskUrgent = taskUrgentInput.checked;

          let targetProject = e.target.dataset.submitTaskTo;
          currentProjects.forEach(proj => {
            if (proj.id === targetProject) {
              addItem(new Task(taskName, taskDetails, taskDue, taskUrgent), proj.tasks);

              let itemIdPrefix = `${proj.id}-task-`;
              setItemId(itemIdPrefix, proj.tasks);
              populateLocalStorage(currentProjects);

              display(proj.tasks, false);
              hideForm(taskForm, addTaskButton);
            }
          })
        }        
      }

      if (e.target.classList.contains('view')) {

        if (e.target.id === 'all') {
          mainHeader.textContent = 'All Tasks';
          mainPanel.dataset.shownTasks = e.target.id;

          let allTasks = [];
          currentProjects.forEach(proj => {
            proj.tasks.forEach(task => {
              allTasks.push(task)
              // console.log(task);
            })
          })

          display(allTasks, false);
        }

        if (e.target.id === 'today') {
          mainHeader.textContent = 'Today';
          mainPanel.dataset.shownTasks = e.target.id;

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

        if (e.target.id === 'week') {
          mainHeader.textContent = 'Next 7 Days';
          mainPanel.dataset.shownTasks = e.target.id;

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

        if (e.target.id === 'important') {
          mainHeader.textContent = 'Important';
          mainPanel.dataset.shownTasks = e.target.id;

          let importantTasks = [];
          currentProjects.forEach(proj => {
            proj.tasks.forEach(task => {
              if (task.urgent) {
                importantTasks.push(task);
              }
            })
          })

          display(importantTasks, false);
        }

        addTaskButton.classList.add('hidden');
        taskForm.classList.add('hidden');
      }
    })
  })
}

const addProjectListeners = () => {
  const projects = document.querySelectorAll('.project-item');
  projects.forEach(proj => {
    proj.addEventListener('click', (e) => {
      if (e.target.nodeName !== 'BUTTON') {

        let projectToDisplay = e.currentTarget.id;
        currentProjects.forEach(proj => {
          if (proj.id === projectToDisplay) {
            mainPanel.dataset.shownTasks = 'project';
            mainHeader.textContent = proj.name;
            taskSubmitButton.dataset.submitTaskTo = proj.id;
  
            display(proj.tasks, false);
            hideForm(taskForm, addTaskButton);
            addTaskButton.classList.remove('hidden');
          }
        })
      }
    })
  })
}

// const addProjectListeners = () => {
//   // const projects = document.querySelectorAll('.project-wrapper h3');
//   const projects = document.querySelectorAll('.project-item');
//   projects.forEach(proj => {
//     proj.addEventListener('click', (e) => {

//       // e.stopPropagation;
//       // console.log(e);
//       console.log(e.target.nodeName)
//       console.log(e.currentTarget.id);
      

//       // let projectToDisplay = e.target.parentElement.id;

//       let projectToDisplay = e.target.id;

//       // console.log(projectToDisplay);
//       currentProjects.forEach(proj => {
//         if (proj.id === projectToDisplay) {
//           // mainPanel.classList.add('project');
//           // mainPanel.classList.remove('view');
//           mainPanel.dataset.shownTasks = 'project';
//           mainHeader.textContent = proj.name;

//           // console.log(proj.id)
//           taskSubmitButton.dataset.submitTaskTo = proj.id;

//           display(proj.tasks, false);
//           hideForm(taskForm, addTaskButton);
//           addTaskButton.classList.remove('hidden');
//         }
//       })
//     })
//   })
// }


display(currentProjects);
addButtonListeners();
addProjectListeners();


