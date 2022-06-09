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


function Project(name) {
  this.name = name;
  this.tasks = [
    // {
    //   name: 'work',
    //   details: 'carrots, eggs, milk',
    //   due: '1-1-2019',
    //   urgent: false,
    //   id: 'work-task-0'
    // },
    // {
    //   name: 'shop',
    //   details: '',
    //   due: '',
    //   urgent: false,
    //   id: 'shop-task-1'
    // }
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

// const setItemId = (isProject, container) => {
//   for (let i = 0; i < container.length; i++) {
//     isProject === true
//       ? (container[i].id = 'project-' + i)
//       : (container[i].id = container[i].id + '-task-' + i); 
//   }
// }

const updateCurrentProjects = (e) => {
  if (e.target.classList.contains('delete')) {
    let projectToDelete = e.target.parentElement.id;
    removeItem(projectToDelete, currentProjects);
  } else {
    let projectName = projectNameInput.value;
    addItem(new Project(projectName), currentProjects);
  }
  
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
const createProjectContent = (projObj) => {
  const projectListItem = document.createElement('li');
  projectListItem.classList.add('project-item');

  const projectWrapper = document.createElement('div');
  projectWrapper.classList.add('project-wrapper');
  projectWrapper.id = projObj.id;

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = projObj.name

  const projectDeleteBtn = document.createElement('button');
  projectDeleteBtn.classList.add('delete');
  projectDeleteBtn.classList.add('project');
  projectDeleteBtn.textContent = 'X';
  
  projectDeleteBtn.addEventListener('click', (e) => {
    updateCurrentProjects(e);
    setItemId('project-', currentProjects);
    populateLocalStorage(currentProjects);
    
    display(currentProjects);
    addProjectListeners();
  })
  
  projectWrapper.append(projectTitle, projectDeleteBtn);
  projectListItem.append(projectWrapper);
  return projectListItem;
};
const createTaskContent = (taskObj) => {
  const taskListItem = document.createElement('li');
  taskListItem.classList.add('task-item');

  const taskWrapper = document.createElement('div');
  taskWrapper.classList.add('task-wrapper');
  taskWrapper.id = taskObj.id;

  const taskInfoWrapper = document.createElement('div');
  const taskName = document.createElement('h3');
  const taskDetails = document.createElement('p');
  const taskSpanWrapper = document.createElement('div');
  const taskDue = document.createElement('span');
  const taskUrgent = document.createElement('span');
  const taskDeleteBtn = document.createElement('button');
  taskDeleteBtn.classList.add('delete');
  taskDeleteBtn.classList.add('task');

  taskName.textContent = taskObj.name;
  taskDetails.textContent = taskObj.details;
  taskDue.textContent = taskObj.due;
  taskUrgent.textContent = taskObj.urgent;
  taskDeleteBtn.textContent = 'X';
  taskDeleteBtn.dataset.delete = taskObj.id;

  taskDeleteBtn.addEventListener('click', (e) => {
    let taskToDelete = e.target.dataset.delete;
    currentProjects.forEach(proj => {
      proj.tasks.forEach(tasks => {
        if (tasks.id === taskToDelete) {
          removeItem(taskToDelete, proj.tasks);
          let itemIdPrefix = `${proj.id}-task-`;
          setItemId(itemIdPrefix, proj.tasks);
          populateLocalStorage(currentProjects);

          display(proj.tasks, false);
        }
      })
    })
  })

  taskSpanWrapper.append(taskDue, taskUrgent);
  taskInfoWrapper.append(taskName, taskDetails);
  taskWrapper.append(taskInfoWrapper, taskSpanWrapper, taskDeleteBtn);
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
    })
  })
}

const addProjectListeners = () => {
  const projects = document.querySelectorAll('.project-wrapper h3');
  projects.forEach(proj => {
    proj.addEventListener('click', (e) => {
      // console.log('test');

      projectToDisplay = e.target.parentElement.id;
      currentProjects.forEach(proj => {
        if (proj.id === projectToDisplay) {
          mainHeader.textContent = proj.name;

          taskSubmitButton.dataset.submitTaskTo = proj.id;

          display(proj.tasks, false);
          hideForm(taskForm, addTaskButton);
        }
      })
    })
  })
}


display(currentProjects);
addButtonListeners();
addProjectListeners();


