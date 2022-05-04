/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const projectForm = document.querySelector('.project-form');
let projectTitle = document.getElementById('project-name');
let projectContainer = document.querySelector('#projects');
// let sub = document.querySelector('.sub-container');
let addProjBtn = document.querySelector('#submit-project');

// Create an array to store projects
const checkStorage = (() => {
  let allProjectsArr;
  if (localStorage.length > 0) {
    allProjectsArr = JSON.parse(localStorage.getItem('allProjects'));
    // console.log(allProjectsArr);
  } else {
    allProjectsArr = [];
    // console.log(allProjectsArr);
  }
  return { allProjectsArr };
})();
// console.log(checkStorage.allProjectsArr);

function Project(title) {
  this.title = title
  this.tasks = [];
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {

    if (e.target.id === 'add-project') {
      projectForm.classList.remove('hidden');
    } 

    if (e.target.id === 'cancel') {
      projectForm.classList.add('hidden');
    }

    if (e.target.id === 'submit-project') {
      let projName = projectTitle.value;
      projName = new Project(projName);

      // localStorage.setItem(projectTitle.value, JSON.stringify(projName));

      checkStorage.allProjectsArr.push(projName);
      populateStorage(checkStorage.allProjectsArr);

      projectForm.classList.add('hidden');
      projectForm.reset();

      // Remove previous project subcontainer before displaying new projects
      let sub = document.querySelector('.sub-container');
      if (projectContainer.contains(sub)) {
        console.log('yes');
        projectContainer.removeChild(sub);
      }

      displayProj();
    }
  })
})

displayProj();

function displayProj() {
  // for (let i = 0; i < localStorage.length; i++) {
    // console.log(localStorage.getItem(localStorage.key(i)));
    // console.log(JSON.parse(localStorage.getItem(localStorage.key(0))));
  // }

  let test = JSON.parse(localStorage.getItem('allProjects'));

  let projectSubContainer = document.createElement('div');
  projectSubContainer.classList.add('sub-container');

  test.forEach(obj => {
    // console.log(obj);

    let eachProj = document.createElement('div');
    eachProj.classList.add('indiv-proj');
    let eachProjTitle = document.createElement('h3');
    eachProjTitle.textContent = obj.title;
    eachProj.append(eachProjTitle);
    projectSubContainer.append(eachProj);

  })

  projectContainer.insertBefore(projectSubContainer, projectForm);
}

// Add array containing all projects to local storage
function populateStorage(x) {
  localStorage.setItem('allProjects', JSON.stringify(x));
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XG5sZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpO1xubGV0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMnKTtcbi8vIGxldCBzdWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViLWNvbnRhaW5lcicpO1xubGV0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LXByb2plY3QnKTtcblxuLy8gQ3JlYXRlIGFuIGFycmF5IHRvIHN0b3JlIHByb2plY3RzXG5jb25zdCBjaGVja1N0b3JhZ2UgPSAoKCkgPT4ge1xuICBsZXQgYWxsUHJvamVjdHNBcnI7XG4gIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMCkge1xuICAgIGFsbFByb2plY3RzQXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvamVjdHMnKSk7XG4gICAgLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuICB9IGVsc2Uge1xuICAgIGFsbFByb2plY3RzQXJyID0gW107XG4gICAgLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuICB9XG4gIHJldHVybiB7IGFsbFByb2plY3RzQXJyIH07XG59KSgpO1xuLy8gY29uc29sZS5sb2coY2hlY2tTdG9yYWdlLmFsbFByb2plY3RzQXJyKTtcblxuZnVuY3Rpb24gUHJvamVjdCh0aXRsZSkge1xuICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgdGhpcy50YXNrcyA9IFtdO1xufVxuXG5sZXQgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuYnRucy5mb3JFYWNoKGJ0biA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdhZGQtcHJvamVjdCcpIHtcbiAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0gXG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdjYW5jZWwnKSB7XG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdzdWJtaXQtcHJvamVjdCcpIHtcbiAgICAgIGxldCBwcm9qTmFtZSA9IHByb2plY3RUaXRsZS52YWx1ZTtcbiAgICAgIHByb2pOYW1lID0gbmV3IFByb2plY3QocHJvak5hbWUpO1xuXG4gICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0VGl0bGUudmFsdWUsIEpTT04uc3RyaW5naWZ5KHByb2pOYW1lKSk7XG5cbiAgICAgIGNoZWNrU3RvcmFnZS5hbGxQcm9qZWN0c0Fyci5wdXNoKHByb2pOYW1lKTtcbiAgICAgIHBvcHVsYXRlU3RvcmFnZShjaGVja1N0b3JhZ2UuYWxsUHJvamVjdHNBcnIpO1xuXG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBwcm9qZWN0IHN1YmNvbnRhaW5lciBiZWZvcmUgZGlzcGxheWluZyBuZXcgcHJvamVjdHNcbiAgICAgIGxldCBzdWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViLWNvbnRhaW5lcicpO1xuICAgICAgaWYgKHByb2plY3RDb250YWluZXIuY29udGFpbnMoc3ViKSkge1xuICAgICAgICBjb25zb2xlLmxvZygneWVzJyk7XG4gICAgICAgIHByb2plY3RDb250YWluZXIucmVtb3ZlQ2hpbGQoc3ViKTtcbiAgICAgIH1cblxuICAgICAgZGlzcGxheVByb2ooKTtcbiAgICB9XG4gIH0pXG59KVxuXG5kaXNwbGF5UHJvaigpO1xuXG5mdW5jdGlvbiBkaXNwbGF5UHJvaigpIHtcbiAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSk7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KDApKSkpO1xuICAvLyB9XG5cbiAgbGV0IHRlc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9qZWN0cycpKTtcblxuICBsZXQgcHJvamVjdFN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0U3ViQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1Yi1jb250YWluZXInKTtcblxuICB0ZXN0LmZvckVhY2gob2JqID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xuXG4gICAgbGV0IGVhY2hQcm9qID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWFjaFByb2ouY2xhc3NMaXN0LmFkZCgnaW5kaXYtcHJvaicpO1xuICAgIGxldCBlYWNoUHJvalRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBlYWNoUHJvalRpdGxlLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICAgIGVhY2hQcm9qLmFwcGVuZChlYWNoUHJvalRpdGxlKTtcbiAgICBwcm9qZWN0U3ViQ29udGFpbmVyLmFwcGVuZChlYWNoUHJvaik7XG5cbiAgfSlcblxuICBwcm9qZWN0Q29udGFpbmVyLmluc2VydEJlZm9yZShwcm9qZWN0U3ViQ29udGFpbmVyLCBwcm9qZWN0Rm9ybSk7XG59XG5cbi8vIEFkZCBhcnJheSBjb250YWluaW5nIGFsbCBwcm9qZWN0cyB0byBsb2NhbCBzdG9yYWdlXG5mdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoeCkge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeSh4KSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=