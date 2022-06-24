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
    projectsDataController.updateProjects(e);
    projectsDisplayController.displayProjects();
  })
  
  projectContainer.append(projectTitle, deleteBtn);
  projectListItem.append(projectContainer);
  return projectListItem;
};


const projectsDataController = (() => {
  // Define projects container on start
  const projects = (() => {
    let container = !localStorage.length
      ? []
      : JSON.parse(localStorage.getItem("projects"));
    return { container };
  })();

  const createProject = (name) => {

    // Add example task for testing
    const tasks = [];

    return { name, tasks };
  };

  
  const saveProject = (name) => {
    name = createProject(name);
    projects.container.push(name);
  };

  const removeProject = (projectId, projectContainer) => {
    for (let i = 0; i < projectContainer.length; i++) {
      if (projectContainer[i].id === projectId) {
        projectContainer.splice(i, 1);
      }
    }
  };

  const setProjectId = (projectsArr) => {
    for (let i = 0; i < projectsArr.length; i++) {
      projectsArr[i].id = "project-" + i;
    }
  };

  const populateLocalStorage = (projectsArr) => {
    localStorage.setItem("projects", JSON.stringify(projectsArr));
  };

  const updateProjects = (e) => {
    if (e.target.classList.contains("delete")) {
      let projectToDelete = e.target.parentElement.id;
      removeProject(projectToDelete, projects.container);
    } else {
      const projectTextInput = document.querySelector('#project-name-input');
      let projectName = projectTextInput.value;
      saveProject(projectName);
    }

    setProjectId(projects.container);
    populateLocalStorage(projects.container);
  };

  return { updateProjects, populateLocalStorage, projects };
})();


const projectsDisplayController = (() => {
  const projectForm = document.querySelector("#project-form");
  const projectTextInput = document.querySelector("#project-name-input");
  const addProjectButton = document.querySelector("#add-project");
  const projectsPanel = document.querySelector('#projects-panel');

  const showForm = () => {
    projectForm.classList.remove("hidden");
    projectTextInput.focus();
    addProjectButton.classList.add("hidden");
  };

  const hideForm = () => {
    projectForm.reset();
    projectForm.classList.add("hidden");
    addProjectButton.classList.remove("hidden");
  };

  //Use built in remove method
  // const remove = (container, element) => {
  //   container.removeChild(element);
  // }

  const displayProjects = () => {
    let activeProjects = JSON.parse(localStorage.getItem('projects'));
    const oldProjectsList = document.querySelector('#projects-list');

    if (activeProjects) {
      if (projectsPanel.contains(oldProjectsList)) {
        // instead of using custom function, use the built in remove method
        // remove(projectsPanel, oldProjectsList); 
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

  return {
    showForm,
    hideForm,
    displayProjects
  };
})();


const projectsPanelController = (e) => {

  if (e.target.id === 'add-project') {
    projectsDisplayController.showForm();
  }

  if (e.target.id === 'cancel-project') {
    projectsDisplayController.hideForm();
  }

  if (e.target.id === 'submit-project') {
    projectsDataController.updateProjects(e);
    projectsDisplayController.displayProjects();
    projectsDisplayController.hideForm();
  }
}

export {
  projectsDataController,
  projectsDisplayController, 
  projectsPanelController
}