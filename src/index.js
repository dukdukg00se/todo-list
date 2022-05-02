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