const Joi = require('joi');
const TestServices = require('../../services/TestServices');

module.exports = () => {
    return async (req, res, next) => {
        try {
            const services = new TestServices();
            
            const result = await services.getStatus();
            res.status(result.status).json(result.data);
        } catch (error) {
            console.error('Error in getStatus route:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    };
};
