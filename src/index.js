
let projectContainer = !localStorage.length
  ? []
  : JSON.parse(localStorage.getItem("projects"));


function Project(name) {
  this.name = name
  this.tasks = [];
}

Project.prototype = {
  constructor: Project,

  addItem: function (container) {
    container.push(this);
  },

  removeItem: function (itemId, container) {
    for (let i = 0; i < container.length; i++) {
      if (container[i].id === itemId) {
        container.splice(i, 1);
      }
    }
  },

  setItemId: function (item, container) {
    for (let i = 0; i < container.length; i++) {
      item === 'project'
        ? (container[i].id = 'project-' + i)
        : (container[i].id = 'task-' + i);
    }
  }
}

function Task(name, details, date) {
  this.name = name;
  this.details = details;
  this.date = date;
}

Task.prototype = Object.create(Project.prototype);




const addListeners = () => {
  const applicationButtons = document.querySelectorAll('button');
  applicationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('project')) {
        const projectForm = document.querySelector("#projects-panel form");
        const projectTextInput = document.querySelector("#project-name-input");
        const addProjectButton = document.querySelector("#add-project");
        const projectsPanel = document.querySelector('#projects-panel');

        const showForm = () => {
          projectForm.classList.toggle("hidden");
          projectTextInput.focus();
          addProjectButton.classList.toggle("hidden");
        };
      
        const hideForm = () => {
          projectForm.reset();
          projectForm.classList.toggle("hidden");
          addProjectButton.classList.toggle("hidden");
        };

        if (e.target.id === 'add-project') {
          showForm();
        }

        if (e.target.id === 'cancel-project') {
          hideForm();
        }

        if (e.target.id === 'submit-project') {
          let projectName = projectTextInput.value;
          projectName = new Project(projectName);
          projectName.addItem(projectContainer);
          projectName.setItemId('project', projectContainer);

          console.log(projectContainer);

        }

      }
    })
  })
}

addListeners();