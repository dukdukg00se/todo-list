/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/projects.js */ \"./src/modules/projects.js\");\n\n\n_modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsDisplayController.displayProjects();\n\n\nconst createTaskContent = (obj) => {\n  const taskListItem = document.createElement('li');\n  taskListItem.classList.add('task-item');\n  const taskItemWrapper = document.createElement('div');\n  taskItemWrapper.classList.add('task-wrapper');\n  const taskInfoWrapper = document.createElement('div');\n  const taskName = document.createElement('h3');\n  const taskDetails = document.createElement('p');\n  const taskSpanWrapper = document.createElement('div');\n  const taskDate = document.createElement('span');\n  const taskUrgent = document.createElement('span');\n\n  taskName.textContent = obj.name;\n  taskDetails.textContent = obj.details;\n  taskDate.textContent = obj.due;\n  taskUrgent.textContent = obj.urgent;\n\n  taskSpanWrapper.append(taskDate, taskUrgent);\n  taskInfoWrapper.append(taskName, taskDetails);\n  taskItemWrapper.append(taskInfoWrapper, taskSpanWrapper);\n  taskListItem.append(taskItemWrapper);\n  \n  return taskListItem;\n}\n\n\nconst displayTaskContent = (e) => {\n  let activeProjects = JSON.parse(localStorage.getItem('projects'));\n  let projectToDisplay;\n\n  const mainPanel = document.querySelector('main');\n  const mainHeader = document.querySelector('h1');\n  const mainForm = document.querySelector('main > form');\n  const oldTaskList = document.querySelector('.task-list');\n\n  if (e.target.nodeName === 'H3') {\n    projectToDisplay = e.target.parentElement.id;\n\n    activeProjects.forEach(proj => {\n      if (proj.id === projectToDisplay) {\n        mainHeader.textContent = proj.name;\n\n        if (proj.tasks) {\n\n          if (mainPanel.contains(oldTaskList)) {\n            oldTaskList.remove();\n          }\n\n          const taskContainer = document.createElement('ul');\n          taskContainer.classList.add('task-list');\n\n          proj.tasks.forEach(task => {\n            taskContainer.append(createTaskContent(task));\n          })\n          mainPanel.insertBefore(taskContainer, mainForm);\n        }\n      }\n    })\n  }\n\n  if (e.target.id === 'submit-task') {\n    projectToDisplay = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;\n\n    activeProjects.forEach(proj => {\n      if (proj.name === projectToDisplay) {\n\n        if (proj.tasks) {\n\n          if (mainPanel.contains(oldTaskList)) {\n            oldTaskList.remove();\n          }\n\n          const taskContainer = document.createElement('ul');\n          taskContainer.classList.add('task-list');\n\n          proj.tasks.forEach(task => {\n            taskContainer.append(createTaskContent(task));\n          })\n          mainPanel.insertBefore(taskContainer, mainForm);\n        }\n      }\n    })\n  }\n}\n\n\n\nconst applicationButtons = document.querySelectorAll('button');\napplicationButtons.forEach(btn => {\n  btn.addEventListener('click', (e) => {\n    if (e.target.classList.contains('project')) {\n      (0,_modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsPanelController)(e);\n    }\n\n    // Refactor this..\n    if (e.target.classList.contains('task')) {\n      const taskForm = document.querySelector('#task-form');\n      const addTaskButton = document.querySelector('#add-task');\n\n      // Show task form\n      if (e.target.id === 'add-task') {\n        taskForm.classList.remove('hidden');\n        addTaskButton.classList.add('hidden');\n      }\n\n      // Hide task form\n      if (e.target.id === 'cancel-task') {\n        taskForm.classList.add('hidden');\n        addTaskButton.classList.remove('hidden');\n      }\n\n      // Create and save new task object\n      // Reset and hide form\n      if (e.target.id === 'submit-task') {\n\n        let target = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;\n\n        const taskTextInput = document.querySelector('#task-name-input');\n        const taskName = taskTextInput.value;\n\n        const taskDetailsInput = document.querySelector('#task-details-input');\n        const taskDetails = taskDetailsInput.value; \n\n        const taskDateInput = document.querySelector('#task-date-input');\n        const taskDueDate = taskDateInput.value;\n\n        _modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsDataController.projects.container.forEach(proj => {\n          if (proj.name === target) {\n\n            proj.tasks.push(createTask(taskName, taskDetails, taskDueDate));\n\n            _modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsDataController.populateLocalStorage(_modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsDataController.projects.container);\n\n            taskForm.reset();\n            taskForm.classList.add('hidden');\n            addTaskButton.classList.remove('hidden');\n\n            displayTaskContent(e);\n          }\n        })\n\n      }\n    }\n  })\n})\n\n\nconst addTaskBtn = document.querySelector('#add-task');\nconst projectsList = document.querySelectorAll('.project-item');\nprojectsList.forEach(project => {\n  project.addEventListener('click', (e) => {\n    addTaskBtn.classList.remove('hidden');\n    displayTaskContent(e)\n  });\n})\n\n\n\n\n/*****************************/\n\n\nconst createTask = (name, details, date) => {\n  return { name, details, date }\n}\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectsDataController\": () => (/* binding */ projectsDataController),\n/* harmony export */   \"projectsDisplayController\": () => (/* binding */ projectsDisplayController),\n/* harmony export */   \"projectsPanelController\": () => (/* binding */ projectsPanelController)\n/* harmony export */ });\nconst createProjectContent = (projectObj) => {\n  const projectListItem = document.createElement('li');\n\n  const projectContainer = document.createElement('div');\n  projectContainer.classList.add('project-item');\n  projectContainer.id = projectObj.id;\n\n  const projectTitle = document.createElement('h3');\n  projectTitle.textContent = projectObj.name\n\n  const deleteBtn = document.createElement('button');\n  deleteBtn.classList.add('delete');\n  deleteBtn.textContent = 'X';\n  \n  deleteBtn.addEventListener('click', (e) => {\n    projectsDataController.updateProjects(e);\n    projectsDisplayController.displayProjects();\n  })\n  \n  projectContainer.append(projectTitle, deleteBtn);\n  projectListItem.append(projectContainer);\n  return projectListItem;\n};\n\nconst projectsDataController = (() => {\n  // Define projects container on start\n  const projects = (() => {\n    let container = !localStorage.length\n      ? []\n      : JSON.parse(localStorage.getItem(\"projects\"));\n    return { container };\n  })();\n\n  const createProject = (name) => {\n\n    // Add example task for testing\n    const tasks = [\n      {\n        name: 'Shop',\n        details: 'Carrots, milk, bread',\n        due: '10-11-2022',\n        urgent: false\n      },\n      {\n        name: 'work',\n        details: 'paper',\n        due: '10-11-2022',\n        urgent: false\n      }\n    ];\n\n    return { name, tasks };\n  };\n\n  \n  const saveProject = (name) => {\n    name = createProject(name);\n    projects.container.push(name);\n  };\n\n  const removeProject = (projectId, projectContainer) => {\n    for (let i = 0; i < projectContainer.length; i++) {\n      if (projectContainer[i].id === projectId) {\n        projectContainer.splice(i, 1);\n      }\n    }\n  };\n\n  const setProjectId = (projectsArr) => {\n    for (let i = 0; i < projectsArr.length; i++) {\n      projectsArr[i].id = \"project-\" + i;\n    }\n  };\n\n  const populateLocalStorage = (projectsArr) => {\n    localStorage.setItem(\"projects\", JSON.stringify(projectsArr));\n  };\n\n  const updateProjects = (e) => {\n    if (e.target.classList.contains(\"delete\")) {\n      let projectToDelete = e.target.parentElement.id;\n      removeProject(projectToDelete, projects.container);\n    } else {\n      const projectTextInput = document.querySelector('#project-name-input');\n      let projectName = projectTextInput.value;\n      saveProject(projectName);\n    }\n\n    setProjectId(projects.container);\n    populateLocalStorage(projects.container);\n  };\n\n  return { updateProjects, populateLocalStorage, projects };\n})();\n\nconst projectsDisplayController = (() => {\n  const projectForm = document.querySelector(\"#project-form\");\n  const projectTextInput = document.querySelector(\"#project-name-input\");\n  const addProjectButton = document.querySelector(\"#add-project\");\n  const projectsPanel = document.querySelector('#projects-panel');\n\n  const showForm = () => {\n    projectForm.classList.remove(\"hidden\");\n    projectTextInput.focus();\n    addProjectButton.classList.add(\"hidden\");\n  };\n\n  const hideForm = () => {\n    projectForm.reset();\n    projectForm.classList.add(\"hidden\");\n    addProjectButton.classList.remove(\"hidden\");\n  };\n\n  //Use built in remove method\n  // const remove = (container, element) => {\n  //   container.removeChild(element);\n  // }\n\n  const displayProjects = () => {\n    let activeProjects = JSON.parse(localStorage.getItem('projects'));\n    const oldProjectsList = document.querySelector('#projects-list');\n\n    if (activeProjects) {\n      if (projectsPanel.contains(oldProjectsList)) {\n        // instead of using custom function, use the built in remove method\n        // remove(projectsPanel, oldProjectsList); \n        oldProjectsList.remove();\n      }\n  \n      const projectsList = document.createElement('ul');\n      projectsList.id = 'projects-list';\n      activeProjects.forEach(proj => {\n        projectsList.append(createProjectContent(proj));\n      })\n      projectsPanel.insertBefore(projectsList, projectForm);\n    }\n  };\n\n  return {\n    showForm,\n    hideForm,\n    displayProjects\n  };\n})();\n\nconst projectsPanelController = (e) => {\n\n  if (e.target.id === 'add-project') {\n    projectsDisplayController.showForm();\n  }\n\n  if (e.target.id === 'cancel-project') {\n    projectsDisplayController.hideForm();\n  }\n\n  if (e.target.id === 'submit-project') {\n    projectsDataController.updateProjects(e);\n    projectsDisplayController.displayProjects();\n    projectsDisplayController.hideForm();\n  }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/modules/projects.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;