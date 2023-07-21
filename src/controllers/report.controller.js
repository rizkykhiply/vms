// Import Models
const { models } = require('../models');

// Define Report Count Day Controller
module.exports.reportCountDayController = async (req, res, next) => {
    try {
        const [registrasi, karyawan, transaksi] = await Promise.all([
            models.registrasiModels.getCountRegistrasiPerDay(),
            models.karyawanModels.getCountKaryawanPerDay(),
            models.transaksiModels.getCountTransaksiPerDay(),
        ]);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: {
                ...registrasi,
                ...karyawan,
                ...transaksi,
            },
        });
    } catch (error) {
        next(error);
    }
};
