const Joi = require('joi');
const TestServices = require('../../services/TestServices');

module.exports = () => {
    return async (req, res, next) => {
        // Validation schema for request body
        const schema = Joi.object().keys({
            name: Joi.string().min(2).max(50).optional(),
            email: Joi.string().email().optional(),
            age: Joi.number().integer().min(0).max(150).optional(),
            data: Joi.object().optional(),
            message: Joi.string().max(200).optional()
        });

        try {
            // Validate request body
            const validatedData = await schema.validateAsync(req.body);
            
            const services = new TestServices();
            const result = await services.testWithData(validatedData);
            
            res.status(result.status).json(result.data);
        } catch (error) {
            if (error.isJoi) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message
                });
            }
            
            console.error('Error in testData route:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    };
};
