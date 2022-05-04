/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// let allProjectsArr = [];

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

const projectForm = document.querySelector('.project-form');
let projectTitle = document.getElementById('project-name');
let projectContainer = document.querySelector('#projects');
let addProjBtn = document.querySelector('#submit-project');

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
      // localStorage.clear();
      populateStorage(checkStorage.allProjectsArr);

      projectForm.classList.add('hidden');
      projectForm.reset();

      displayProj();
    }
  })
})
// console.log(allProjectsArr);
displayProj();

function displayProj() {
  // console.log(allProjectsArr);

  // for (let i = 0; i < localStorage.length; i++) {
    // console.log(localStorage.getItem(localStorage.key(i)));
    // console.log(JSON.parse(localStorage.getItem(localStorage.key(0))));
  // }




  let test = JSON.parse(localStorage.getItem('allProjects'));
  // console.log(test.length);


  let projectSubContainer = document.createElement('div');
  projectSubContainer.classList.add('sub-container');
  let sub = document.querySelector('.sub-container');

  // if (projectContainer.contains(sub)) {
  //   // console.log('yes');
  //   projectContainer.removeChild(sub);
  // }

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

function populateStorage(x) {
  localStorage.setItem('allProjects', JSON.stringify(x));
}

// displayProj();

// addProjBtn.addEventListener('click', () => {
//   allProjects.forEach((project) => {
//     let eachProj = document.createElement('div');
//     let eachProjTitle = document.createElement('h3');
//     eachProjTitle.textContent = project.title;
//     eachProj.append(eachProjTitle);

//     projectContainer.insertBefore(eachProj, projectForm);
//   })
// })
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ04sSUFBSSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxldCBhbGxQcm9qZWN0c0FyciA9IFtdO1xuXG5jb25zdCBjaGVja1N0b3JhZ2UgPSAoKCkgPT4ge1xuICBsZXQgYWxsUHJvamVjdHNBcnI7XG4gIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMCkge1xuICAgIGFsbFByb2plY3RzQXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvamVjdHMnKSk7XG4gICAgLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuICB9IGVsc2Uge1xuICAgIGFsbFByb2plY3RzQXJyID0gW107XG4gICAgLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuICB9XG4gIHJldHVybiB7IGFsbFByb2plY3RzQXJyIH07XG59KSgpO1xuXG4vLyBjb25zb2xlLmxvZyhjaGVja1N0b3JhZ2UuYWxsUHJvamVjdHNBcnIpO1xuXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcbmxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJyk7XG5sZXQgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cycpO1xubGV0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LXByb2plY3QnKTtcblxuZnVuY3Rpb24gUHJvamVjdCh0aXRsZSkge1xuICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgdGhpcy50YXNrcyA9IFtdO1xufVxuXG5sZXQgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuYnRucy5mb3JFYWNoKGJ0biA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdhZGQtcHJvamVjdCcpIHtcbiAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0gXG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdjYW5jZWwnKSB7XG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdzdWJtaXQtcHJvamVjdCcpIHtcbiAgICAgIGxldCBwcm9qTmFtZSA9IHByb2plY3RUaXRsZS52YWx1ZTtcbiAgICAgIHByb2pOYW1lID0gbmV3IFByb2plY3QocHJvak5hbWUpO1xuXG4gICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0VGl0bGUudmFsdWUsIEpTT04uc3RyaW5naWZ5KHByb2pOYW1lKSk7XG5cbiAgICAgIGNoZWNrU3RvcmFnZS5hbGxQcm9qZWN0c0Fyci5wdXNoKHByb2pOYW1lKTtcbiAgICAgIC8vIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgcG9wdWxhdGVTdG9yYWdlKGNoZWNrU3RvcmFnZS5hbGxQcm9qZWN0c0Fycik7XG5cbiAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcblxuICAgICAgZGlzcGxheVByb2ooKTtcbiAgICB9XG4gIH0pXG59KVxuLy8gY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnIpO1xuZGlzcGxheVByb2ooKTtcblxuZnVuY3Rpb24gZGlzcGxheVByb2ooKSB7XG4gIC8vIGNvbnNvbGUubG9nKGFsbFByb2plY3RzQXJyKTtcblxuICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaSkpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoMCkpKSk7XG4gIC8vIH1cblxuXG5cblxuICBsZXQgdGVzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2plY3RzJykpO1xuICAvLyBjb25zb2xlLmxvZyh0ZXN0Lmxlbmd0aCk7XG5cblxuICBsZXQgcHJvamVjdFN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0U3ViQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1Yi1jb250YWluZXInKTtcbiAgbGV0IHN1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWItY29udGFpbmVyJyk7XG5cbiAgLy8gaWYgKHByb2plY3RDb250YWluZXIuY29udGFpbnMoc3ViKSkge1xuICAvLyAgIC8vIGNvbnNvbGUubG9nKCd5ZXMnKTtcbiAgLy8gICBwcm9qZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkKHN1Yik7XG4gIC8vIH1cblxuICB0ZXN0LmZvckVhY2gob2JqID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xuXG4gICAgbGV0IGVhY2hQcm9qID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWFjaFByb2ouY2xhc3NMaXN0LmFkZCgnaW5kaXYtcHJvaicpO1xuICAgIGxldCBlYWNoUHJvalRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBlYWNoUHJvalRpdGxlLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICAgIGVhY2hQcm9qLmFwcGVuZChlYWNoUHJvalRpdGxlKTtcbiAgICBwcm9qZWN0U3ViQ29udGFpbmVyLmFwcGVuZChlYWNoUHJvaik7XG5cbiAgfSlcblxuICBwcm9qZWN0Q29udGFpbmVyLmluc2VydEJlZm9yZShwcm9qZWN0U3ViQ29udGFpbmVyLCBwcm9qZWN0Rm9ybSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSh4KSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxQcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHgpKTtcbn1cblxuLy8gZGlzcGxheVByb2ooKTtcblxuLy8gYWRkUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuLy8gICAgIGxldCBlYWNoUHJvaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgIGxldCBlYWNoUHJvalRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbi8vICAgICBlYWNoUHJvalRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcbi8vICAgICBlYWNoUHJvai5hcHBlbmQoZWFjaFByb2pUaXRsZSk7XG5cbi8vICAgICBwcm9qZWN0Q29udGFpbmVyLmluc2VydEJlZm9yZShlYWNoUHJvaiwgcHJvamVjdEZvcm0pO1xuLy8gICB9KVxuLy8gfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=