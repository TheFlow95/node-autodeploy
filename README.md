# Node Auto Deploy

node-autodeploy is a tool to automatically deploy your Node.js projects on server using GitHub webhooks.

After creating your webhook, install this tool on the same server as your project.

## Installation

1. Create a configuration file by duplicating the `config.json.dist` file and editing it.
2. Start the server (you might want to use a tool like [PM2](https://www.npmjs.com/package/pm2))
3. You're ready!

## Configuration

- `SECRET`: The secret key you set in your webhook
- `PORT`: The port number for the server to listen
- `REPO`: Absolute path to your repository