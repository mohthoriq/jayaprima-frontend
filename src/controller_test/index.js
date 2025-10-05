const { Router } = require("express");
const TestController = require('./TestController');

module.exports = () => {
    const app = Router();

    // View Routes
    app.get('/', TestController.index);
    app.get('/dashboard', TestController.dashboard);
    app.get('/test', TestController.test);
    app.get('/status', TestController.status);

    return app;
};