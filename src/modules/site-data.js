/* This module acts as the database for the application */

// Wrap in IIFE to be able to reassign the variables
// Without it, get a no setter error
const data = (() => {
  // Defines current user projects
  const projects = !JSON.parse(localStorage.getItem('projects'))
    ? []
    : JSON.parse(localStorage.getItem('projects'));

  // Defines nav panel selection displayed in main panel
  const navSelection = !localStorage.getItem('display')
    ? 'all'
    : localStorage.getItem('display');

  return {
    projects,
    navSelection,
  };
})();

export default data;
