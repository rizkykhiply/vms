// Import Modules
const Queue = require('bull');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

// Import Config
const { REDIS_HOST } = require('../constant.conf');

// Define Create Queue
const createQueue = (name) => {
    return new Queue(name, REDIS_HOST);
};

// Define Config Queue
const configQueue = (queue) => {
    const bullAdapter = [];

    for (let index = 0; index < queue.length; index++) {
        bullAdapter.push(new BullAdapter(queue[index]));
    }

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({ queues: bullAdapter, serverAdapter });

    return serverAdapter;
};

// Export All Queues
module.exports = {
    createQueue,
    configQueue,
};
