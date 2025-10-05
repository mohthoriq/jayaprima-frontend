class TestServices {
    constructor() {
        this.serviceName = 'TestServices';
    }

    /**
     * Set status endpoint - returns a success response
     * @param {Object} params - Parameters for setting status
     * @param {string} params.status - Status to set (active, inactive, maintenance)
     * @param {string} params.message - Custom message
     * @param {Object} params.data - Additional data
     * @returns {Promise<Object>} Response object with status and data
     */
    async setStatus(params = {}) {
        try {
            // Simulate some processing time
            await this.delay(100);

            // Extract parameters with defaults
            const {
                status = 'active',
                message = 'Status set successfully',
                data: customData = {}
            } = params;

            // Return success response
            return {
                status: 200,
                data: {
                    success: true,
                    message: message,
                    timestamp: new Date().toISOString(),
                    service: this.serviceName,
                    data: {
                        status: status,
                        version: '1.0.0',
                        environment: process.env.NODE_ENV || 'development',
                        customData: customData,
                        requestParams: params
                    }
                }
            };
        } catch (error) {
            console.error('Error in setStatus:', error);

            // Return error response
            return {
                status: 500,
                data: {
                    success: false,
                    message: 'Failed to set status',
                    error: error.message,
                    timestamp: new Date().toISOString(),
                    service: this.serviceName
                }
            };
        }
    }

    /**
     * Get status endpoint - returns current status
     * @returns {Promise<Object>} Response object with status and data
     */
    async getStatus() {
        try {
            return {
                status: 200,
                data: {
                    success: true,
                    message: 'Status retrieved successfully',
                    timestamp: new Date().toISOString(),
                    service: this.serviceName,
                    data: {
                        status: 'running',
                        uptime: process.uptime(),
                        memory: process.memoryUsage(),
                        version: '1.0.0'
                    }
                }
            };
        } catch (error) {
            console.error('Error in getStatus:', error);

            return {
                status: 500,
                data: {
                    success: false,
                    message: 'Failed to get status',
                    error: error.message,
                    timestamp: new Date().toISOString(),
                    service: this.serviceName
                }
            };
        }
    }

    /**
     * Test endpoint with custom data
     * @param {Object} testData - Custom test data
     * @returns {Promise<Object>} Response object with status and data
     */
    async testWithData(testData = {}) {
        try {
            // Validate input
            if (typeof testData !== 'object') {
                throw new Error('Test data must be an object');
            }

            return {
                status: 200,
                data: {
                    success: true,
                    message: 'Test completed successfully',
                    timestamp: new Date().toISOString(),
                    service: this.serviceName,
                    input: testData,
                    result: {
                        processed: true,
                        inputKeys: Object.keys(testData),
                        inputCount: Object.keys(testData).length
                    }
                }
            };
        } catch (error) {
            console.error('Error in testWithData:', error);

            return {
                status: 400,
                data: {
                    success: false,
                    message: 'Test failed',
                    error: error.message,
                    timestamp: new Date().toISOString(),
                    service: this.serviceName
                }
            };
        }
    }

    /**
     * Legacy test method for backward compatibility
     * @param {Object} data - Test data
     * @returns {Promise<Object>} Response object with status and data
     */
    async test(data) {
        try {
            const responseData = {
                status: true,
                messages: "Data Berhasil Ditambahkan",
                data: data || {},
                timestamp: new Date().toISOString(),
                service: this.serviceName
            };

            return {
                data: responseData,
                status: 200
            };
        } catch (error) {
            console.error('Error in test:', error);

            return {
                data: {
                    status: false,
                    messages: "Terjadi kesalahan",
                    error: error.message,
                    timestamp: new Date().toISOString(),
                    service: this.serviceName
                },
                status: 500
            };
        }
    }

    /**
     * Utility method to simulate delay
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Health check method
     * @returns {Promise<Object>} Health status
     */
    async healthCheck() {
        try {
            return {
                status: 200,
                data: {
                    success: true,
                    message: 'Service is healthy',
                    timestamp: new Date().toISOString(),
                    service: this.serviceName,
                    health: {
                        status: 'healthy',
                        checks: {
                            memory: process.memoryUsage().heapUsed < 100 * 1024 * 1024, // Less than 100MB
                            uptime: process.uptime() > 0
                        }
                    }
                }
            };
        } catch (error) {
            return {
                status: 503,
                data: {
                    success: false,
                    message: 'Service is unhealthy',
                    error: error.message,
                    timestamp: new Date().toISOString(),
                    service: this.serviceName
                }
            };
        }
    }
}

module.exports = TestServices;