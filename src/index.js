// import { container } from "webpack";

// Varaiables. Move later
const projectForm = document.querySelector("#projects-panel form");
const projectTextInput = document.querySelector("#project-name-input");
const addProjectButton = document.querySelector("#add-project");
const projectsPanel = document.querySelector('#projects-panel');

const mainPanel = document.querySelector('main');
const mainHeader = document.querySelector('h1');
const taskForm = document.querySelector('main > form');
const taskTextInput = document.querySelector('#task-name-input');
const addTaskButton = document.querySelector('main > button');


// Data stuff
let currentProjects = !localStorage.length
  ? []
  : JSON.parse(localStorage.getItem("projects"));


function Project(name) {
  this.name = name
  this.tasks = [
    {
      name: 'work',
      details: '',
      date: '1-1-2019'
    }
  ];
}
function Task(name, details, date) {
  this.name = name;
  this.details = details;
  this.date = date;
}


const addItem = (itemObj, container) => {
  container.push(itemObj);
}
const removeItem = (itemId, container) => {
  for (let i = 0; i < container.length; i++) {
    if (container[i].id === itemId) {
      container.splice(i, 1);
    }
  }
}
const setItemId = (type, container) => {
  for (let i = 0; i < container.length; i++) {
    type === 'submit-project'
      ? (container[i].id = 'project-' + i)
      : (container[i].id = 'task-' + i);
  }
}


const updateCurrentProjects = (e) => {
  if (e.target.classList.contains('delete')) {
    let projectToDelete = e.target.parentElement.id;
    removeItem(projectToDelete, currentProjects);
  } else {
    let projectName = projectTextInput.value;
    addItem(new Project(projectName), currentProjects);
  }
  
  let type = e.target.id;
  setItemId(type, currentProjects);
  populateLocalStorage(currentProjects);
}

const populateLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};


// Content creators
const createProjectContent = (projObj) => {
  const projectListItem = document.createElement('li');

  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-container');
  projectContainer.id = projObj.id;

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = projObj.name

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.classList.add('project');
  deleteBtn.textContent = 'X';
  
  deleteBtn.addEventListener('click', (e) => {
    updateCurrentProjects(e);
    // displayProjects(currentProjects);
    display(currentProjects);
    addProjectListeners();
  })
  
  projectContainer.append(projectTitle, deleteBtn);
  projectListItem.append(projectContainer);
  return projectListItem;
};

const createTaskContent = (taskObj) => {
  const taskListItem = document.createElement('li');
  taskListItem.classList.add('task-item');
  const taskItemWrapper = document.createElement('div');
  taskItemWrapper.classList.add('task-wrapper');
  const taskInfoWrapper = document.createElement('div');
  const taskName = document.createElement('h3');
  const taskDetails = document.createElement('p');
  const taskSpanWrapper = document.createElement('div');
  const taskDate = document.createElement('span');
  const taskUrgent = document.createElement('span');
  const taskDeleteBtn = document.createElement('button');


  taskName.textContent = taskObj.name;
  taskDetails.textContent = taskObj.details;
  taskDate.textContent = taskObj.due;
  taskUrgent.textContent = taskObj.urgent;
  taskDeleteBtn.textContent = 'X';
  taskDeleteBtn.addEventListener('click', (e) => {
    console.log(e.target);
  })


  taskSpanWrapper.append(taskDate, taskUrgent);
  taskInfoWrapper.append(taskName, taskDetails);
  taskItemWrapper.append(taskInfoWrapper, taskSpanWrapper, taskDeleteBtn);
  taskListItem.append(taskItemWrapper);
  
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

// const displayProjects = (projects) => {
//   // console.log(projects);
//   if (projects) {
//     const oldProjectsList = document.querySelector('#project-list');
//     if (projectsPanel.contains(oldProjectsList)) {
//       oldProjectsList.remove();
//     }

//     const currentProjects = document.createElement('ul');
//     currentProjects.id = 'project-list';
//     projects.forEach(proj => {
//       currentProjects.append(createProjectContent(proj));
//     })
//     projectsPanel.insertBefore(currentProjects, projectForm);
//   }
// };

// const displayTasks = (tasks) => {
//   if (tasks) {
//     const oldTaskList = document.querySelector('#task-list');
//     if (mainPanel.contains(oldTaskList)) {
//       oldTaskList.remove();
//     }

//     const currentTasks = document.createElement('ul');
//     currentTasks.id = 'task-list';
//     tasks.forEach(task => {
//       currentTasks.append(createTaskContent(task));
//     })
//     mainPanel.insertBefore(currentTasks, taskForm);
//   }
// }

const display = (list) => {

  if (list) {
    // Check if list is a list of projects by checking if first item contains a tasks property
    let isProject = !!list[0].tasks;
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
}

// const display = (list, e) => {
//   console.log(list);
//   if (list) {
//     let isProject= e.target.classList.contains('project');
//     let oldList;
//     let listId;
//     let container;
//     let form;

//     if (isProject) {
//       oldList = document.querySelector('#project-list');
//       listId = 'project-list';
//       container = projectsPanel;
//       form = projectForm;
//     } else {
//       oldList = document.querySelector('#task-list');
//       listId = 'task-list';
//       container = mainPanel;
//       form = taskForm;
//     }

//     if (container.contains(oldList)) {
//       oldList.remove();
//     }

//     const currentList = document.createElement('ul');
//     currentList.id = listId;
//     list.forEach(item => { 
//       currentList.append(
//         isProject ? createProjectContent(item) : createTaskContent(item)
//       );
//     })

//     container.insertBefore(currentList, form);
//   }
// }


// Listeners




const addButtonListeners = () => {
  const applicationButtons = document.querySelectorAll('button');
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Buttons in the projects panel
      if (e.target.classList.contains('project')) {

        if (e.target.id === 'add-project') {
          showForm(projectForm, projectTextInput, addProjectButton);
        }

        if (e.target.id === 'cancel-project') {
          hideForm(projectForm, addProjectButton);
        }

        if (e.target.id === 'submit-project') {
          updateCurrentProjects(e);
          // displayProjects(currentProjects);
          display(currentProjects)
          hideForm(projectForm, addProjectButton);
          addProjectListeners();
        }
      }

      if (e.target.classList.contains('task')) {

        if (e.target.id === 'add-task') {
          showForm(taskForm, taskTextInput, addTaskButton);
        }

        if (e.target.id === 'cancel-task') {
          hideForm(taskForm, addTaskButton);
        }
      }
    })
  })
}

const addProjectListeners = () => {
  const projects = document.querySelectorAll('.project-container h3');
  projects.forEach(proj => {
    proj.addEventListener('click', (e) => {
      projectToDisplay = e.target.parentElement.id;
      currentProjects.forEach(proj => {
        if (proj.id === projectToDisplay) {
          mainHeader.textContent = proj.name;
          display(proj.tasks);
          hideForm(taskForm, addTaskButton);
        }
      })
    })
  })
}


display(currentProjects);
addButtonListeners();
addProjectListeners();


