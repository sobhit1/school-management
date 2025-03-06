const express = require('express');
const { addSchool, listSchools } = require('../controllers/schoolController');

const router = express.Router();

router.post('/addschool', addSchool);

router.get('/listschools', listSchools);

module.exports = router;