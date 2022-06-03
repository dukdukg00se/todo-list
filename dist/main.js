/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// Data stuff\nlet projectContainer = !localStorage.length\n  ? []\n  : JSON.parse(localStorage.getItem(\"projects\"));\n\n\nfunction Project(name) {\n  this.name = name\n  this.tasks = [];\n}\nProject.prototype = {\n  constructor: Project,\n\n  addItem: function (container) {\n    container.push(this);\n  },\n\n  removeItem: function (itemId, container) {\n    for (let i = 0; i < container.length; i++) {\n      if (container[i].id === itemId) {\n        container.splice(i, 1);\n      }\n    }\n  },\n\n  setItemId: function (item, container) {\n    for (let i = 0; i < container.length; i++) {\n      item === Project\n        ? (container[i].id = 'project-' + i)\n        : (container[i].id = 'task-' + i);\n    }\n  }\n}\n\nfunction Task(name, details, date) {\n  this.name = name;\n  this.details = details;\n  this.date = date;\n}\nTask.prototype = Object.create(Project.prototype);\n\nconst populateLocalStorage = (projects) => {\n  localStorage.setItem('projects', JSON.stringify(projects));\n};\n\n\n// Display stuff\nconst updateProjects = (e) => {\n  if (e.target.classList.contains(\"delete\")) {\n    let projectToDelete = e.target.parentElement.id;\n    // removeProject(projectToDelete, projects.container);\n\n    console.log(projectToDelete);\n    // console.log(projectContainer);\n\n    projectContainer.forEach(project => {\n      project.prototype = Object.create(Project.prototype);\n      project.prototype.removeItem(projectToDelete, projectContainer);\n\n    });\n    console.log(projectContainer);\n    populateLocalStorage(projectContainer);\n    displayProjects();\n\n\n  } \n  \n  \n  // else {\n  //   const projectTextInput = document.querySelector('#project-name-input');\n  //   let projectName = projectTextInput.value;\n  //   saveProject(projectName);\n  // }\n\n  // setProjectId(projects.container);\n  // populateLocalStorage(projects.container);\n};\n\n\nconst createProjectContent = (projectObj) => {\n  const projectListItem = document.createElement('li');\n\n  const projectContainer = document.createElement('div');\n  projectContainer.classList.add('project-item');\n  projectContainer.id = projectObj.id;\n\n  const projectTitle = document.createElement('h3');\n  projectTitle.textContent = projectObj.name\n\n  const deleteBtn = document.createElement('button');\n  deleteBtn.classList.add('delete');\n  deleteBtn.textContent = 'X';\n  \n  deleteBtn.addEventListener('click', (e) => {\n    updateProjects(e);\n    // projectsDisplayController.displayProjects();\n  })\n  \n  projectContainer.append(projectTitle, deleteBtn);\n  projectListItem.append(projectContainer);\n  return projectListItem;\n};\n\nconst displayProjects = () => {\n  let activeProjects = JSON.parse(localStorage.getItem('projects'));\n  const oldProjectsList = document.querySelector('#projects-list');\n  \n  // Refactor this later\n  const projectsPanel = document.querySelector('#projects-panel');\n  const projectForm = document.querySelector(\"#projects-panel form\");\n\n  if (activeProjects) {\n    if (projectsPanel.contains(oldProjectsList)) {\n      oldProjectsList.remove();\n    }\n\n    const projectsList = document.createElement('ul');\n    projectsList.id = 'projects-list';\n    activeProjects.forEach(proj => {\n      projectsList.append(createProjectContent(proj));\n    })\n    projectsPanel.insertBefore(projectsList, projectForm);\n  }\n};\n\nconst addListeners = () => {\n  const applicationButtons = document.querySelectorAll('button');\n  applicationButtons.forEach(btn => {\n    btn.addEventListener('click', (e) => {\n      if (e.target.classList.contains('project')) {\n        const projectForm = document.querySelector(\"#projects-panel form\");\n        const projectTextInput = document.querySelector(\"#project-name-input\");\n        const addProjectButton = document.querySelector(\"#add-project\");\n        const projectsPanel = document.querySelector('#projects-panel');\n\n        const showForm = () => {\n          projectForm.classList.toggle(\"hidden\");\n          projectTextInput.focus();\n          addProjectButton.classList.toggle(\"hidden\");\n        };\n      \n        const hideForm = () => {\n          projectForm.reset();\n          projectForm.classList.toggle(\"hidden\");\n          addProjectButton.classList.toggle(\"hidden\");\n        };\n\n        if (e.target.id === 'add-project') {\n          showForm();\n        }\n\n        if (e.target.id === 'cancel-project') {\n          hideForm();\n        }\n\n        if (e.target.id === 'submit-project') {\n          let projectName = projectTextInput.value;\n          projectName = new Project(projectName);\n          projectName.addItem(projectContainer);\n          projectName.setItemId(projectName.constructor, projectContainer);\n          populateLocalStorage(projectContainer);\n\n          displayProjects();\n\n        }\n\n      }\n    })\n  })\n}\n\naddListeners();\ndisplayProjects();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;