const { Router } = require("express");
const DashboardController = require('./DashboardController');

module.exports = () => {
    const app = Router();

    // View Routes
    app.get('/', (req, res) => {
        const data = {
            layout:""
        }
        res.render('login', data);
    });
    app.get('/admin', DashboardController.index);

    return app;
};