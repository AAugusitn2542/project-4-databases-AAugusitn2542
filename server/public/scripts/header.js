/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

/* DOM Selection: The document.getElementById() method selects the HTML elements 
   with the IDs header, nav, and footer 
   from the DOM. */
let header = document.querySelector('header');

let nav = document.querySelector('nav');

let footer = document.querySelector('footer');

// Populate the header with some content | innerHtml -> This property allows you to set the HTML content inside an element. 
header.innerHTML = 
   '<h1> San Diego</h1>'
;




// Populate the nav
nav.className = "navbar";
nav.innerHTML = `<a href="/home">Home</a><a href="/attractions">Attractions</a><a href="/restaurants">Restaurants</a><a href="/index">New Restaurants</a>`;

// Populate the footer
footer.innerHTML = `
  <p>&copy; 2024 My Website</p>
 
`;