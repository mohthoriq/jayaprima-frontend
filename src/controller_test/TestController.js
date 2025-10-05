const TestServices = require('../services/TestServices');

class TestController {
    /**
     * Render the home page
     */
    static async index(req, res) {
        try {
            const data = {
                layout: 'test',
                title: 'Home',
                currentTime: new Date().toLocaleString(),
                environment: process.env.NODE_ENV || 'development',
                nodeVersion: process.version,
                uptime: Math.floor(process.uptime()),
                memoryUsage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
            };

            res.render('page_test/home', data);
        } catch (error) {
            console.error('Error in HomeController.index:', error);
            res.status(500).render('error', {
                title: 'Error',
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    /**
     * Render the dashboard page
     */
    static async dashboard(req, res) {
        try {
            const testServices = new TestServices();
            const healthResult = await testServices.healthCheck();

            // Format memory usage
            const memory = process.memoryUsage();
            const formatMemory = (bytes) => Math.round(bytes / 1024 / 1024);

            const data = {
                layout: 'test',
                title: 'Dashboard',
                currentTime: new Date().toLocaleString(),
                lastUpdated: new Date().toLocaleString(),
                serverStatus: {
                    status: 'Running',
                    uptime: Math.floor(process.uptime()),
                    memoryUsage: formatMemory(memory.heapUsed),
                    environment: process.env.NODE_ENV || 'development',
                    nodeVersion: process.version,
                    platform: process.platform,
                    arch: process.arch,
                    memory: {
                        rss: formatMemory(memory.rss),
                        heapUsed: formatMemory(memory.heapUsed),
                        heapTotal: formatMemory(memory.heapTotal),
                        external: formatMemory(memory.external)
                    }
                },
                apiEndpoints: [
                    {
                        method: 'GET',
                        methodColor: 'success',
                        endpoint: '/api/test/set_status',
                        description: 'Set system status (GET request)'
                    },
                    {
                        method: 'POST',
                        methodColor: 'primary',
                        endpoint: '/api/test/set_status',
                        description: 'Set system status with custom data'
                    },
                    {
                        method: 'GET',
                        methodColor: 'success',
                        endpoint: '/api/test/get_status',
                        description: 'Get current system status'
                    },
                    {
                        method: 'POST',
                        methodColor: 'primary',
                        endpoint: '/api/test/test_data',
                        description: 'Test endpoint with data validation'
                    },
                    {
                        method: 'GET',
                        methodColor: 'success',
                        endpoint: '/api/test/health',
                        description: 'Service health check'
                    }
                ]
            };

            res.render('page_test/dashboard', data);
        } catch (error) {
            console.error('Error in HomeController.dashboard:', error);
            res.status(500).render('error', {
                title: 'Error',
                message: 'Failed to load dashboard',
                error: error.message
            });
        }
    }

    /**
     * Render the test page
     */
    static async test(req, res) {
        try {
            const data = {
                layout: 'test',
                title: 'API Testing',
                currentTime: new Date().toLocaleString()
            };

            res.render('page_test/test', data);
        } catch (error) {
            console.error('Error in HomeController.test:', error);
            res.status(500).render('error', {
                title: 'Error',
                message: 'Failed to load test page',
                error: error.message
            });
        }
    }

    /**
     * Render the status page
     */
    static async status(req, res) {
        try {
            const testServices = new TestServices();
            const healthResult = await testServices.healthCheck();

            // Calculate system metrics
            const memory = process.memoryUsage();
            const memoryUsagePercent = Math.round((memory.heapUsed / memory.heapTotal) * 100);

            const data = {
                layout: 'test',
                title: 'System Status',
                currentTime: new Date().toLocaleString(),
                healthStatus: {
                    healthy: healthResult.status === 200
                },
                uptime: Math.floor(process.uptime()),
                memoryUsage: Math.round(memory.heapUsed / 1024 / 1024),
                platform: process.platform,
                arch: process.arch,
                nodeVersion: process.version,
                environment: process.env.NODE_ENV || 'development',
                healthChecks: [
                    {
                        name: 'Memory Usage',
                        icon: 'memory',
                        status: memory.heapUsed < 100 * 1024 * 1024,
                        details: `${Math.round(memory.heapUsed / 1024 / 1024)}MB used`,
                        timestamp: new Date().toLocaleString()
                    },
                    {
                        name: 'Uptime',
                        icon: 'clock',
                        status: process.uptime() > 0,
                        details: `${Math.floor(process.uptime())} seconds`,
                        timestamp: new Date().toLocaleString()
                    },
                    {
                        name: 'API Endpoints',
                        icon: 'link',
                        status: true,
                        details: 'All endpoints responding',
                        timestamp: new Date().toLocaleString()
                    },
                    {
                        name: 'Test Services',
                        icon: 'flask',
                        status: healthResult.status === 200,
                        details: healthResult.status === 200 ? 'Service healthy' : 'Service issues detected',
                        timestamp: new Date().toLocaleString()
                    }
                ],
                cpuUsage: {
                    percentage: Math.floor(Math.random() * 30) + 10, // Simulated
                    color: 'success'
                },
                memoryUsageBar: {
                    percentage: memoryUsagePercent,
                    color: memoryUsagePercent > 80 ? 'danger' : memoryUsagePercent > 60 ? 'warning' : 'success'
                },
                diskUsage: {
                    percentage: Math.floor(Math.random() * 40) + 20, // Simulated
                    color: 'info'
                },
                services: [
                    {
                        name: 'Express Server',
                        icon: 'server',
                        status: true
                    },
                    {
                        name: 'Test Services',
                        icon: 'flask',
                        status: healthResult.status === 200
                    },
                    {
                        name: 'API Endpoints',
                        icon: 'link',
                        status: true
                    },
                    {
                        name: 'Handlebars Engine',
                        icon: 'code',
                        status: true
                    }
                ],
                recentActivity: [
                    {
                        time: '2m',
                        type: 'success',
                        message: 'Health check completed successfully'
                    },
                    {
                        time: '5m',
                        type: 'info',
                        message: 'API endpoint accessed'
                    },
                    {
                        time: '8m',
                        type: 'warning',
                        message: 'Memory usage increased'
                    },
                    {
                        time: '12m',
                        type: 'success',
                        message: 'Server started successfully'
                    }
                ]
            };

            res.render('page_test/status', data);
        } catch (error) {
            console.error('Error in HomeController.status:', error);
            res.status(500).render('error', {
                title: 'Error',
                message: 'Failed to load status page',
                error: error.message
            });
        }
    }
}

module.exports = TestController;
