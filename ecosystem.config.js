module.exports = {
    apps: [
        {
            name: 'app',
            script: './dist/index.js',
            env: {
                NODE_ENV: 'development',
            },
            watch: ['./dist/index.js'],
            env_production: {
                NODE_ENV: 'production',
            },
            watch_delay: 1000
        },
        {
            name: 'app_dev',
            script: './src/index.ts',
            env: {
                NODE_ENV: 'development',
            }
        }
    ],
};