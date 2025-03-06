const db = require('../config/db');

const addSchool = (name, address, latitude, longitude) => {
    return db.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
    );
};

const getAllSchools = () => {
    return db.query('SELECT * FROM schools');
};

module.exports = { addSchool, getAllSchools };