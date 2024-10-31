import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js'; 
const router = express.Router();

// Add routes here

// Define route to get all restaurants
router.get('/restaurants', (req, res) => { // setting up a GET request at /restaurants
    const allRestaurants = getRestaurants(); //store the list in vari. allRestaurants
    res.json(allRestaurants);  // recvied the list as a JSON response common practice with api
});

// Define route to get a specific restaurant by ID
router.get('/restaurants/:id', (req, res) => { // setting up a GET request to obtain a restaurants id
    const id = parseInt(req.params.id, 10); // retrives the id parameter from the requestURL ie: /restuarants/123 | 10 is base sys. 
    const restaurant = getRestaurant(id); // storing the list of rests. and calling id to retrives the id's per request
    if (restaurant) {
        res.json(restaurant);  // Return the specific restaurant data
    } else {
        res.status(404).json({ error: 'Restaurant not found' });
    }
}); // the if statement checks if there a resturant with a asked id exist if true the server returns the data if not return not found

// Define route to create a new restaurant
router.post('/restaurants', (req, res) => {
    
    const newRestaurant = req.body; // no idea what does this...
    
    const createdRestaurant = createRestaurant(newRestaurant);
    
    res.status(201).json(createdRestaurant);  // Return the newly created restaurant
});

// Define route to delete a restaurant by ID
router.delete('/restaurants/:id', (req, res) => {
    
    const id = parseInt(req.params.id, 10); // retrives the id parameter from the requestURL ie: /restuarants/123 | 10 is base sys.
    
    try {
        const deletedRestaurant = deleteRestaurant(id);
        res.json(deletedRestaurant);  // Return the deleted restaurant data
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


export {router as backendRouter};