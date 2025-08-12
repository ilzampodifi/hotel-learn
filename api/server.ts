import express from "express";
import compression from "compression";
import { Server } from "http";

let server: Server;
const app = express();
const port = Number(process.env.API_PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const gracefulShutdown = (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

server = app.listen(port, () => {
  const lines = [
    `\x1b[32m✓\x1b[0m Server running`,
    `http://localhost:${port}`,
    `Environment: \x1b[33m${process.env.NODE_ENV || 'development'}\x1b[0m`
  ];

  const w = Math.max(...lines.map(l => l.replace(/\x1b\[[0-9;]*m/g, '').length));
  const pad = (txt: string) => txt + ' '.repeat(w - txt.replace(/\x1b\[[0-9;]*m/g, '').length);

  console.log(`\x1b[36m╭${'─'.repeat(w + 2)}╮\x1b[0m`);
  lines.forEach(l => console.log(`\x1b[36m│\x1b[0m ${pad(l)} \x1b[36m│\x1b[0m`));
  console.log(`\x1b[36m╰${'─'.repeat(w + 2)}╯\x1b[0m`);
  console.log(`\x1b[90mPress Ctrl+C to stop\x1b[0m\n`);
});

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', () => gracefulShutdown('uncaughtException'));
process.on('unhandledRejection', () => gracefulShutdown('unhandledRejection'));