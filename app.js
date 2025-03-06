const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', schoolRoutes);

app.get('/', (req, res) => {
    res.send('School Management API is running!');
});

app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});