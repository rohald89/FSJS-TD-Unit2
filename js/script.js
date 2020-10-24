/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const pagesList = document.querySelector('.link-list');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   studentList.innerHTML = "";
   // loop over all student objects
   list.forEach((student, index) => {
      // find out wether the student object should be displayed
      if(index >= startIndex && index < endIndex){
         const li = document.createElement('LI');
         li.className = "student-item cf";
         li.innerHTML = `
         <div class="student-details">
           <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
           <h3>${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${student.registered.date}</span>
         </div>
         `;
         studentList.appendChild(li);
      }
   });
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = list => {
   // find out how many pages are needed for all the student cards
   const pages = Math.ceil(list.length / itemsPerPage);
   pagesList.innerHTML = "" ;
   for ( let i = 1 ; i <= pages ; i++) {
      pagesList.insertAdjacentHTML('beforeend', ` 
      <li>
         <button type="button">${i}</button>
      </li>
      `);
   }
   pagesList.querySelector('button').classList.add('active');
   pagesList.addEventListener('click', e => {
      if(e.target.tagName === "BUTTON"){
         // loop over the buttons to remove the active class
         pagesList.querySelectorAll('button').forEach(button => {
            button.classList.remove('active');
         });
         e.target.classList.add('active');
         // load the student cards for the clicked page number
         showPage(list, e.target.textContent);
      }
   });
};


// Call functions
showPage(data, 1);
addPagination(data);


/* Search feature */

// add the input field to the page
document.querySelector('.header').insertAdjacentHTML('beforeend', `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`);

const searchFunction = (list, input) => {
   // loop over the list to check if the first or last name includes the input value
   const students = list.filter(student => student.name.first.toLowerCase().includes(input) || student.name.last.toLowerCase().includes(input));
   if(students.length !== 0){
      // load the student cards and pagination when there's at least one object left
      showPage(students, 1);
      addPagination(students);
   } else {
      // when there are no results for the search display to the page and hide the pagination
      studentList.innerHTML = 'No students found';
      pagesList.innerHTML = '';
   }
   
};

const search = document.querySelector('#search');
search.addEventListener('keyup', e => searchFunction(data, e.target.value));
