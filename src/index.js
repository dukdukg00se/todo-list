import {projectsDataController, projectsPanelController, projectsDisplayController} from './modules/projects.js';

projectsDisplayController.displayProjects();


const createTaskContent = (obj) => {
  const taskListItem = document.createElement('li');
  taskListItem.classList.add('task-item');
  const taskItemWrapper = document.createElement('div');
  taskItemWrapper.classList.add('task-wrapper');
  const taskInfoWrapper = document.createElement('div');
  const taskName = document.createElement('h3');
  const taskDetails = document.createElement('p');
  const taskSpanWrapper = document.createElement('div');
  const taskDate = document.createElement('span');
  const taskUrgent = document.createElement('span');

  taskName.textContent = obj.name;
  taskDetails.textContent = obj.details;
  taskDate.textContent = obj.due;
  taskUrgent.textContent = obj.urgent;

  taskSpanWrapper.append(taskDate, taskUrgent);
  taskInfoWrapper.append(taskName, taskDetails);
  taskItemWrapper.append(taskInfoWrapper, taskSpanWrapper);
  taskListItem.append(taskItemWrapper);
  
  return taskListItem;
}
const displayTaskContent = (e) => {
  if (e.target.nodeName === 'H3') {
    const mainPanel = document.querySelector('main');
    const mainHeader = document.querySelector('h1');
    const mainForm = document.querySelector('main > form');
    const oldTaskList = document.querySelector('.task-list');

    let activeProjects = JSON.parse(localStorage.getItem('projects'));
    let projectToDisplay = e.target.parentElement.id;

    activeProjects.forEach(proj => {
      if (proj.id === projectToDisplay) {
        mainHeader.textContent = proj.name;

        if (proj.tasks) {

          if (mainPanel.contains(oldTaskList)) {
            console.log(mainPanel);
            // remove(mainPanel, oldTaskList);
            oldTaskList.remove();
          }

          const taskContainer = document.createElement('ul');
          taskContainer.classList.add('task-list');

          proj.tasks.forEach(task => {
            taskContainer.append(createTaskContent(task));
          })
          mainPanel.insertBefore(taskContainer, mainForm);
        }
      }
    })
  }
}



const applicationController = (() => {

  const applicationButtons = document.querySelectorAll('button');
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('project')) {
        projectsPanelController(e);
      }

      // Refactor this..
      if (e.target.classList.contains('task')) {
        const taskForm = document.querySelector('#task-form');
        const addTaskButton = document.querySelector('#add-task');

        // Show task form
        if (e.target.id === 'add-task') {
          taskForm.classList.remove('hidden');
          addTaskButton.classList.add('hidden');
        }

        // Hide task form
        if (e.target.id === 'cancel-task') {
          taskForm.classList.add('hidden');
          addTaskButton.classList.remove('hidden');
        }

        // Create and save new task object
        // Reset and hide form
        if (e.target.id === 'submit-task') {

          let target = e.target.parentElement.parentElement.previousElementSibling.textContent;

        }
      }
    })
  })



  const projectsList = document.querySelectorAll('.project-item');
  projectsList.forEach(project => {
    project.addEventListener('click', displayTaskContent);
  })

})();


/*****************************/


const createTask = (name, details, date) => {
  return { name, details, date }
}







