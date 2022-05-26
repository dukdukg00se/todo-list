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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByb2plY3RzRGF0YUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICAvLyBEZWZpbmUgcHJvamVjdHMgY29udGFpbmVyIG9uIHN0YXJ0XG4gIGNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gIWxvY2FsU3RvcmFnZS5sZW5ndGhcbiAgICAgID8gW11cbiAgICAgIDogSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcbiAgICByZXR1cm4geyBjb250YWluZXIgfTtcbiAgfSkoKTtcblxuICAvLyBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyBwcm9qZWN0XG4gIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgcmV0dXJuIHsgbmFtZSwgdGFza3MgfTtcbiAgfTtcblxuICAvLyBTYXZlIHByb2plY3QgdG8gcHJvamVjdHMgY29udGFpbmVyIGFycmF5XG4gIGNvbnN0IHNhdmVQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBuYW1lID0gY3JlYXRlUHJvamVjdChuYW1lKTtcbiAgICBwcm9qZWN0cy5jb250YWluZXIucHVzaChuYW1lKTtcbiAgfTtcblxuICAvLyBSZW1vdmUgcHJvamVjdCB0byBwcm9qZWN0cyBjb250YWluZXIgYXJyYXlcbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChwcm9qZWN0SWQsIHByb2plY3RDb250YWluZXIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RDb250YWluZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm9qZWN0Q29udGFpbmVyW2ldLmlkID09PSBwcm9qZWN0SWQpIHtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJlc2V0IHRoZSBwcm9qZWN0IElkJ3MgYWZ0ZXIgcmVtb3ZpbmcgYSBwcm9qZWN0XG4gIGNvbnN0IHNldFByb2plY3RJZCA9IChwcm9qZWN0c0FycikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHByb2plY3RzQXJyW2ldLmlkID0gXCJwcm9qZWN0LVwiICsgaTtcbiAgICB9XG4gIH07XG5cbiAgLy8gU2F2ZXMgdGhlIHByb2plY3RzIGNvbnRhaW5lciBhcnJheSB0byBsb2NhbFN0b3JhZ2UgdW5kZXIga2V5IFwicHJvamVjdHNcIlxuICBjb25zdCBwb3B1bGF0ZUxvY2FsU3RvcmFnZSA9IChwcm9qZWN0c0FycikgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnIpKTtcbiAgfTtcblxuICAvLyBQdWJsaWMgZnVuY3Rpb24gdGhhdCBzYXZlcyBwcm9qZWN0cyBjb250YWluZXIgY2hhbmdlcyB0byBsb2NhbFN0b3JhZ2VcbiAgY29uc3QgdXBkYXRlUHJvamVjdHMgPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGVcIikpIHtcbiAgICAgIGxldCBwcm9qZWN0VG9EZWxldGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xuICAgICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0VG9EZWxldGUsIHByb2plY3RzLmNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10ZXh0LWlucHV0Jyk7XG4gICAgICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0VGV4dElucHV0LnZhbHVlO1xuICAgICAgc2F2ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIHNldFByb2plY3RJZChwcm9qZWN0cy5jb250YWluZXIpO1xuICAgIHBvcHVsYXRlTG9jYWxTdG9yYWdlKHByb2plY3RzLmNvbnRhaW5lcik7XG4gIH07XG5cbiAgcmV0dXJuIHsgdXBkYXRlUHJvamVjdHMgfTtcbn0pKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==