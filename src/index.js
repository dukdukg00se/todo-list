import {projectsPanelController, projectsDisplayController} from './modules/projects.js';


projectsDisplayController.displayProjects();

// const addProjectButtonsGroup = document.querySelectorAll('.add-project');
// addProjectButtonsGroup.forEach(btn => {
//   btn.addEventListener('click', projectsPanelController);
// })


const applicationController = (() => {

  const applicationButtons = document.querySelectorAll('button');
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('project')) {
        projectsPanelController(e);
      }
    })
  })

  const projectsList = document.querySelectorAll('.project-item');
  projectsList.forEach(project => {
    project.addEventListener('click', (e) => {
      // console.log(e);
      console.log(e.target.firstChild.textContent);
    })
  })

})();


/*****************************/
const tasksDisplayController = () => {
  const mainPanel = document.querySelector('main');
  const mainHeader = document.querySelector('h1');
}


const taskPanelController = () => {

}