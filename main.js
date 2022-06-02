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

eval("\nlet projectContainer = !localStorage.length\n  ? []\n  : JSON.parse(localStorage.getItem(\"projects\"));\n\n\nfunction Project(name) {\n  this.name = name\n  this.tasks = [];\n}\n\nfunction Task(name, details, date) {\n  this.name = name;\n  this.details = details;\n  this.date = date;\n}\n\nProject.prototype = {\n  constructor: Project,\n\n  addProject: function (container) {\n    container.push(this);\n  },\n  addTask: function (name, details, date) {\n    this.tasks.push(new Task(name, details, date));\n  },\n  removeTask: function (taskId) {\n    for (let i = 0; i < this.tasks.length; i++) {\n      if (this.tasks[i].id === taskId) {\n        this.tasks.splice(i, 1);\n      }\n    }\n  },\n  setTaskId: function () {\n    for (let i = 0; i < this.tasks.length; i++) {\n      this.tasks[i].id = 'task-' + i;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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