import {
  getDay,
  isThisWeek,
  isToday,
  parseISO
} from "date-fns";
import contentCreator from './modules/content.js';

// Varaiables. Move later
const projectsListContainer = document.querySelector('#projects-list-container');
const mainPanel = document.querySelector('main');
const tasksListContainer = document.querySelector('#tasks-list-container');



const dataController = (() => {

  let currentProjects = !JSON.parse(localStorage.getItem('projects')) 
    ? [] 
    : JSON.parse(localStorage.getItem('projects'));

  let currentDisplay = !localStorage.getItem('display') 
    ? 'all' 
    : localStorage.getItem('display'); 


  const updateData = (input) => {
    let container;

    if (input === 'submit-project' || input === 'submit-task') {
      let item, idPrefix;

      if (input === 'submit-project') {
        const projName = document.querySelector("#project-name-input").value;
        item = new Project(projName);
        container = dataController.currentProjects;
        idPrefix = 'project-'
      } else if (input === 'submit-task') {
        const taskName = document.querySelector('#task-name-input').value;
        const taskDetails = document.querySelector('#task-details-input').value;
        const taskDue = document.querySelector('#task-date-input').value;
        const taskImportant = document.querySelector('#task-important-input').checked;
        let selectedProject = mainPanel.dataset.selected;
    
        item = new Task(taskName, taskDetails, taskDue, taskImportant)
    
        dataController.currentProjects.forEach(proj => {
          if (proj.id === selectedProject) {
            container = proj.tasks;
            idPrefix = `${proj.id}-task-`;
          }
        })
      }

      addItem(item, container);
      setItemId(idPrefix, container);

    } else { // Delete action

      container = dataController.currentProjects;
      removeItem(input, container);

    }

    populateLocalStorage(currentProjects);

    return container;
  }

  const filterTasks = (filter) => {
    let filteredTasks = [];
  
    switch (filter) {
      case 'all':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            filteredTasks.push(task);
          });
        });
        break;
      case 'today':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (isToday(parseISO(task.due))) {
              filteredTasks.push(task);
            }
          });
        });
        break;
      case 'week':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (task.due) {
              if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                filteredTasks.push(task);
              }
            }
          });
        });
        break;
      case 'important':
        currentProjects.forEach(proj => {
          proj.tasks.forEach(task => {
            if (task.important) {
              filteredTasks.push(task);
            }
          });
        });
        break;
      default:
        currentProjects.forEach(proj => {
          if (proj.id === filter) {
            filteredTasks = proj.tasks;
          }
        })
    }
  
    return filteredTasks;
  }

  const populateLocalStorage = (input) => {

    if (typeof input === 'object') {
      localStorage.setItem('projects', JSON.stringify(input));
    } else {
      localStorage.setItem('display', input);
    }
    
  };


  /* Object constructors */
  function Project(name) {
    this.name = name;
    this.tasks = [];
  }

  function Task(name, details, due, important) {
    this.name = name;
    this.details = details;
    this.due = due;
    this.important = important;
    this.completed = false;
  }

  /* Helper functions */
  // Add task/proj items
  const addItem = (obj, arr) => {
    arr.push(obj);
  }

  // Delete task/proj items
  const removeItem = (objId, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === objId) {
        arr.splice(i, 1);
      }
    }
  }

  // Set task/proj id's after adding to list
  const setItemId = (prefix, arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].id = prefix + i;
    }
  }

  return {
    currentProjects,
    currentDisplay,
    updateData,
    filterTasks,
    populateLocalStorage
  }
})();



