const express = require('express');
const { addSchool, listSchools } = require('../controllers/schoolController');

const router = express.Router();

router.post('/schools', addSchool);

router.get('/schools', listSchools);

module.exports = router;