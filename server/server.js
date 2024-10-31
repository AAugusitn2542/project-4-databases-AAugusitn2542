// Add your server code here.
import express from 'express';
import { backendRouter } from './routes/api.js';  // Adjust path as necessary
import path from 'path';
import { fileURLToPath } from 'url';

//Import restaurant data into data/restaurants.js 
import { getRestaurant, getRestaurants } from './data/restaurants.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the API router with /api prefix
app.use('/api', backendRouter);

//inoke the static middle ware | Pros: being able to re use code over again without re writing it 
app.use(express.static(path.join(__dirname, 'public'))); 

// set up view engine for ejs template
app.set("view engine", "ejs"); /*Tells express to use EJS for rendering views */

app.set("views", path.join(__dirname, 'views')); /*Look for the EJS TEMPLATES in views folder*/


// Setting the paths for each file
app.get('/home', (req, resp) => { /* Define the GET route for the URL | when visited its triggerd */
    resp.sendFile(path.join(__dirname, 'public', 'home.html')); /* Tells Express to send the file as resp to the browers aka client */
});

app.get("/Attractions", (req,resp) => { /* Define the GET route for the URL | when visited its triggerd */
    resp.sendFile(path.join(__dirname, 'public', 'Attractions.html')); /* Tells Express to send the file as resp to the browers aka client */
});


app.get('/restaurants', async (req, resp) => { // was able to fix all the issues i was iterating over a promise
    console.log('GET /restaurants called');
    let allRestaurants = await getRestaurants();  // Fetch the restaurant data
    console.log(allRestaurants);
    resp.render('restaurants', { restaurants: allRestaurants });  // Render the view
});

app.get('/restaurants', async (req, res) => {
    const restaurants = await getRestaurants();
    res.render('restaurants', {restaurants});
});


//Render the restaurants page dynamically with EJS so use resp.render vs sendFile
app.get('/restaurants/:id', async (req,resp) => { /* Define the GET route for the URL | when visited its triggerd */
    
    // Parse the ID from the route parameter
    const id = parseInt(req.params.id, 10);
    
    // Call the function to get the restaurant by ID
    const restaurant = getRestaurant(id);
    
    // If a restaurant is found, render the EJS view with the restaurant data
    if(restaurant){
        resp.render("restaurant-details", {restaurant});
    } else {
        // If not found, return a 404 status with a not found message
        resp.status(404).send('Restaurant not found');
    }
   
});

app.get("/index", (req,resp) => { /* Define a GET route for the url | when visited its trigged */
   
    resp.sendFile(path.join(__dirname, 'public', 'index.html')); /* Where to locate the file */
});


// Setting up the port for our local server using the listen request
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

                                                    /* In Summary */

/* 
So I bulit an Express application aka a node.js framework | Serves web pages and dynamically renders content |
I used the express.static middleware to serve static files from the public directory. I also set up a
view engine for EJS templates. I created routes for each page and used the resp.render method to
render the restaurants page dynamically with EJS. I also used the resp.sendFile method to serve static files
*/ 
                                                    /* Key Terms */

/* path.join(__dirname, 'public') -> with the help of __dirname and 'public' i can directtly tell Express to access the folder */
/* View engine -> allows me to generate HTML Pages Dynamically with js */
/* EJS -> Embedded JavaScript */
/*req -> contains info about HTTP made to the server | resp -> object we use to send a resp back to the client(browser) */
/* resp.render() -> is used to render dynamic view using EJS template */