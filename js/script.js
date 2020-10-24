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

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   const studentList = document.querySelector('.student-list');
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
   const pagesList = document.querySelector('.link-list');
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