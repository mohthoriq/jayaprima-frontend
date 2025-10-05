class DashboardController {
    /**
     * Render the home page
     */
    static async index(req, res) {
        try {
            const data = {
                title: 'Home',
                currentTime: new Date().toLocaleString(),
                environment: process.env.NODE_ENV || 'development',
                nodeVersion: process.version,
                uptime: Math.floor(process.uptime()),
                memoryUsage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
            };

            res.render('dashboard', data);
        } catch (error) {
            console.error('Error in HomeController.index:', error);
            res.status(500).render('error', {
                title: 'Error',
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

module.exports = DashboardController;