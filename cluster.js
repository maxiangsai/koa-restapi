'use strict';

const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const app = require('./app');

const workers = {};
if (cluster.isMaster) {
  cluster.on('exit', (worker) => {
    delete workers[worker.pid];
    const newWorker = cluster.fork();
    workers[newWorker.pid] = newWorker;
  });

  for (let i = 0; i < numCPUs; i += 1) {
    const worker = cluster.fork();
    workers[worker.pid] = worker;
  }
} else {
  app.listen(process.env.PORT);
}

process.on('SIGTERM', () => {
  Object.keys(workers).forEach(pid => {
    process.kill(pid);
  });
  process.exit(0);
});
