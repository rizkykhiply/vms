// Import Config
const { createQueue } = require('../config/bull');

// Import Models
const { models } = require('../models');

// Define Queues
const createRegistrasiQueue = createQueue('Registrasi-Queue');

// Define Registrasi Process Queue
createRegistrasiQueue.process('Registrasi-Process-Queue', async (job) => {
    const getIdBarang = job.data.idBarang;
    const getAntrian = await models.registrasiModels.getAntrianBarang(getIdBarang);
    const getNoAntrian = getAntrian?.noAntrian;
    const calcNoAntrian = getNoAntrian ? +getNoAntrian + 1 : 1;

    await models.registrasiModels.createRegistrasi({ ...job.data, noAntrian: calcNoAntrian });

    return {
        noAntrian: calcNoAntrian,
        status: 'Success',
    };
});

// Define Registrasi Failed Queue
createRegistrasiQueue.on('failed', (job, error) => {
    job.progress(50);
    job.log(`Error: ${job.failedReason || job.stacktrace[0] || error}`);
});

// Define Registrasi Completed Queue
createRegistrasiQueue.on('completed', async (job, result) => {
    job.progress(100);
    job.log(`Success: ${JSON.stringify(result)}`);
});

// Export Registrasi Queue
module.exports = {
    createRegistrasiQueue,
};
