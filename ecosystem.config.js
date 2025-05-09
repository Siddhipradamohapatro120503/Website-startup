module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: './',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '0.0.0.0',
        DANGEROUSLY_DISABLE_HOST_CHECK: true
      }
    },
    {
      name: 'backend',
      script: 'npm',
      args: 'run dev',
      cwd: './server',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      }
    }
  ]
};
