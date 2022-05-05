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

      // Remove previous proj subcontainer before displaying new proj
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

  if (test) {
    test.forEach(obj => {
      // console.log(obj);
  
      let eachProj = document.createElement('div');
      eachProj.classList.add('indiv-proj');

      let projTitleContainer = document.createElement('div');
      projTitleContainer.classList.add('proj-title-cont');

      let clipboardIcon = document.createElement('span');
      clipboardIcon.classList.add('material-icons');
      // clipboardIcon.classList.add('test');
      clipboardIcon.textContent = 'construction';

      let eachProjTitle = document.createElement('h3');
      eachProjTitle.textContent = obj.title;

      projTitleContainer.append(clipboardIcon, eachProjTitle);

      let kebabIcon = document.createElement('span');
      kebabIcon.classList.add('material-icons');
      kebabIcon.classList.add('proj-edit');

      kebabIcon.textContent = 'more_vert';
      
      eachProj.append(projTitleContainer, kebabIcon);
      projectSubContainer.append(eachProj);
  
    })

    projectContainer.insertBefore(projectSubContainer, projectForm);
  }
}

// Add array containing all projects to local storage
function populateStorage(x) {
  localStorage.setItem('allProjects', JSON.stringify(x));
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XG5sZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpO1xubGV0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMnKTtcbi8vIGxldCBzdWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViLWNvbnRhaW5lcicpO1xubGV0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LXByb2plY3QnKTtcblxuLy8gQ3JlYXRlIGFuIGFycmF5IHRvIHN0b3JlIHByb2plY3RzXG5jb25zdCBjaGVja1N0b3JhZ2UgPSAoKCkgPT4ge1xuICBsZXQgYWxsUHJvamVjdHNBcnI7XG4gIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMCkge1xuICAgIGFsbFByb2plY3RzQXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvamVjdHMnKSk7XG4gICAgLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuICB9IGVsc2Uge1xuICAgIGFsbFByb2plY3RzQXJyID0gW107XG4gICAgLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuICB9XG4gIHJldHVybiB7IGFsbFByb2plY3RzQXJyIH07XG59KSgpO1xuXG5mdW5jdGlvbiBQcm9qZWN0KHRpdGxlKSB7XG4gIHRoaXMudGl0bGUgPSB0aXRsZVxuICB0aGlzLnRhc2tzID0gW107XG59XG5cbmxldCBidG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5idG5zLmZvckVhY2goYnRuID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdhZGQtcHJvamVjdCcpIHtcbiAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0gXG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdjYW5jZWwnKSB7XG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdzdWJtaXQtcHJvamVjdCcpIHtcbiAgICAgIGxldCBwcm9qTmFtZSA9IHByb2plY3RUaXRsZS52YWx1ZTtcbiAgICAgIHByb2pOYW1lID0gbmV3IFByb2plY3QocHJvak5hbWUpO1xuXG4gICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0VGl0bGUudmFsdWUsIEpTT04uc3RyaW5naWZ5KHByb2pOYW1lKSk7XG5cbiAgICAgIGNoZWNrU3RvcmFnZS5hbGxQcm9qZWN0c0Fyci5wdXNoKHByb2pOYW1lKTtcbiAgICAgIHBvcHVsYXRlU3RvcmFnZShjaGVja1N0b3JhZ2UuYWxsUHJvamVjdHNBcnIpO1xuXG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBwcm9qIHN1YmNvbnRhaW5lciBiZWZvcmUgZGlzcGxheWluZyBuZXcgcHJvalxuICAgICAgbGV0IHN1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWItY29udGFpbmVyJyk7XG4gICAgICBpZiAocHJvamVjdENvbnRhaW5lci5jb250YWlucyhzdWIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd5ZXMnKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZChzdWIpO1xuICAgICAgfVxuXG4gICAgICBkaXNwbGF5UHJvaigpO1xuICAgIH1cbiAgfSlcbn0pXG5cbmRpc3BsYXlQcm9qKCk7XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qKCkge1xuICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaSkpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoMCkpKSk7XG4gIC8vIH1cblxuICBsZXQgdGVzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2plY3RzJykpO1xuXG4gIGxldCBwcm9qZWN0U3ViQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3RTdWJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3ViLWNvbnRhaW5lcicpO1xuXG4gIGlmICh0ZXN0KSB7XG4gICAgdGVzdC5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xuICBcbiAgICAgIGxldCBlYWNoUHJvaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWFjaFByb2ouY2xhc3NMaXN0LmFkZCgnaW5kaXYtcHJvaicpO1xuXG4gICAgICBsZXQgcHJvalRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcm9qVGl0bGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvai10aXRsZS1jb250Jyk7XG5cbiAgICAgIGxldCBjbGlwYm9hcmRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgY2xpcGJvYXJkSWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgICAgLy8gY2xpcGJvYXJkSWNvbi5jbGFzc0xpc3QuYWRkKCd0ZXN0Jyk7XG4gICAgICBjbGlwYm9hcmRJY29uLnRleHRDb250ZW50ID0gJ2NvbnN0cnVjdGlvbic7XG5cbiAgICAgIGxldCBlYWNoUHJvalRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgIGVhY2hQcm9qVGl0bGUudGV4dENvbnRlbnQgPSBvYmoudGl0bGU7XG5cbiAgICAgIHByb2pUaXRsZUNvbnRhaW5lci5hcHBlbmQoY2xpcGJvYXJkSWNvbiwgZWFjaFByb2pUaXRsZSk7XG5cbiAgICAgIGxldCBrZWJhYkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBrZWJhYkljb24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICAgIGtlYmFiSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qLWVkaXQnKTtcblxuICAgICAga2ViYWJJY29uLnRleHRDb250ZW50ID0gJ21vcmVfdmVydCc7XG4gICAgICBcbiAgICAgIGVhY2hQcm9qLmFwcGVuZChwcm9qVGl0bGVDb250YWluZXIsIGtlYmFiSWNvbik7XG4gICAgICBwcm9qZWN0U3ViQ29udGFpbmVyLmFwcGVuZChlYWNoUHJvaik7XG4gIFxuICAgIH0pXG5cbiAgICBwcm9qZWN0Q29udGFpbmVyLmluc2VydEJlZm9yZShwcm9qZWN0U3ViQ29udGFpbmVyLCBwcm9qZWN0Rm9ybSk7XG4gIH1cbn1cblxuLy8gQWRkIGFycmF5IGNvbnRhaW5pbmcgYWxsIHByb2plY3RzIHRvIGxvY2FsIHN0b3JhZ2VcbmZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSh4KSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxQcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHgpKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==