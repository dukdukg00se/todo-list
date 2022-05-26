const projectsDataController = (() => {
  // Define projects container on start
  const projects = (() => {
    let container = !localStorage.length
      ? []
      : JSON.parse(localStorage.getItem("projects"));
    return { container };
  })();

  const createProject = (name) => {
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
      const projectTextInput = document.querySelector('#project-text-input');
      let projectName = projectTextInput.value;
      saveProject(projectName);
    }

    setProjectId(projects.container);
    populateLocalStorage(projects.container);
  };

  return { updateProjects };
})();

const projectsDisplayController = (() => {
  const projectForm = document.querySelector("#project-form");
  const projectTextInput = document.querySelector("#project-text-input");
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

  const createProjectContent = (projectObj) => {
    const projectListItem = document.createElement('li');

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');
    projectContainer.id = projectObj.id;
  
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = projectObj.name
  
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'X';
    
    deleteBtn.addEventListener('click', (e) => {
      projectsDataController.updateProjects(e);
      displayProjects();
    })
    
    projectContainer.append(projectTitle, deleteBtn);
    projectListItem.append(projectContainer);
    return projectListItem;
  };

  const remove = (container, element) => {
    container.removeChild(element);
  }

  const displayProjects = () => {
    let activeProjects = JSON.parse(localStorage.getItem('projects'));
    const projectsList = document.querySelector('#projects-list');

    if (activeProjects) {
      if (projectsPanel.contains(projectsList)) {
        remove(projectsPanel, projectsList);
      }
  
      const subContnr = document.createElement('ul');
      subContnr.id = 'projects-list';
      activeProjects.forEach(proj => {
        subContnr.append(createProjectContent(proj));
      })
      projectsPanel.insertBefore(subContnr, projectForm);
    }
  };

  return {
    showForm,
    hideForm,
    displayProjects
  };
})();
