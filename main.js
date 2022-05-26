/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixHQUFHOztBQUVIO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcm9qZWN0c0RhdGFDb250cm9sbGVyID0gKCgpID0+IHtcbiAgLy8gRGVmaW5lIHByb2plY3RzIGNvbnRhaW5lciBvbiBzdGFydFxuICBjb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lciA9ICFsb2NhbFN0b3JhZ2UubGVuZ3RoXG4gICAgICA/IFtdXG4gICAgICA6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XG4gICAgcmV0dXJuIHsgY29udGFpbmVyIH07XG4gIH0pKCk7XG5cbiAgY29uc3QgY3JlYXRlUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBbXTtcbiAgICByZXR1cm4geyBuYW1lLCB0YXNrcyB9O1xuICB9O1xuXG4gIGNvbnN0IHNhdmVQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBuYW1lID0gY3JlYXRlUHJvamVjdChuYW1lKTtcbiAgICBwcm9qZWN0cy5jb250YWluZXIucHVzaChuYW1lKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKHByb2plY3RJZCwgcHJvamVjdENvbnRhaW5lcikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdENvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHByb2plY3RDb250YWluZXJbaV0uaWQgPT09IHByb2plY3RJZCkge1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0UHJvamVjdElkID0gKHByb2plY3RzQXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgcHJvamVjdHNBcnJbaV0uaWQgPSBcInByb2plY3QtXCIgKyBpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUxvY2FsU3RvcmFnZSA9IChwcm9qZWN0c0FycikgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnIpKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVQcm9qZWN0cyA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZVwiKSkge1xuICAgICAgbGV0IHByb2plY3RUb0RlbGV0ZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQ7XG4gICAgICByZW1vdmVQcm9qZWN0KHByb2plY3RUb0RlbGV0ZSwgcHJvamVjdHMuY29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvamVjdFRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRleHQtaW5wdXQnKTtcbiAgICAgIGxldCBwcm9qZWN0TmFtZSA9IHByb2plY3RUZXh0SW5wdXQudmFsdWU7XG4gICAgICBzYXZlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgfVxuXG4gICAgc2V0UHJvamVjdElkKHByb2plY3RzLmNvbnRhaW5lcik7XG4gICAgcG9wdWxhdGVMb2NhbFN0b3JhZ2UocHJvamVjdHMuY29udGFpbmVyKTtcbiAgfTtcblxuICByZXR1cm4geyB1cGRhdGVQcm9qZWN0cyB9O1xufSkoKTtcblxuY29uc3QgcHJvamVjdHNEaXNwbGF5Q29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWZvcm1cIik7XG4gIGNvbnN0IHByb2plY3RUZXh0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGV4dC1pbnB1dFwiKTtcbiAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXByb2plY3RcIik7XG4gIGNvbnN0IHByb2plY3RzUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtcGFuZWwnKTtcblxuICBjb25zdCBzaG93Rm9ybSA9ICgpID0+IHtcbiAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIHByb2plY3RUZXh0SW5wdXQuZm9jdXMoKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH07XG5cbiAgY29uc3QgaGlkZUZvcm0gPSAoKSA9PiB7XG4gICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGFkZFByb2plY3RCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQcm9qZWN0Q29udGVudCA9IChwcm9qZWN0T2JqKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlkID0gcHJvamVjdE9iai5pZDtcbiAgXG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqLm5hbWVcbiAgXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZScpO1xuICAgIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9ICdYJztcbiAgICBcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgcHJvamVjdHNEYXRhQ29udHJvbGxlci51cGRhdGVQcm9qZWN0cyhlKTtcbiAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuICAgIH0pXG4gICAgXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmQocHJvamVjdFRpdGxlLCBkZWxldGVCdG4pO1xuICAgIHByb2plY3RMaXN0SXRlbS5hcHBlbmQocHJvamVjdENvbnRhaW5lcik7XG4gICAgcmV0dXJuIHByb2plY3RMaXN0SXRlbTtcbiAgfTtcblxuICBjb25zdCByZW1vdmUgPSAoY29udGFpbmVyLCBlbGVtZW50KSA9PiB7XG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saXN0Jyk7XG5cbiAgICBpZiAoYWN0aXZlUHJvamVjdHMpIHtcbiAgICAgIGlmIChwcm9qZWN0c1BhbmVsLmNvbnRhaW5zKHByb2plY3RzTGlzdCkpIHtcbiAgICAgICAgcmVtb3ZlKHByb2plY3RzUGFuZWwsIHByb2plY3RzTGlzdCk7XG4gICAgICB9XG4gIFxuICAgICAgY29uc3Qgc3ViQ29udG5yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgIHN1YkNvbnRuci5pZCA9ICdwcm9qZWN0cy1saXN0JztcbiAgICAgIGFjdGl2ZVByb2plY3RzLmZvckVhY2gocHJvaiA9PiB7XG4gICAgICAgIHN1YkNvbnRuci5hcHBlbmQoY3JlYXRlUHJvamVjdENvbnRlbnQocHJvaikpO1xuICAgICAgfSlcbiAgICAgIHByb2plY3RzUGFuZWwuaW5zZXJ0QmVmb3JlKHN1YkNvbnRuciwgcHJvamVjdEZvcm0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNob3dGb3JtLFxuICAgIGhpZGVGb3JtLFxuICAgIGRpc3BsYXlQcm9qZWN0c1xuICB9O1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==