/* This module contains functions that create the dynamic page content */

const createProj = (obj) => {
  const projectListItem = document.createElement('li');
  const projectWrapper = document.createElement('div');
  const projectIcon = document.createElement('span');
  const projectTitle = document.createElement('h3');
  const deleteIcon = document.createElement('span');

  projectListItem.classList.add('project-item');
  projectListItem.id = obj.id;
  projectListItem.tabIndex = 0;
  projectWrapper.classList.add('project-wrapper');
  projectIcon.classList.add('material-symbols-rounded', 'decor-icon');
  projectIcon.textContent = 'tools_power_drill';
  projectTitle.textContent = obj.name ? obj.name : 'No name entered';
  deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
  deleteIcon.textContent = 'delete';
  deleteIcon.tabIndex = 0;

  projectWrapper.append(projectIcon, projectTitle, deleteIcon);
  projectListItem.append(projectWrapper);
  return projectListItem;
};

const createTask = (obj) => {
  const taskListItem = document.createElement('li');
  const taskWrapper = document.createElement('div');
  const taskSubWrapper = document.createElement('div');
  const checkbox = document.createElement('div');
  const taskDescrWrapper = document.createElement('div');
  const taskName = document.createElement('h3');
  const taskDetails = document.createElement('p');
  const taskEditWrapper = document.createElement('div');
  const taskDueDate = document.createElement('span');
  const taskImportantIcon = document.createElement('span');
  const editIcon = document.createElement('span');

  taskListItem.classList.add('task-item');
  taskListItem.id = obj.id;
  taskWrapper.classList.add('task-wrapper');
  taskSubWrapper.classList.add('task-sub-wrapper');
  checkbox.classList.add('checkbox');
  checkbox.tabIndex = 0;
  taskDescrWrapper.classList.add('task-descr-wrapper');
  taskName.textContent = obj.name ? obj.name : 'No name entered';
  taskDetails.textContent = obj.details;
  taskEditWrapper.classList.add('task-edit-wrapper');
  taskDueDate.classList.add('task-due-date');
  taskImportantIcon.classList.add('material-symbols-rounded', 'important-icon');
  taskImportantIcon.textContent = 'flag';
  taskImportantIcon.tabIndex = 0;
  taskImportantIcon.id = `${obj.id}-impt`;

  editIcon.classList.add('material-symbols-rounded', 'edit-icon');
  editIcon.textContent = 'more_vert';
  editIcon.tabIndex = 0;
  editIcon.id = `${obj.id}-edit`;

  if (obj.completed) {
    checkbox.classList.add('checked');
    taskListItem.classList.add('completed');
    taskDescrWrapper.classList.add('crossed');
  }
  if (obj.due) {
    taskDueDate.textContent = obj.due;
  } else {
    taskDueDate.textContent = 'No due date';
  }
  if (obj.important) {
    taskImportantIcon.classList.add('important');
  }

  taskEditWrapper.append(taskDueDate, taskImportantIcon, editIcon);
  taskDescrWrapper.append(taskName, taskDetails);
  taskSubWrapper.append(checkbox, taskDescrWrapper);
  taskWrapper.append(taskSubWrapper, taskEditWrapper);
  taskListItem.append(taskWrapper);
  return taskListItem;
};

const createEditForm = (obj) => {
  const form = document.createElement('form');
  const nameLabel = document.createElement('label');
  const nameInput = document.createElement('input');
  const detailsLabel = document.createElement('label');
  const detailsInput = document.createElement('textarea');
  const dateLabel = document.createElement('label');
  const dateInput = document.createElement('input');
  const formSubContainer = document.createElement('div');
  const importantLabel = document.createElement('label');
  const importantInput = document.createElement('input');
  const deleteWrapper = document.createElement('div');
  const deleteIcon = document.createElement('span');
  const btnContainer = document.createElement('div');
  const submitBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');

  form.id = 'edit-task-form';
  nameLabel.htmlFor = 'edit-name-input';
  nameLabel.textContent = 'Task name:';
  nameInput.id = 'edit-name-input';
  nameInput.type = 'text';
  nameInput.placeholder = 'E.g., Get dinner';
  detailsLabel.htmlFor = 'edit-details-input';
  detailsLabel.textContent = 'Details:';
  detailsInput.id = 'edit-details-input';
  detailsInput.rows = '5';
  detailsInput.cols = '30';
  detailsInput.wrap = 'hard';
  detailsInput.placeholder = 'E.g., Taco Bell';
  dateLabel.htmlFor = 'edit-date-input';
  dateLabel.textContent = 'Date due:';
  dateInput.id = 'edit-date-input';
  dateInput.type = 'Date';
  importantLabel.htmlFor = 'edit-important-input';
  importantLabel.textContent = 'Important:';
  importantInput.id = 'edit-important-input';
  importantInput.type = 'checkbox';
  deleteWrapper.textContent = 'Delete:';
  deleteWrapper.classList.add('delete-wrapper');
  deleteIcon.classList.add('material-symbols-rounded', 'delete-icon');
  deleteIcon.textContent = 'delete';
  deleteIcon.tabIndex = 0;
  submitBtn.classList.add('edit-button');
  submitBtn.id = 'submit-edit';
  submitBtn.textContent = 'Submit';
  submitBtn.type = 'button';
  cancelBtn.classList.add('edit-button');
  cancelBtn.id = 'cancel-edit';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.type = 'button';

  nameInput.value = obj.name;
  detailsInput.value = obj.details;
  dateInput.value = obj.due;
  importantInput.checked = obj.important;

  importantLabel.append(importantInput);
  deleteWrapper.append(deleteIcon);
  formSubContainer.append(importantLabel, deleteWrapper);
  btnContainer.append(submitBtn, cancelBtn);
  form.append(
    nameLabel,
    nameInput,
    detailsLabel,
    detailsInput,
    dateLabel,
    dateInput,
    formSubContainer,
    btnContainer
  );
  return form;
};

export { createProj, createTask, createEditForm };
