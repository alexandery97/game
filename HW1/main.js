// The listener that get the hamburger button query and when it clicks
// when the navToggle that I made is cliked then it will automatically 
// check the data-visible and set the data-visible by opposite value of current value
// It will help to change the statue as long as I click 

document.addEventListener('DOMContentLoaded', (event) => {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
  
    navToggle.addEventListener('click', (event) => {
      const isVisible = primaryNav.getAttribute('data-visible') === 'true';
      primaryNav.setAttribute('data-visible', !isVisible);
    });
});
  