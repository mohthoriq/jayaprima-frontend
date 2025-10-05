const { Router } = require("express");
const DashboardController = require('./DashboardController');

module.exports = () => {
    const app = Router();

    // View Routes
    app.get('/', DashboardController.index);

    return app;
};