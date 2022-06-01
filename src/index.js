import {projectsDataController, projectsPanelController, projectsDisplayController} from './modules/projects.js';


projectsDisplayController.displayProjects();



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
    project.addEventListener('click', (e) => {

      if (e.target.nodeName === 'H3') {

        // Display project in main panel
        let activeProjects = JSON.parse(localStorage.getItem('projects'));
        let projectToDisplay = e.target.parentElement.id;

        activeProjects.forEach(proj => {
          if (proj.id === projectToDisplay) {

            const mainPanel = document.querySelector('main');
            const mainHeader = document.querySelector('h1');
            const mainForm = document.querySelector('main > form');

            mainHeader.textContent = proj.name;

            const taskContainer = document.createElement('ul');

            if (!mainPanel.contains(taskContainer)) {
            mainPanel.insertBefore(taskContainer, mainForm);
            }

            if (proj.tasks) {
              // console.log(proj.tasks);
              proj.tasks.forEach(task => {
                const taskListItem = document.createElement('li');
                taskListItem.classList.add('task-item');
                const taskItemWrapper = document.createElement('div');
                const taskName = document.createElement('h3');
                const taskDetails = document.createElement('p');
                const taskDate = document.createElement('span');
                const taskUrgent = document.createElement('span');

                taskName.textContent = task.name;
                taskDetails.textContent = task.details;
                taskDate.textContent = task.due;
                taskUrgent.textContent = task.urgent;

                taskItemWrapper.append(taskName, taskDetails, taskDate, taskUrgent);
                taskListItem.append(taskItemWrapper);
                
                taskContainer.append(taskListItem);
              })

            }



          }
        })


      }

    })
  })

})();


/*****************************/

// let testTask = {
//   name: 'Shop',
//   details: 'Carrots, milk, bread',
//   due: '10-11-2022',
//   urgent: false
// }

const createTask = (name, details, date) => {
  return { name, details, date }
}




// const createTaskContent = (obj) => {
//   const taskWrapper = document.createElement('div');

//   const taskName = document.createElement('h3');

//   const taskDetails = document.createElement('p');

//   const dueDate = document.createElement('span');

//   const star = document.createElement('span');

// }




const tasksDisplayController = (e) => {
  const mainPanel = document.querySelector('main');
  const mainHeader = document.querySelector('h1');
  
  const displayTasks = () => {
    let activeProjects = JSON.parse(localStorage.getItem('projects'));
    



  }

}


