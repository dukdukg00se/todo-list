const projectsDataController = (() => {
  // Define projects container on start
  const projects = (() => {
    let container = !localStorage.length
      ? []
      : JSON.parse(localStorage.getItem("projects"));
    return { container };
  })();

  // Factory function to create a new project
  const createProject = (name) => {
    const tasks = [];
    return { name, tasks };
  };

  // Save project to projects container array
  const saveProject = (name) => {
    name = createProject(name);
    projects.container.push(name);
  };

  // Remove project to projects container array
  const removeProject = (projectId, projectContainer) => {
    for (let i = 0; i < projectContainer.length; i++) {
      if (projectContainer[i].id === projectId) {
        projectContainer.splice(i, 1);
      }
    }
  };

  // Function to reset the project Id's after removing a project
  const setProjectId = (projectsArr) => {
    for (let i = 0; i < projectsArr.length; i++) {
      projectsArr[i].id = "project-" + i;
    }
  };

  // Saves the projects container array to localStorage under key "projects"
  const populateLocalStorage = (projectsArr) => {
    localStorage.setItem("projects", JSON.stringify(projectsArr));
  };

  // Public function that saves projects container changes to localStorage
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

