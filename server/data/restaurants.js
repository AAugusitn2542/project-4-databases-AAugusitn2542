import { pool } from '../config/database.js';

// Get a list of restaurants
const getRestaurants = async () => {
    const results = await pool.query('SELECT * FROM restaurants'); // obtain the data from restaurants table
    //console.log(results.rows);
    return results.rows; // give back array of 3 object from cats data
};


// Get a restaurant by id
const getRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    console.log("Restaurant ID:", id);

    return result.rows[0]; // this is how we get a single cat
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurnat) => {
    const {name, phone, address, photo} = newRestaurnat; // creating variable to pass them in the placeholders
    console.log(newRestaurnat);
    const results = await pool.query('INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, phone, address, photo]);
    return results.rows[0];

};

// Getting reviews from Restaurant 
const getReviewsForRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);
    return result.rows;
    }



const updateRestaurant = async (id, data) => {
    // Fetch the current restaurant data
    const restaurant = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    const currentRestaurant = restaurant.rows[0];

    // Merge the current restaurant data with the new data
    let updatedRestaurant = {
        ...currentRestaurant,
        ...data
    };
    console.log(updatedRestaurant);

    // Destructure the updated fields
    const { name, phone, address, photo } = updatedRestaurant;

    // Perform the update in the database
    const results = await pool.query(
        'UPDATE restaurants SET name = $1, phone = $2, address = $3, photo = $4 WHERE id = $5 RETURNING *',
        [name, phone, address, photo, id]
    );
    return results.rows[0]; // Return the updated restaurant record
};


// Delete a restaurant by id
const deleteRestaurant = async(id) => {
    const restaurant = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]); // we grab the cat
    const results = await pool.query('DELETE FROM restaurants WHERE id = $1', [id]); // delete the cat
    return restaurant.rows[0]; // then return the restaurant details
};



export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };