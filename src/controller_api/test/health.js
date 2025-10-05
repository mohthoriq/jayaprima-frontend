const TestServices = require('../../services/TestServices');

module.exports = () => {
    return async (req, res, next) => {
        try {
            const services = new TestServices();
            const result = await services.healthCheck();
            
            res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Error in health route:', error);
            res.status(503).json({
                success: false,
                message: 'Service unavailable',
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    };
};
