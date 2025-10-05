const { Router } = require('express');
const setStatus = require('./setStatus');

module.exports = () => {
    const api = Router();

    // GET route for setting status
    api.get('/set_status', setStatus());

    // POST route for setting status with data
    api.post('/set_status', setStatus());

    // Additional example routes
    api.get('/get_status', require('./getStatus')());
    api.post('/test_data', require('./testData')());
    api.get('/health', require('./health')());

    return api;
}