const displayController = (() => {
  // Set initial display to "All"
  let highlighted;
  let elemId = dataController.currentDisplay;
  highlight(document.getElementById(elemId)); 
  display(dataController.filterTasks('all'), false);
  display(dataController.currentProjects);



  const toggleMenu = () => {
    const navPanel = document.querySelector('nav'); 
    const menuIcon = document.querySelector('.menu-icon');
    const menuToggleTooltip = document.querySelector('#menu-icon-wrapper > .tooltip-text');

    navPanel.classList.toggle('hidden');
  
    if (navPanel.classList.contains('hidden')) {
      menuToggleTooltip.textContent = 'Expand menu';
      menuIcon.textContent = 'menu';
    } else {
      menuToggleTooltip.textContent = 'Collapse menu';
      menuIcon.textContent = 'menu_open';
    }
  }

  const toggleTheme = () => {
    const themeIcon = document.querySelector('.theme-icon');
    const themeToggleTooltip = document.querySelector('#theme-icon-wrapper > .tooltip-text');

    document.body.classList.toggle('dark');
      
    if (document.body.classList.contains('dark')) {
      themeToggleTooltip.textContent = 'Light theme'; 
      themeIcon.textContent = 'brightness_high';
    } else {
      themeToggleTooltip.textContent = 'Dark theme'; 
      themeIcon.textContent = 'brightness_4';
    }
  }

  
  const controlSubFormEvents = (e) => {
    let isProjBtn = e.currentTarget.classList.contains('project-button');
    let action = e.currentTarget.id;
    let form;

    isProjBtn
    ? (form = document.querySelector("#projects-panel form"))
    : (form = document.querySelector("main > form"));  
  
    if (action === 'add-project' || action === 'add-task') {
      hideExtraneousForms(action);
      displayTargetForm(form);
    }
  
    if (action === 'cancel-project' || action === 'cancel-task') {
      hideTargetForm(form);
    }
  
    if (action === 'submit-project' || action === 'submit-task') {
      // dataController.updateData(action);

      // display(dataController.updateData(action));
  

      // Move DOM stuff below 
      if (action === 'submit-project') {
        // display(dataController.currentProjects);
        display(dataController.updateData(action));
        listenersController.addNavListener();
      } else if (action === 'submit-task') {
        display(dataController.updateData(action), false);
        listenersController.addTaskListener();
      }

      
      hideTargetForm(form);
    }

    /* Helper functions */
    // Show correct input form
    // function displayTargetForm(form) {
    //   // Show selected form
    //   form.classList.remove('hidden');
    //   // Focus on first input box
    //   form.querySelector('input').focus();
    //   // Hide add button
    //   form.nextElementSibling.classList.add('hidden');
    // }

    // Hide input form
    // function hideTargetForm(form) {
    //   // Reset form
    //   form.reset();
    //   // Hide selected form
    //   form.classList.add('hidden');
    //   // SHow add button
    //   form.nextElementSibling.classList.remove('hidden');
    // }

    // Hide/remove irrelevant forms 
    // function hideExtraneousForms(action) {
    //   const tasksListContainer = document.querySelector('#tasks-list-container');
    //   let editFormDisplayed = !!tasksListContainer.querySelector('form')
    //   let irrelForm;
    
    //   if (action === 'add-project') {
    //     // Task submission form
    //     irrelForm = document.querySelector('main > form');
    //   } else if (action === 'add-task') {
    //     // Proj submission form
    //     irrelForm = document.querySelector("#projects-panel form");
    //   } else {
    //     let pageForms = document.querySelectorAll('#projects-panel > form, main > form');

    //     console.log(pageForms);

    //   }
    
    //   // If task/proj submission form displayed, hide
    //   if (!irrelForm.classList.contains('hidden')) {
    //     irrelForm.classList.toggle('hidden');
    //     irrelForm.nextElementSibling.classList.toggle('hidden');
    //   }
    
    //   // If task edit form displayed, hide
    //   if (editFormDisplayed) {
    //     let editForm = tasksListContainer.querySelector('form');
    
    //     editForm.previousElementSibling.classList.toggle('hidden');
    //     editForm.remove();
    //   }
    // }
    // function hideExtraneousForms(action) {
    //   const tasksListContainer = document.querySelector('#tasks-list-container');
    //   let editFormDisplayed = !!tasksListContainer.querySelector('form')
    //   let irrelForm;
    
    
    //   if (action === 'add-project') {
    //     // Task submission form
    //     irrelForm = document.querySelector('main > form');
    //   } else if (action === 'add-task') {
    //     // Proj submission form
    //     irrelForm = document.querySelector("#projects-panel form");
    //   }
    
    //   // If task/proj submission form displayed, hide
    //   if (!irrelForm.classList.contains('hidden')) {
    //     irrelForm.classList.toggle('hidden');
    //     irrelForm.nextElementSibling.classList.toggle('hidden');
    //   }
    
    //   // If task edit form displayed, hide
    //   if (editFormDisplayed) {
    //     let editForm = tasksListContainer.querySelector('form');
    
    //     editForm.previousElementSibling.classList.toggle('hidden');
    //     editForm.remove();
    //   }
    // }

  }
  // const controlSubFormEvents = (e) => {

  //   let btn = e.currentTarget;

  //   // let isProjBtn = e.currentTarget.classList.contains('project-button');
  //   let action = e.currentTarget.id;
  //   let form;

  //   // isProjBtn
  //   // ? (form = document.querySelector("#projects-panel form"))
  //   // : (form = document.querySelector("main > form"));  

  //   if (btn.classList.contains('project-button')) {
  //     form = document.querySelector("#projects-panel form");
  //   } else if (btn.classList.contains('task-button')) {
  //     form = document.querySelector("main > form");
  //   } else {
  //     form = document.querySelector('#edit-task-form');
  //   }


  
  //   if (action === 'add-project' || action === 'add-task') {
  //     hideExtraneousForms(action);
  //     displayTargetForm(form);
  //   }
  
  //   if (action === 'cancel-project' || action === 'cancel-task') {
  //     hideTargetForm(form);
  //   }
  
  //   if (action === 'submit-project' || action === 'submit-task') {
  //     // dataController.updateData(action);

  //     // display(dataController.updateData(action));
  

  //     // Move DOM stuff below 
  //     if (action === 'submit-project') {
  //       // display(dataController.currentProjects);
  //       display(dataController.updateData(action));
  //       listenersController.addNavListener();
  //     } else if (action === 'submit-task') {
  //       display(dataController.updateData(action), false);
  //       listenersController.addTaskListener();
  //     }

      
  //     hideTargetForm(form);
  //   }


  //   if (action === 'cancel-edit') {
  //     form.previousElementSibling.classList.toggle('hidden');
  //     form.remove();
  //   }

  //   // if (action === 'submit-edit') {

  //   // }

  //   /* Helper functions */
  //   // Show correct input form
  //   function displayTargetForm(form) {
  //     // Show selected form
  //     form.classList.remove('hidden');
  //     // Focus on first input box
  //     form.querySelector('input').focus();
  //     // Hide add button
  //     form.nextElementSibling.classList.add('hidden');
  //   }

  //   // Hide input form
  //   function hideTargetForm(form) {
  //     // Reset form
  //     form.reset();
  //     // Hide selected form
  //     form.classList.add('hidden');
  //     // SHow add button
  //     form.nextElementSibling.classList.remove('hidden');
  //   }

  //   // Hide/remove irrelevant forms 
  //   function hideExtraneousForms(action) {
  //     const tasksListContainer = document.querySelector('#tasks-list-container');
  //     let editFormDisplayed = !!tasksListContainer.querySelector('form')
  //     let irrelForm;
    
  //     if (action === 'add-project') {
  //       // Task submission form
  //       irrelForm = document.querySelector('main > form');
  //     } else if (action === 'add-task') {
  //       // Proj submission form
  //       irrelForm = document.querySelector("#projects-panel form");
  //     } else {
  //       let pageForms = document.querySelectorAll('#projects-panel > form, main > form');

  //       console.log(pageForms);

  //     }
    
  //     // If task/proj submission form displayed, hide
  //     if (!irrelForm.classList.contains('hidden')) {
  //       irrelForm.classList.toggle('hidden');
  //       irrelForm.nextElementSibling.classList.toggle('hidden');
  //     }
    
  //     // If task edit form displayed, hide
  //     if (editFormDisplayed) {
  //       let editForm = tasksListContainer.querySelector('form');
    
  //       editForm.previousElementSibling.classList.toggle('hidden');
  //       editForm.remove();
  //     }
  //   }
  //   // function hideExtraneousForms(action) {
  //   //   const tasksListContainer = document.querySelector('#tasks-list-container');
  //   //   let editFormDisplayed = !!tasksListContainer.querySelector('form')
  //   //   let irrelForm;
    
    
  //   //   if (action === 'add-project') {
  //   //     // Task submission form
  //   //     irrelForm = document.querySelector('main > form');
  //   //   } else if (action === 'add-task') {
  //   //     // Proj submission form
  //   //     irrelForm = document.querySelector("#projects-panel form");
  //   //   }
    
  //   //   // If task/proj submission form displayed, hide
  //   //   if (!irrelForm.classList.contains('hidden')) {
  //   //     irrelForm.classList.toggle('hidden');
  //   //     irrelForm.nextElementSibling.classList.toggle('hidden');
  //   //   }
    
  //   //   // If task edit form displayed, hide
  //   //   if (editFormDisplayed) {
  //   //     let editForm = tasksListContainer.querySelector('form');
    
  //   //     editForm.previousElementSibling.classList.toggle('hidden');
  //   //     editForm.remove();
  //   //   }
  //   // }

  // }


  const manageNavEvents = (e) => {
    const selection = e.target.closest('li');
    const addTaskBtn = document.querySelector('main > button');
    const mainPanel = document.querySelector('main');

    // If a view option/proj is clicked
    if (selection) { 
      // If click is on a delete icon
      if (e.target.classList.contains('delete-icon')) {
        
        // Remove item, redisplay + add listener to container list
        display(dataController.updateData(selection.id))
        listenersController.addNavListener();

        // If deleted item was displayed in main, display 'All' tasks
        if (selection.id === mainPanel.dataset.selected) {

          mainPanel.dataset.selected = 'all';
          addTaskBtn.classList.add('hidden');

          setMainHeader('all');
          highlight(document.querySelector('#all'));
          display(dataController.filterTasks('all'), false);
          listenersController.addTaskListener();  
        } 
      } else {

        mainPanel.dataset.selected = selection.id;
        (e.target.closest('ul').id === 'view-options-list') ? addTaskBtn.classList.add('hidden') : addTaskBtn.classList.remove('hidden');

        setMainHeader(selection.id);
        highlight(selection);
        display(dataController.filterTasks(selection.id), false);
        listenersController.addTaskListener();  
      }
    }
  }

  const manageTaskEvents = (e) => {
    let editForm = document.querySelector('#edit-task-form');
    let listItem = e.target.closest('li');
    let currentProjs = dataController.currentProjects;
    let selection;
    let wrapper;
    let description;
    let checkbox;
  
    if (listItem) {
      selection = listItem.id;
      wrapper = listItem.querySelector('.task-wrapper');
      description = listItem.querySelector('.task-descr-wrapper');
      checkbox = listItem.querySelector('.checkbox');
    }
  
    for (let i = 0; i < currentProjs.length; i++) {
      for (let j = 0; j < currentProjs[i].tasks.length; j++) {

        if (currentProjs[i].tasks[j].id === selection) {
          let task = currentProjs[i].tasks[j];
  
          if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {
  
            (task.completed) ? task.completed = false : task.completed = true;
            populateLocalStorage(currentProjects);
  
            checkbox.classList.toggle('checked');
            listItem.classList.toggle('completed');
            description.classList.toggle('crossed');
  
          }  
          
          if (e.target.classList.contains('important-icon')) {
  
            (task.important) ? task.important = false : task.important = true; 
            populateLocalStorage(currentProjects);
  

  
            e.target.classList.toggle('important');
  
          } 
          
          if (e.target.classList.contains('edit-icon')) {
  
            // if (editForm) {
            //   editForm.previousElementSibling.classList.toggle('hidden');
            //   editForm.remove();
            // }
  
            // if (!projectForm.classList.contains('hidden')) {
            //   projectForm.classList.toggle('hidden');
            //   addProjectButton.classList.toggle('hidden');
            // }
  
            // if (!taskForm.classList.contains('hidden')) {
            //   taskForm.classList.toggle('hidden');
            //   addTaskButton.classList.toggle('hidden');
            // }

            hideExtraneousForms();

  
            listItem.append(contentCreator.createEditForm(task));
            wrapper.classList.toggle('hidden');
  
          } 
          
          if (e.target.classList.contains('delete-icon')) {
            currentProjects[i].tasks.splice(j, 1);
            populateLocalStorage(currentProjects);
  
            let selectedTasks = [];
  
            if (mainPanel.dataset.selected === 'all') {
  
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
                  selectedTasks.push(task)
  
                })
              })
  
            } else if (mainPanel.dataset.selected === 'today') {
    
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
    
                  if (isToday(parseISO(task.due))) {
                    selectedTasks.push(task);
                  }
    
                })
              })
    
            } else if (mainPanel.dataset.selected === 'week') {
  
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
    
                  if (task.due) {
                    if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                      selectedTasks.push(task)
                    }
                  }
    
                })
              })
    
  
            } else if (mainPanel.dataset.selected === 'important') {
  
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
                  if (task.important) {
                    selectedTasks.push(task);
                  }
                })
              })
              
            } else {
  
              currentProjects[i].tasks.forEach(task => {
                selectedTasks.push(task);
              })
            }
  
            display(selectedTasks, false);
            addTaskListener();
          }
  




          if (e.target.id === 'cancel-edit') {
            editForm.previousElementSibling.classList.toggle('hidden');
            editForm.remove();
  
            // console.log(editForm.previousElementSibling);
  
  
          } else if (e.target.id === 'submit-edit') {
    
            task.name = tasksList.querySelector('#edit-name-input').value;
            task.details = tasksList.querySelector('#edit-details-input').value;
            task.due = tasksList.querySelector('#edit-date-input').value;
            task.important = tasksList.querySelector('#edit-important-input').checked;
    
            populateLocalStorage(currentProjects);
    
            let selectedTasks = [];
    
            if (mainPanel.dataset.selected === 'all') {
    
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
                  selectedTasks.push(task)
    
                })
              })
    
            } else if (mainPanel.dataset.selected === 'today') {
    
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
    
                  if (isToday(parseISO(task.due))) {
                    selectedTasks.push(task);
                  }
    
                })
              })
    
            } else if (mainPanel.dataset.selected === 'week') {
    
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
    
                  if (task.due) {
                    if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
                      selectedTasks.push(task)
                    }
                  }
    
                })
              })
    
    
            } else if (mainPanel.dataset.selected === 'important') {
    
              currentProjects.forEach(proj => {
                proj.tasks.forEach(task => {
                  if (task.important) {
                    selectedTasks.push(task);
                  }
                })
              })
              
            } else {
    
              currentProjects[i].tasks.forEach(task => {
                selectedTasks.push(task);
              })
            }
    
            display(selectedTasks, false);
            addTaskListener();
          }
  
        }
      }
    }
  }
  // const manageTaskEvents = (e) => {
  //   let editForm = document.querySelector('#edit-task-form');
  //   let listItem = e.target.closest('li');
  //   let currentProjs = dataController.currentProjects;
  //   let selection;
  //   let wrapper;
  //   let description;
  //   let checkbox;
  
  //   if (listItem) {
  //     selection = listItem.id;
  //     wrapper = listItem.querySelector('.task-wrapper');
  //     description = listItem.querySelector('.task-descr-wrapper');
  //     checkbox = listItem.querySelector('.checkbox');
  //   }
  
  //   for (let i = 0; i < currentProjs.length; i++) {
  //     for (let j = 0; j < currentProjs[i].tasks.length; j++) {

  //       if (currentProjs[i].tasks[j].id === selection) {
  //         let task = currentProjs[i].tasks[j];
  
  //         if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {
  
  //           (task.completed) ? task.completed = false : task.completed = true;
  //           populateLocalStorage(currentProjects);
  
  //           checkbox.classList.toggle('checked');
  //           listItem.classList.toggle('completed');
  //           description.classList.toggle('crossed');
  
  //         } else if (e.target.classList.contains('important-icon')) {
  
  //           (task.important) ? task.important = false : task.important = true; 
  //           populateLocalStorage(currentProjects);
  

  
  //           e.target.classList.toggle('important');
  
  //         } else if (e.target.classList.contains('edit-icon')) {
  
  //           if (editForm) {
  //             editForm.previousElementSibling.classList.toggle('hidden');
  //             editForm.remove();
  //           }
  
  //           if (!projectForm.classList.contains('hidden')) {
  //             projectForm.classList.toggle('hidden');
  //             addProjectButton.classList.toggle('hidden');
  //           }
  
  //           if (!taskForm.classList.contains('hidden')) {
  //             taskForm.classList.toggle('hidden');
  //             addTaskButton.classList.toggle('hidden');
  //           }
  
  //           listItem.append(contentCreator.createEditForm(task));
  //           wrapper.classList.toggle('hidden');
  
  //         } else if (e.target.classList.contains('delete-icon')) {
  //           currentProjects[i].tasks.splice(j, 1);
  //           populateLocalStorage(currentProjects);
  
  //           let selectedTasks = [];
  
  //           if (mainPanel.dataset.selected === 'all') {
  
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
  //                 selectedTasks.push(task)
  
  //               })
  //             })
  
  //           } else if (mainPanel.dataset.selected === 'today') {
    
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
    
  //                 if (isToday(parseISO(task.due))) {
  //                   selectedTasks.push(task);
  //                 }
    
  //               })
  //             })
    
  //           } else if (mainPanel.dataset.selected === 'week') {
  
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
    
  //                 if (task.due) {
  //                   if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
  //                     selectedTasks.push(task)
  //                   }
  //                 }
    
  //               })
  //             })
    
  
  //           } else if (mainPanel.dataset.selected === 'important') {
  
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
  //                 if (task.important) {
  //                   selectedTasks.push(task);
  //                 }
  //               })
  //             })
              
  //           } else {
  
  //             currentProjects[i].tasks.forEach(task => {
  //               selectedTasks.push(task);
  //             })
  //           }
  
  //           display(selectedTasks, false);
  //           addTaskListener();
  //         }
  
  //         if (e.target.id === 'cancel-edit') {
  //           editForm.previousElementSibling.classList.toggle('hidden');
  //           editForm.remove();
  
  //           // console.log(editForm.previousElementSibling);
  
  
  //         } else if (e.target.id === 'submit-edit') {
    
  //           task.name = tasksList.querySelector('#edit-name-input').value;
  //           task.details = tasksList.querySelector('#edit-details-input').value;
  //           task.due = tasksList.querySelector('#edit-date-input').value;
  //           task.important = tasksList.querySelector('#edit-important-input').checked;
    
  //           populateLocalStorage(currentProjects);
    
  //           let selectedTasks = [];
    
  //           if (mainPanel.dataset.selected === 'all') {
    
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
  //                 selectedTasks.push(task)
    
  //               })
  //             })
    
  //           } else if (mainPanel.dataset.selected === 'today') {
    
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
    
  //                 if (isToday(parseISO(task.due))) {
  //                   selectedTasks.push(task);
  //                 }
    
  //               })
  //             })
    
  //           } else if (mainPanel.dataset.selected === 'week') {
    
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
    
  //                 if (task.due) {
  //                   if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
  //                     selectedTasks.push(task)
  //                   }
  //                 }
    
  //               })
  //             })
    
    
  //           } else if (mainPanel.dataset.selected === 'important') {
    
  //             currentProjects.forEach(proj => {
  //               proj.tasks.forEach(task => {
  //                 if (task.important) {
  //                   selectedTasks.push(task);
  //                 }
  //               })
  //             })
              
  //           } else {
    
  //             currentProjects[i].tasks.forEach(task => {
  //               selectedTasks.push(task);
  //             })
  //           }
    
  //           display(selectedTasks, false);
  //           addTaskListener();
  //         }
  
  //       }
  //     }
  //   }
  // }


  /* Helper functions: */
  // Highlight nav selection
  function highlight(item) {
    if (highlighted) {
      highlighted.classList.remove('highlight');
    }
  
    highlighted = item;
    highlighted.classList.add('highlight');
  }

  // Create item and add to appropriate list
  function display (list, isProject = true) {
    let oldList, listId, container;
  
    if (isProject) {
      container = projectsListContainer;
      oldList = document.querySelector('#projects-list');
      listId = 'projects-list';
    } else {
      container = tasksListContainer;
      oldList = document.querySelector('#tasks-list');
      listId = 'tasks-list';
    }
  
    if (container.contains(oldList)) {
      oldList.remove();
    }
  
    const currentList = document.createElement('ul');
    currentList.id = listId;
    list.forEach(item => { 
      currentList.append(
        isProject ? contentCreator.createProject(item) : contentCreator.createTask(item)
      );
    })
  
    container.append(currentList);
  }

  // Set main h1 text content
  const setMainHeader = (input) => {
    const mainHeader = document.querySelector('h1');

    switch (input) {
    case 'all':
      mainHeader.textContent = 'All Tasks';
      break;
    case 'today':
      mainHeader.textContent = 'Today';
      break;
    case 'week':
      mainHeader.textContent = 'Next 7 Days';
      break;
    case 'important':
      mainHeader.textContent = 'Important';
      break;
    default:
      dataController.currentProjects.forEach(proj => {
        if (proj.id === input) {
          mainHeader.textContent = proj.name;
        }
      })
  }
  }



  // Show correct input form
  function displayTargetForm(form) {
    // Show selected form
    form.classList.remove('hidden');
    // Focus on first input box
    form.querySelector('input').focus();
    // Hide add button
    form.nextElementSibling.classList.add('hidden');
  }

  // Hide input form
  function hideTargetForm(form) {
    // Reset form
    form.reset();
    // Hide selected form
    form.classList.add('hidden');
    // SHow add button
    form.nextElementSibling.classList.remove('hidden');
  }

  // Hide/remove irrelevant forms 
  function hideExtraneousForms(action) {
    const tasksListContainer = document.querySelector('#tasks-list-container');
    let editFormDisplayed = !!tasksListContainer.querySelector('form')
    let irrelForm;
  
    if (action === 'add-project') {
      // Task submission form
      irrelForm = document.querySelector('main > form');
    } else if (action === 'add-task') {
      // Proj submission form
      irrelForm = document.querySelector("#projects-panel form");
    } else { // action === 'show edit form'
      // If create task/proj form not hidden, set = irrelForm
      let pageForms = document.querySelectorAll('#projects-panel > form, main > form');

      pageForms.forEach(form => {
        if (!form.classList.contains('hidden')) {
          irrelForm = form;
          console.log(irrelForm)
        }
      })

    }
  
    if (irrelForm) {
      // If create task/proj form displayed, hide
      if (!irrelForm.classList.contains('hidden')) {
        irrelForm.classList.toggle('hidden');
        irrelForm.nextElementSibling.classList.toggle('hidden');
      }
    }
  
    // If edit task form displayed, hide
    if (editFormDisplayed) {
      let editForm = tasksListContainer.querySelector('form');
  
      editForm.previousElementSibling.classList.toggle('hidden');
      editForm.remove();
    }
  }



  return {
    toggleMenu, 
    toggleTheme,
    controlSubFormEvents,
    manageNavEvents,
    manageTaskEvents
  }
})();



