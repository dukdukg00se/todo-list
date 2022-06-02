
let projectContainer = !localStorage.length
  ? []
  : JSON.parse(localStorage.getItem("projects"));


function Project(name) {
  this.name = name
  this.tasks = [];
}

function Task(name, details, date) {
  this.name = name;
  this.details = details;
  this.date = date;
}

Project.prototype = {
  constructor: Project,

  addProject: function (container) {
    container.push(this);
  },
  addTask: function (name, details, date) {
    this.tasks.push(new Task(name, details, date));
  },
  removeTask: function (taskId) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === taskId) {
        this.tasks.splice(i, 1);
      }
    }
  },
  setTaskId: function () {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].id = 'task-' + i;
    }
  }
}
