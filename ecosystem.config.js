module.exports = {
  apps : [{
    name: "main",
    script: "./main.js",
    cron_restart: '0 * * * *',
    exp_backoff_restart_delay: 10000,
    args: [
      "--color"
    ],
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}