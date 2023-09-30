
var coursesVisible = false;
let previousCourses = "";

let coursePre = {
   'CSE101': [],
   'CSE114': [],
   'CSE214': ['CSE114'],
   'CSE215': [],
   'CSE216': ['CSE214'],
   'CSE220': ['CSE214'],
   'CSE300': [],
   'CSE303': ['CSE214', 'CSE215'],
   'CSE304': ['CSE216', 'CSE220'],
   'CSE305': ['CSE216'],
   'CSE306': ['CSE216', 'CSE320'],
   'CSE310': ['CSE214', 'CSE220'],
   'CSE312': [],
   'CSE316': ['CSE216'],
   'CSE320': ['CSE220'],
   'CSE416': ['CSE316']
}

let courses = [
   { courseNumber: "CSE101", courseName: "Algorithmic Thinking", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE114", courseName: "Introduction to Object Oriented Programming", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE214", courseName: "Data Structures", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE215", courseName: "Foundations of Computer Science", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE216", courseName: "Programing Abstractions", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE220", courseName: "System Fundamentals I", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE303", courseName: "Introduction to the Theory of Computation", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE304", courseName: "Compiler Design", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE305", courseName: "Database Systems", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE306", courseName: "Operating Systems", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE310", courseName: "Computer Networks", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE316", courseName: "Software Development", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE320", courseName: "System Fundamentals II", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE331", courseName: "Computer Security Basics", seatsRemaining: 40, capacity: 40 },
   { courseNumber: "CSE416", courseName: "Software Engineering", seatsRemaining: 40, capacity: 40 },
];

// The function when the button is clicked which is in the Previous_Courses.html

function setPreviousCourses() {
   const checkboxes = document.querySelectorAll('.property input[type=checkbox]');
   let selectedCourses = [];
// check the all of the element in the checkboxes which is the checked in checkbox
   checkboxes.forEach(checkbox => {
       if (checkbox.checked) {
           selectedCourses.push(checkbox.id);
       }
   });
   previousCourses = selectedCourses.join(', ');  
// Then put the all the item to the localstorage by using JSON.stringify()
   localStorage.setItem('previousCourses', JSON.stringify(selectedCourses));
}

// The function when the button is clicked which is in the Courses.html

function toggleCourses() {

   const nameInput = document.querySelector('input[name="name"]').value.trim();
   const courseList = document.getElementById('courseList'); 
   const toggleButton = document.getElementById('toggleButton');
   const button = document.querySelector('button[onclick="toggleCourses()"]'); 

   // As the button "toggleButton" clicked the text should be changed to the 'Hide Courses'
   // and also it should be changed from 'Hide Courses' to 'Show Courses' by one click
   // Moreover, I blocked the display when the button is 'Show Courses' and display when the button is 'Hide Courses'
   if (toggleButton.innerText === 'Show Courses') {
      toggleButton.innerText = 'Hide Courses';
      courseList.style.display = 'block';
      button.style.display = 'block';  
   }    
   else {
      toggleButton.innerText = 'Show Courses';
      courseList.style.display = 'none';
   }

   const searchString = document.querySelector('input[name="search"]').value.toLowerCase();
   const coursesDiv = document.getElementById('courseList');

   // Clear the previous course list
   coursesDiv.innerHTML = '';

   // This previousCourses is the one that I get data from the local storage that is made by setPreviousCourses() function.
   let previousCourses = JSON.parse(localStorage.getItem('previousCourses')) || [];


   // Exclude courses that were previously select the courses that is not in the list of local storage
   // and when the searchString is existed, and searching string is not part of the courseName.
   let filteredCourses = courses.filter(course => {
      if (previousCourses.includes(course.courseNumber)) 
         return false;

      if (searchString && !course.courseName.toLowerCase().includes(searchString)) 
            return false;
      return true;
   });


   // Display the name which is the user type and context what is desired.
   const nameMessageDiv = document.createElement('div');
   nameMessageDiv.textContent = `${nameInput}, here are the courses you may select:`;
   coursesDiv.appendChild(nameMessageDiv); 

   // Create the element 
   filteredCourses.forEach(course => {
      const courseDiv = document.createElement('div');

      // Create a checkbox for each course line
      const courseCheckbox = document.createElement('input');
      courseCheckbox.type = 'checkbox';
      courseCheckbox.id = course.courseNumber;
      courseCheckbox.name = 'courseSelection';
      courseCheckbox.value = course.courseNumber;

      // Create a label for each checkbox to put the course information
      const courseLabel = document.createElement('label');
      courseLabel.htmlFor = course.courseNumber;
      courseLabel.textContent = `${course.courseNumber}: ${course.courseName} - ${course.seatsRemaining} of ${course.capacity}`;

      // show them in screen
      courseDiv.appendChild(courseCheckbox);
      courseDiv.appendChild(courseLabel);
      coursesDiv.appendChild(courseDiv);
   });
   // Create the button, as it only need to take one time, I took it out form the loop
   // I connected the click with the checkPrerequisites()
   const registerButton = document.createElement('button');
   registerButton.textContent = 'Register';
   registerButton.onclick = checkPrerequisites;  
   coursesDiv.appendChild(registerButton);
}


function checkPrerequisites() {
   // The data from the checkbox in Courses.html
   const selectedCheckboxes = document.querySelectorAll('input[name="courseSelection"]:checked');
   let selectedCourses = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);

   // get the data from the localStorage
   // I used the || as the localStorage might be the null if the users did not check any of checkbox before in the Previous_Courses.html
   // Moreover, if there is no any localStorage data, then previousCourses will be null.
   let previousCourses = JSON.parse(localStorage.getItem('previousCourses')) || [];

   // I used the boolean to figure out the error or alert condition.
   // errorMessage is initialized as empty one.
   let available = true;

   // I checked the previousCourses and the pre-requisites of them and if pre-requisites is not in the local storage
   // warn them to go Previous_Courses.html and redo checkbox.
   previousCourses.forEach(courseCode => {
      let precourses = coursePre[courseCode];
      if (precourses) {  
          precourses.forEach(prerequisite => {
              if (!previousCourses.includes(prerequisite)) {
                  alert('Please use the Update Courses page to indicate courses you have taken. Then return here. \n');
                  available = false;
              }
          });
      }
  });

   // this function checks that the checkbox is wheter included prerequisite or not
   // if the prerequisite of checkbox select is not in the local storage or the data that selected in the checkbox
   // then alert the message.
   selectedCourses.forEach(courseCode => {
      let prerequisites = coursePre[courseCode];
      if (prerequisites) {
          let unmetPrerequisites = prerequisites.filter(pre => !previousCourses.includes(pre) && !selectedCourses.includes(pre));
          if (unmetPrerequisites.length > 0) {
               available = false;
               alert(`${courseCode} requires ${unmetPrerequisites.join(', ')}.\n`);
          }
      }
   });
  
   // if available is true, then it means the course can be selected
   // check it and return the alert and return the local storage as empty one.  
   if (available) {
       alert('Courses Selected: \n' + selectedCourses.join(', ')); 
       setPreviousCourses();  
   }
}
