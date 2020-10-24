/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIndex = (page * 9) - 9;
   const endIndex = (page * 9) -1;
   const ul = document.querySelector('.student-list');
   ul.innerHTML = "";
   list.forEach((student, index) => {
      console.log(index)
      if(index >= startIndex && index <= endIndex){
         console.log('check');
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
         ul.appendChild(li);
      }
   });
};


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 1);