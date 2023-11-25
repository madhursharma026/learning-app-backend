module.exports = {
  apps: [
    {
      name: 'ENGLISH_NITI',
      script: 'dist/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
