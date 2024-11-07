/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
        console.log('Dropped tables successfully');
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        console.log('creating restaurants...');
        const createQuery = `
            CREATE TABLE IF NOT EXISTS restaurants(
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name  TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT
            );
        `;
        await pool.query(createQuery);
        console.log('created restaurants');
         
        // Create the reviews table 
         console.log('Creating reviews...');
         const createReviewsQuery = `
             CREATE TABLE IF NOT EXISTS reviews (
                 id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                 restaurant_id INT NOT NULL,
                 review_text TEXT NOT NULL,
                 rating INT CHECK (rating BETWEEN 1 AND 5),
                 FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
             );
         `;
         await pool.query(createReviewsQuery);
         console.log('Created reviews');

    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        console.log('adding initial data...');
        const insertQuery = `
            INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Ambrogio 15', '(858) 291-8650', '926 Turquoise St, San Diego, CA 92109', '/images/Ambrogio.jpg');

             INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Cowboy Star', '(619) 450-5880', '640 10th Ave, San Diego, CA 92101', '/images/CowboyStar.jpg');

             INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Hodad', '(619) 224-4623', '5010 Newport Ave, San Diego, CA 92107', '/images/Hodad.jpg');

            INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('The Crack Shack', '(619) 795-3299', '2266 Kettner Blvd, San Diego, CA 92101', '/images/theCrackShack.jpg');

            INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Smoking Goats', '(619) 955-5295', '3408 30th St, San Diego, CA 92104', '/images/Smokinggoat.jpg');

            INSERT INTO reviews (restaurant_id, review_text, rating) VALUES
                (1, 'Great pasta and cozy atmosphere!', 5),
                (2, 'Good food but service was a bit slow.', 4),
                (3, 'Amazing burgers and friendly staff!', 5),
                (4, 'The fries were a bit salty, but overall great!', 3);
            
        `;
        await pool.query(insertQuery);
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();

// @ 10:00am 10/29 - > indeed populated data  on postges.railway