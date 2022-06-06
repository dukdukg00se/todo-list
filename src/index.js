// Varaiables. Move later
const projectForm = document.querySelector("#projects-panel form");
const projectTextInput = document.querySelector("#project-name-input");
const addProjectButton = document.querySelector("#add-project");
const projectsPanel = document.querySelector('#projects-panel');

const mainPanel = document.querySelector('main');
const mainHeader = document.querySelector('h1');
const mainForm = document.querySelector('main > form');

// Data stuff
let currentProjects = !localStorage.length
  ? []
  : JSON.parse(localStorage.getItem("projects"));


function Project(name) {
  this.name = name
  this.tasks = [];
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
const setItemId = (e, container) => {
  for (let i = 0; i < container.length; i++) {
    e.target.parentElement.id === 'submit-project'
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

  setItemId(e, currentProjects);
  populateLocalStorage(currentProjects);

}


const populateLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};



// Display stuff
const showForm = () => {
  projectForm.classList.toggle("hidden");
  projectTextInput.focus();
  addProjectButton.classList.toggle("hidden");
};
const hideForm = () => {
  projectForm.reset();
  projectForm.classList.toggle("hidden");
  addProjectButton.classList.toggle("hidden");
};

const createProjectContent = (projectObj) => {
  const projectListItem = document.createElement('li');

  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-container');
  projectContainer.id = projectObj.id;

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = projectObj.name

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.classList.add('project');
  deleteBtn.textContent = 'X';
  
  deleteBtn.addEventListener('click', (e) => {
    updateCurrentProjects(e);
    displayProjects(currentProjects);
  })
  
  projectContainer.append(projectTitle, deleteBtn);
  projectListItem.append(projectContainer);
  return projectListItem;
};

const displayProjects = (projects) => {
  // let activeProjects = JSON.parse(localStorage.getItem('projects'));
  const oldProjectsList = document.querySelector('#projects-list');
  
  if (projects) {
    if (projectsPanel.contains(oldProjectsList)) {
      oldProjectsList.remove();
    }

    const currentProjects = document.createElement('ul');
    currentProjects.id = 'projects-list';
    projects.forEach(proj => {
      currentProjects.append(createProjectContent(proj));
    })
    projectsPanel.insertBefore(currentProjects, projectForm);
  }
};

const displayTasks = (e, projects) => {
  let selectedProject = e.target.parentElement.id;

  projects.forEach(proj => {
    if (proj.id === selectedProject) {
      mainHeader.textContent = proj.name;
    }
  })

}

const displayTaskContent = (e) => {
  let activeProjects = JSON.parse(localStorage.getItem('projects'));
  let projectToDisplay;


  const oldTaskList = document.querySelector('.task-list');

  if (e.target.nodeName === 'H3') {
    projectToDisplay = e.target.parentElement.id;

    activeProjects.forEach(proj => {
      if (proj.id === projectToDisplay) {
        mainHeader.textContent = proj.name;

        if (proj.tasks) {

          if (mainPanel.contains(oldTaskList)) {
            oldTaskList.remove();
          }

          const taskContainer = document.createElement('ul');
          taskContainer.classList.add('task-list');

          proj.tasks.forEach(task => {
            taskContainer.append(createTaskContent(task));
          })
          mainPanel.insertBefore(taskContainer, mainForm);
        }
      }
    })
  }

  if (e.target.id === 'submit-task') {
    projectToDisplay = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;

    activeProjects.forEach(proj => {
      if (proj.name === projectToDisplay) {

        if (proj.tasks) {

          if (mainPanel.contains(oldTaskList)) {
            oldTaskList.remove();
          }

          const taskContainer = document.createElement('ul');
          taskContainer.classList.add('task-list');

          proj.tasks.forEach(task => {
            taskContainer.append(createTaskContent(task));
          })
          mainPanel.insertBefore(taskContainer, mainForm);
        }
      }
    })
  }
}





// Panel controller
const addListeners = () => {
  const applicationButtons = document.querySelectorAll('button');
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Buttons in the projects panel
      if (e.target.classList.contains('project')) {

        if (e.target.id === 'add-project') {
          showForm();
        }

        if (e.target.id === 'cancel-project') {
          hideForm();
        }

        if (e.target.id === 'submit-project') {
          updateCurrentProjects(e);
          displayProjects(currentProjects);
          hideForm();
        }


      }

    })
  })

  const projects = document.querySelectorAll('.project-container h3');
  projects.forEach(proj => {
    proj.addEventListener('click', (e) => {
      console.log(e.target);
      displayTasks(e, currentProjects);
    })
  })

}


displayProjects(currentProjects);
addListeners();


