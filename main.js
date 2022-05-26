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
    projectsDisplayController.displayProjects();
  })
  
  projectContainer.append(projectTitle, deleteBtn);
  projectListItem.append(projectContainer);
  return projectListItem;
};

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

  const remove = (container, element) => {
    container.removeChild(element);
  }

  const displayProjects = () => {
    let activeProjects = JSON.parse(localStorage.getItem('projects'));
    const oldProjectsList = document.querySelector('#projects-list');

    if (activeProjects) {
      if (projectsPanel.contains(oldProjectsList)) {
        remove(projectsPanel, oldProjectsList);
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

projectsDisplayController.displayProjects();

const addProjectButtonsGroup = document.querySelectorAll('.add-project-buttons');
addProjectButtonsGroup.forEach(btn => {
  btn.addEventListener('click', projectsPanelController);
})


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixHQUFHOztBQUVIO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvamVjdHNEYXRhQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIC8vIERlZmluZSBwcm9qZWN0cyBjb250YWluZXIgb24gc3RhcnRcbiAgY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICAgIGxldCBjb250YWluZXIgPSAhbG9jYWxTdG9yYWdlLmxlbmd0aFxuICAgICAgPyBbXVxuICAgICAgOiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuICAgIHJldHVybiB7IGNvbnRhaW5lciB9O1xuICB9KSgpO1xuXG4gIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgcmV0dXJuIHsgbmFtZSwgdGFza3MgfTtcbiAgfTtcblxuICBjb25zdCBzYXZlUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgbmFtZSA9IGNyZWF0ZVByb2plY3QobmFtZSk7XG4gICAgcHJvamVjdHMuY29udGFpbmVyLnB1c2gobmFtZSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChwcm9qZWN0SWQsIHByb2plY3RDb250YWluZXIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RDb250YWluZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm9qZWN0Q29udGFpbmVyW2ldLmlkID09PSBwcm9qZWN0SWQpIHtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldFByb2plY3RJZCA9IChwcm9qZWN0c0FycikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHByb2plY3RzQXJyW2ldLmlkID0gXCJwcm9qZWN0LVwiICsgaTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcG9wdWxhdGVMb2NhbFN0b3JhZ2UgPSAocHJvamVjdHNBcnIpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyKSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlUHJvamVjdHMgPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGVcIikpIHtcbiAgICAgIGxldCBwcm9qZWN0VG9EZWxldGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xuICAgICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0VG9EZWxldGUsIHByb2plY3RzLmNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10ZXh0LWlucHV0Jyk7XG4gICAgICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0VGV4dElucHV0LnZhbHVlO1xuICAgICAgc2F2ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIHNldFByb2plY3RJZChwcm9qZWN0cy5jb250YWluZXIpO1xuICAgIHBvcHVsYXRlTG9jYWxTdG9yYWdlKHByb2plY3RzLmNvbnRhaW5lcik7XG4gIH07XG5cbiAgcmV0dXJuIHsgdXBkYXRlUHJvamVjdHMgfTtcbn0pKCk7XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RDb250ZW50ID0gKHByb2plY3RPYmopID0+IHtcbiAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICBwcm9qZWN0Q29udGFpbmVyLmlkID0gcHJvamVjdE9iai5pZDtcblxuICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqLm5hbWVcblxuICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZScpO1xuICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSAnWCc7XG4gIFxuICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIHByb2plY3RzRGF0YUNvbnRyb2xsZXIudXBkYXRlUHJvamVjdHMoZSk7XG4gICAgcHJvamVjdHNEaXNwbGF5Q29udHJvbGxlci5kaXNwbGF5UHJvamVjdHMoKTtcbiAgfSlcbiAgXG4gIHByb2plY3RDb250YWluZXIuYXBwZW5kKHByb2plY3RUaXRsZSwgZGVsZXRlQnRuKTtcbiAgcHJvamVjdExpc3RJdGVtLmFwcGVuZChwcm9qZWN0Q29udGFpbmVyKTtcbiAgcmV0dXJuIHByb2plY3RMaXN0SXRlbTtcbn07XG5cbmNvbnN0IHByb2plY3RzRGlzcGxheUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1mb3JtXCIpO1xuICBjb25zdCBwcm9qZWN0VGV4dElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRleHQtaW5wdXRcIik7XG4gIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpO1xuICBjb25zdCBwcm9qZWN0c1BhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLXBhbmVsJyk7XG5cbiAgY29uc3Qgc2hvd0Zvcm0gPSAoKSA9PiB7XG4gICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBwcm9qZWN0VGV4dElucHV0LmZvY3VzKCk7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhpZGVGb3JtID0gKCkgPT4ge1xuICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlID0gKGNvbnRhaW5lciwgZWxlbWVudCkgPT4ge1xuICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBsZXQgYWN0aXZlUHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICBjb25zdCBvbGRQcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtbGlzdCcpO1xuXG4gICAgaWYgKGFjdGl2ZVByb2plY3RzKSB7XG4gICAgICBpZiAocHJvamVjdHNQYW5lbC5jb250YWlucyhvbGRQcm9qZWN0c0xpc3QpKSB7XG4gICAgICAgIHJlbW92ZShwcm9qZWN0c1BhbmVsLCBvbGRQcm9qZWN0c0xpc3QpO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICBwcm9qZWN0c0xpc3QuaWQgPSAncHJvamVjdHMtbGlzdCc7XG4gICAgICBhY3RpdmVQcm9qZWN0cy5mb3JFYWNoKHByb2ogPT4ge1xuICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kKGNyZWF0ZVByb2plY3RDb250ZW50KHByb2opKTtcbiAgICAgIH0pXG4gICAgICBwcm9qZWN0c1BhbmVsLmluc2VydEJlZm9yZShwcm9qZWN0c0xpc3QsIHByb2plY3RGb3JtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaG93Rm9ybSxcbiAgICBoaWRlRm9ybSxcbiAgICBkaXNwbGF5UHJvamVjdHNcbiAgfTtcbn0pKCk7XG5cblxuXG5jb25zdCBwcm9qZWN0c1BhbmVsQ29udHJvbGxlciA9IChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5pZCA9PT0gJ2FkZC1wcm9qZWN0Jykge1xuICAgIHByb2plY3RzRGlzcGxheUNvbnRyb2xsZXIuc2hvd0Zvcm0oKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gJ2NhbmNlbC1wcm9qZWN0Jykge1xuICAgIHByb2plY3RzRGlzcGxheUNvbnRyb2xsZXIuaGlkZUZvcm0oKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gJ3N1Ym1pdC1wcm9qZWN0Jykge1xuICAgIHByb2plY3RzRGF0YUNvbnRyb2xsZXIudXBkYXRlUHJvamVjdHMoZSk7XG4gICAgcHJvamVjdHNEaXNwbGF5Q29udHJvbGxlci5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICBwcm9qZWN0c0Rpc3BsYXlDb250cm9sbGVyLmhpZGVGb3JtKCk7XG4gIH1cbn1cblxucHJvamVjdHNEaXNwbGF5Q29udHJvbGxlci5kaXNwbGF5UHJvamVjdHMoKTtcblxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbnNHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQtcHJvamVjdC1idXR0b25zJyk7XG5hZGRQcm9qZWN0QnV0dG9uc0dyb3VwLmZvckVhY2goYnRuID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdHNQYW5lbENvbnRyb2xsZXIpO1xufSlcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9