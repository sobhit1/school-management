const schoolModel = require('../models/schoolModel');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await schoolModel.addSchool(name, address, latitude, longitude);
        res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude values' });
        }

        const schools = await schoolModel.getAllSchools();

        const schoolsWithDistance = schools[0].map(school => {
            const schoolLat = parseFloat(school.latitude);
            const schoolLon = parseFloat(school.longitude);

            if (isNaN(schoolLat) || isNaN(schoolLon)) {
                console.warn(`Invalid coordinates for school: ${school.name}`);
                return { ...school, distance: null };
            }

            return {
                id: school.id,
                name: school.name,
                address: school.address,
                latitude: schoolLat,
                longitude: schoolLon,
                distance: calculateDistance(userLat, userLon, schoolLat, schoolLon)
            };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

module.exports = { addSchool, listSchools };