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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/projects.js */ \"./src/modules/projects.js\");\n\n\n\n_modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsDisplayController.displayProjects();\n\n// const addProjectButtonsGroup = document.querySelectorAll('.add-project');\n// addProjectButtonsGroup.forEach(btn => {\n//   btn.addEventListener('click', projectsPanelController);\n// })\n\n\nconst applicationController = (() => {\n\n  const applicationButtons = document.querySelectorAll('button');\n  applicationButtons.forEach(btn => {\n    btn.addEventListener('click', (e) => {\n      if (e.target.classList.contains('project')) {\n        (0,_modules_projects_js__WEBPACK_IMPORTED_MODULE_0__.projectsPanelController)(e);\n      }\n    })\n  })\n\n  const projectsList = document.querySelectorAll('.project-item');\n  projectsList.forEach(project => {\n    project.addEventListener('click', (e) => {\n      // console.log(e);\n      console.log(e.target.firstChild.textContent);\n    })\n  })\n\n})();\n\n\n/*****************************/\nconst tasksDisplayController = () => {\n  const mainPanel = document.querySelector('main');\n  const mainHeader = document.querySelector('h1');\n}\n\n\nconst taskPanelController = () => {\n\n}\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectsDisplayController\": () => (/* binding */ projectsDisplayController),\n/* harmony export */   \"projectsPanelController\": () => (/* binding */ projectsPanelController)\n/* harmony export */ });\nconst createProjectContent = (projectObj) => {\n  const projectListItem = document.createElement('li');\n\n  const projectContainer = document.createElement('div');\n  projectContainer.classList.add('project-item');\n  projectContainer.id = projectObj.id;\n\n  const projectTitle = document.createElement('h3');\n  projectTitle.textContent = projectObj.name\n\n  const deleteBtn = document.createElement('button');\n  deleteBtn.classList.add('delete');\n  deleteBtn.textContent = 'X';\n  \n  deleteBtn.addEventListener('click', (e) => {\n    projectsDataController.updateProjects(e);\n    projectsDisplayController.displayProjects();\n  })\n  \n  projectContainer.append(projectTitle, deleteBtn);\n  projectListItem.append(projectContainer);\n  return projectListItem;\n};\n\nconst projectsDataController = (() => {\n  // Define projects container on start\n  const projects = (() => {\n    let container = !localStorage.length\n      ? []\n      : JSON.parse(localStorage.getItem(\"projects\"));\n    return { container };\n  })();\n\n  const createProject = (name) => {\n    const tasks = [];\n    return { name, tasks };\n  };\n\n  const saveProject = (name) => {\n    name = createProject(name);\n    projects.container.push(name);\n  };\n\n  const removeProject = (projectId, projectContainer) => {\n    for (let i = 0; i < projectContainer.length; i++) {\n      if (projectContainer[i].id === projectId) {\n        projectContainer.splice(i, 1);\n      }\n    }\n  };\n\n  const setProjectId = (projectsArr) => {\n    for (let i = 0; i < projectsArr.length; i++) {\n      projectsArr[i].id = \"project-\" + i;\n    }\n  };\n\n  const populateLocalStorage = (projectsArr) => {\n    localStorage.setItem(\"projects\", JSON.stringify(projectsArr));\n  };\n\n  const updateProjects = (e) => {\n    if (e.target.classList.contains(\"delete\")) {\n      let projectToDelete = e.target.parentElement.id;\n      removeProject(projectToDelete, projects.container);\n    } else {\n      const projectTextInput = document.querySelector('#project-text-input');\n      let projectName = projectTextInput.value;\n      saveProject(projectName);\n    }\n\n    setProjectId(projects.container);\n    populateLocalStorage(projects.container);\n  };\n\n  return { updateProjects };\n})();\n\nconst projectsDisplayController = (() => {\n  const projectForm = document.querySelector(\"#project-form\");\n  const projectTextInput = document.querySelector(\"#project-text-input\");\n  const addProjectButton = document.querySelector(\"#add-project\");\n  const projectsPanel = document.querySelector('#projects-panel');\n\n  const showForm = () => {\n    projectForm.classList.remove(\"hidden\");\n    projectTextInput.focus();\n    addProjectButton.classList.add(\"hidden\");\n  };\n\n  const hideForm = () => {\n    projectForm.reset();\n    projectForm.classList.add(\"hidden\");\n    addProjectButton.classList.remove(\"hidden\");\n  };\n\n  const remove = (container, element) => {\n    container.removeChild(element);\n  }\n\n  const displayProjects = () => {\n    let activeProjects = JSON.parse(localStorage.getItem('projects'));\n    const oldProjectsList = document.querySelector('#projects-list');\n\n    if (activeProjects) {\n      if (projectsPanel.contains(oldProjectsList)) {\n        remove(projectsPanel, oldProjectsList);\n      }\n  \n      const projectsList = document.createElement('ul');\n      projectsList.id = 'projects-list';\n      activeProjects.forEach(proj => {\n        projectsList.append(createProjectContent(proj));\n      })\n      projectsPanel.insertBefore(projectsList, projectForm);\n    }\n  };\n\n  return {\n    showForm,\n    hideForm,\n    displayProjects\n  };\n})();\n\nconst projectsPanelController = (e) => {\n\n  if (e.target.id === 'add-project') {\n    projectsDisplayController.showForm();\n  }\n\n  if (e.target.id === 'cancel-project') {\n    projectsDisplayController.hideForm();\n  }\n\n  if (e.target.id === 'submit-project') {\n    projectsDataController.updateProjects(e);\n    projectsDisplayController.displayProjects();\n    projectsDisplayController.hideForm();\n  }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/modules/projects.js?");

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