module.exports = {
  apps: [
    {
      name: "dc-bot",
      script: "index.js",
      watch: true,
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
