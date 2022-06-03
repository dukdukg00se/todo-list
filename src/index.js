// Data stuff
let projectContainer = !localStorage.length
  ? []
  : JSON.parse(localStorage.getItem("projects"));


function Project(name) {
  this.name = name
  this.tasks = [];
}
Project.prototype = {
  constructor: Project,

  addItem: function (container) {
    container.push(this);
  },

  removeItem: function (itemId, container) {
    for (let i = 0; i < container.length; i++) {
      if (container[i].id === itemId) {
        container.splice(i, 1);
      }
    }
  },

  setItemId: function (item, container) {
    for (let i = 0; i < container.length; i++) {
      item === Project
        ? (container[i].id = 'project-' + i)
        : (container[i].id = 'task-' + i);
    }
  }
}

function Task(name, details, date) {
  this.name = name;
  this.details = details;
  this.date = date;
}
Task.prototype = Object.create(Project.prototype);

const populateLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};


// Display stuff
const updateProjects = (e) => {
  if (e.target.classList.contains("delete")) {
    let projectToDelete = e.target.parentElement.id;
    // removeProject(projectToDelete, projects.container);

    console.log(projectToDelete);
    // console.log(projectContainer);

    projectContainer.forEach(project => {
      project.prototype = Object.create(Project.prototype);
      project.prototype.removeItem(projectToDelete, projectContainer);

    });
    console.log(projectContainer);
    populateLocalStorage(projectContainer);
    displayProjects();


  } 
  
  
  // else {
  //   const projectTextInput = document.querySelector('#project-name-input');
  //   let projectName = projectTextInput.value;
  //   saveProject(projectName);
  // }

  // setProjectId(projects.container);
  // populateLocalStorage(projects.container);
};


const createProjectContent = (projectObj) => {
  const projectListItem = document.createElement('li');

  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-item');
  projectContainer.id = projectObj.id;

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = projectObj.name

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.textContent = 'X';
  
  deleteBtn.addEventListener('click', (e) => {
    updateProjects(e);
    // projectsDisplayController.displayProjects();
  })
  
  projectContainer.append(projectTitle, deleteBtn);
  projectListItem.append(projectContainer);
  return projectListItem;
};

const displayProjects = () => {
  let activeProjects = JSON.parse(localStorage.getItem('projects'));
  const oldProjectsList = document.querySelector('#projects-list');
  
  // Refactor this later
  const projectsPanel = document.querySelector('#projects-panel');
  const projectForm = document.querySelector("#projects-panel form");

  if (activeProjects) {
    if (projectsPanel.contains(oldProjectsList)) {
      oldProjectsList.remove();
    }

    const projectsList = document.createElement('ul');
    projectsList.id = 'projects-list';
    activeProjects.forEach(proj => {
      projectsList.append(createProjectContent(proj));
    })
    projectsPanel.insertBefore(projectsList, projectForm);
  }
};

const addListeners = () => {
  const applicationButtons = document.querySelectorAll('button');
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('project')) {
        const projectForm = document.querySelector("#projects-panel form");
        const projectTextInput = document.querySelector("#project-name-input");
        const addProjectButton = document.querySelector("#add-project");
        const projectsPanel = document.querySelector('#projects-panel');

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

        if (e.target.id === 'add-project') {
          showForm();
        }

        if (e.target.id === 'cancel-project') {
          hideForm();
        }

        if (e.target.id === 'submit-project') {
          let projectName = projectTextInput.value;
          projectName = new Project(projectName);
          projectName.addItem(projectContainer);
          projectName.setItemId(projectName.constructor, projectContainer);
          populateLocalStorage(projectContainer);

          displayProjects();

        }

      }
    })
  })
}

addListeners();
displayProjects();