const { Router } = require("express");

const test = require("./test");

module.exports = () => {
    const api = Router();

    api.use("/test", test());

    // Health check endpoint (JSON API)
    api.get('/health', (req, res) => {
        res.status(200).json({
            status: 'OK',
            message: 'Server is running',
            timestamp: new Date().toISOString()
        });
    });

    // API info endpoint (JSON API)
    api.get('/api-info', (req, res) => {
        res.status(200).json({
            message: 'Welcome to Jaya Prima Frontend API',
            version: '1.0.0',
            endpoints: {
                health: '/health',
                api: '/api',
                test: '/api/test',
                views: {
                    home: '/',
                    dashboard: '/dashboard',
                    test: '/test',
                    status: '/status'
                }
            }
        });
    });

    return api;
};