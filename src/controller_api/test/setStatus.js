const Joi = require('joi');
const TestServices = require('../../services/TestServices');

module.exports = () => {
    return async (req, res, next) => {
        // Schema for optional request body parameters
        const schema = Joi.object().keys({
            status: Joi.string().valid('active', 'inactive', 'maintenance').optional(),
            message: Joi.string().max(200).optional(),
            data: Joi.object().optional()
        });

        try {
            // Validate request body (for POST requests) or use empty object (for GET requests)
            const requestData = req.method === 'GET' ? {} : req.body || {};
            const validatedData = await schema.validateAsync(requestData);

            const services = new TestServices();
            const result = await services.setStatus(validatedData);

            res.status(result.status).json(result.data);
        } catch (error) {
            if (error.isJoi) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message,
                    timestamp: new Date().toISOString()
                });
            }

            console.error('Error in setStatus route:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    };
};
