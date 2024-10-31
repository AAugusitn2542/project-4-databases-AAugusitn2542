/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
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

    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        console.log('adding initial data...');
        const insertQuery = `
            INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Ambrogio', '409 899 9944', 'Andre', '/images/Ambrogio.jpg');

             INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('CowboyStar', '650 888 4944', 'Heri', '/images/CowboyStar.jpg');

             INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Hodad', '510 456 4044', 'Alex', '/images/Hodad.jpg');

            INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('The Crack Shack', '209 458 8904', 'Jason', '/images/theCrackShack.jpg');

            INSERT INTO restaurants (name, phone, address, photo) VALUES 
            ('Smokinggoats', '408 910 3456', 'Sharod', '/images/Smokinggoats.jpg');
            
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