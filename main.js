/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let allProjects = [];

// const projectFactory = projName => {
//   const projName = {};
//   return projName;
// }





const projectForm = document.querySelector('.project-form');
let projectTitle = document.getElementById('project-name');


let btns = document.querySelectorAll('button');
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    console.log(e.target.id);

    if (e.target.id === 'add-project') {
      projectForm.classList.remove('hidden');
    } 

    if (e.target.id === 'cancel') {
      projectForm.classList.add('hidden');
    }

    if (e.target.id === 'submit-project') {
      console.log(projectTitle.value);
    }

  })
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBhbGxQcm9qZWN0cyA9IFtdO1xuXG4vLyBjb25zdCBwcm9qZWN0RmFjdG9yeSA9IHByb2pOYW1lID0+IHtcbi8vICAgY29uc3QgcHJvak5hbWUgPSB7fTtcbi8vICAgcmV0dXJuIHByb2pOYW1lO1xuLy8gfVxuXG5cblxuXG5cbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xubGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKTtcblxuXG5sZXQgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuYnRucy5mb3JFYWNoKGJ0biA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpO1xuXG4gICAgaWYgKGUudGFyZ2V0LmlkID09PSAnYWRkLXByb2plY3QnKSB7XG4gICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9IFxuXG4gICAgaWYgKGUudGFyZ2V0LmlkID09PSAnY2FuY2VsJykge1xuICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgaWYgKGUudGFyZ2V0LmlkID09PSAnc3VibWl0LXByb2plY3QnKSB7XG4gICAgICBjb25zb2xlLmxvZyhwcm9qZWN0VGl0bGUudmFsdWUpO1xuICAgIH1cblxuICB9KVxufSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=