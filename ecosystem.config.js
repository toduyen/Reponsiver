module.exports = {
  apps: [
    {
      name: "hddt-official",
      script: "server.js",
      instances: "5",
      exec_mode: "cluster",
      node_args: "--max_old_space_size=2048",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