const listenersController = (() => {

  const addMenuToggListener = () => {
    const menuToggle = document.querySelector('.menu-icon');

    menuToggle.addEventListener('click', displayController.toggleMenu);
  }

  const addThemeToggListener = () => {
    const themeToggle = document.querySelector('.theme-icon');

    themeToggle.addEventListener('click', displayController.toggleTheme);
  }

  const addNavListener = () => {
    // In lieu of adding listener to list items, add to lists
    // May be more efficient?
    let navLists = document.querySelectorAll('nav ul');

    navLists.forEach(list => {
      list.addEventListener('click', displayController.manageNavEvents)
    })
  }

  const addTaskListener = () => {
  const tasksList = document.querySelector('#tasks-list');

    if (tasksList) {
      tasksList.addEventListener('click', displayController.manageTaskEvents)
    }
  }
  // const addTaskListener = () => {
  // const tasksList = document.querySelector('#tasks-list');

  // if (tasksList) {
  //   tasksList.addEventListener('click', (e) => {

  //     let editForm = tasksList.querySelector('#edit-task-form');
  //     let listItem = e.target.closest('li');
  //     let selection;
  //     let wrapper;
  //     let description;
  //     let checkbox;

  //     if (listItem) {
  //       selection = listItem.id;
  //       wrapper = listItem.querySelector('.task-wrapper');
  //       description = listItem.querySelector('.task-descr-wrapper');
  //       checkbox = listItem.querySelector('.checkbox');
  //     }

  //     for (let i = 0; i < dataController.currentProjects.length; i++) {
  //       for (let j = 0; j < dataController.currentProjects[i].tasks.length; j++) {

  //         if (dataController.currentProjects[i].tasks[j].id === selection) {
  //           let task = dataController.currentProjects[i].tasks[j];

  //           if (e.target.classList.contains('checkbox') || e.target.classList.contains('checked')) {

  //             (task.completed) ? task.completed = false : task.completed = true;
  //             populateLocalStorage(currentProjects);

  //             checkbox.classList.toggle('checked');
  //             listItem.classList.toggle('completed');
  //             description.classList.toggle('crossed');

  //           } else if (e.target.classList.contains('important-icon')) {

  //             (task.important) ? task.important = false : task.important = true; 
  //             populateLocalStorage(currentProjects);

  //             // console.log(e.target.classList.contains('important'));

  //             e.target.classList.toggle('important');

  //           } else if (e.target.classList.contains('edit-icon')) {

  //             if (editForm) {
  //               editForm.previousElementSibling.classList.toggle('hidden');
  //               editForm.remove();
  //             }

  //             if (!projectForm.classList.contains('hidden')) {
  //               projectForm.classList.toggle('hidden');
  //               addProjectButton.classList.toggle('hidden');
  //             }

  //             if (!taskForm.classList.contains('hidden')) {
  //               taskForm.classList.toggle('hidden');
  //               addTaskButton.classList.toggle('hidden');
  //             }

  //             listItem.append(createEditForm(task));
  //             wrapper.classList.toggle('hidden');

  //           } else if (e.target.classList.contains('delete-icon')) {
  //             currentProjects[i].tasks.splice(j, 1);
  //             populateLocalStorage(currentProjects);

  //             let selectedTasks = [];

  //             if (mainPanel.dataset.selected === 'all') {

  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
  //                   selectedTasks.push(task)

  //                 })
  //               })

  //             } else if (mainPanel.dataset.selected === 'today') {
      
  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
      
  //                   if (isToday(parseISO(task.due))) {
  //                     selectedTasks.push(task);
  //                   }
      
  //                 })
  //               })
      
  //             } else if (mainPanel.dataset.selected === 'week') {

  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
      
  //                   if (task.due) {
  //                     if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
  //                       selectedTasks.push(task)
  //                     }
  //                   }
      
  //                 })
  //               })
      

  //             } else if (mainPanel.dataset.selected === 'important') {

  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
  //                   if (task.important) {
  //                     selectedTasks.push(task);
  //                   }
  //                 })
  //               })
                
  //             } else {

  //               currentProjects[i].tasks.forEach(task => {
  //                 selectedTasks.push(task);
  //               })
  //             }

  //             display(selectedTasks, false);
  //             addTaskListener();
  //           }

  //           if (e.target.id === 'cancel-edit') {
  //             editForm.previousElementSibling.classList.toggle('hidden');
  //             editForm.remove();

  //             // console.log(editForm.previousElementSibling);


  //           } else if (e.target.id === 'submit-edit') {
      
  //             task.name = tasksList.querySelector('#edit-name-input').value;
  //             task.details = tasksList.querySelector('#edit-details-input').value;
  //             task.due = tasksList.querySelector('#edit-date-input').value;
  //             task.important = tasksList.querySelector('#edit-important-input').checked;
      
  //             populateLocalStorage(currentProjects);
      
  //             let selectedTasks = [];
      
  //             if (mainPanel.dataset.selected === 'all') {
      
  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
  //                   selectedTasks.push(task)
      
  //                 })
  //               })
      
  //             } else if (mainPanel.dataset.selected === 'today') {
      
  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
      
  //                   if (isToday(parseISO(task.due))) {
  //                     selectedTasks.push(task);
  //                   }
      
  //                 })
  //               })
      
  //             } else if (mainPanel.dataset.selected === 'week') {
      
  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
      
  //                   if (task.due) {
  //                     if (isThisWeek(parseISO(task.due), {weekStartsOn: getDay(new Date())})) {
  //                       selectedTasks.push(task)
  //                     }
  //                   }
      
  //                 })
  //               })
      
      
  //             } else if (mainPanel.dataset.selected === 'important') {
      
  //               currentProjects.forEach(proj => {
  //                 proj.tasks.forEach(task => {
  //                   if (task.important) {
  //                     selectedTasks.push(task);
  //                   }
  //                 })
  //               })
                
  //             } else {
      
  //               currentProjects[i].tasks.forEach(task => {
  //                 selectedTasks.push(task);
  //               })
  //             }
      
  //             display(selectedTasks, false);
  //             addTaskListener();
  //           }

  //         }
  //       }
  //     }
  //   })
  // }
  // }

  const addFormButtonListeners = () => {
    const formBtns = document.querySelectorAll('button');
  
    formBtns.forEach(btn => {
      btn.addEventListener('click', displayController.controlSubFormEvents);
    })
  }

  addMenuToggListener();
  addThemeToggListener();
  addNavListener(); // Only on task views on start
  addTaskListener();
  addFormButtonListeners();

  return {
    addMenuToggListener,
    addThemeToggListener,
    addNavListener,
    addTaskListener,
    addFormButtonListeners
  }
})();









