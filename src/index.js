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
