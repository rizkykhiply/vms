// Import Config
const { validatePaginationFilter } = require('../config/helper.conf');

// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Registrasi Visitor
const getAllRegistrasiVisitor = async (params) => {
    const { pagination, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.nama as petugas, c.nama as kendaraan, d.nama as kios, a.namaLengkap, a.nik, a.namaInstansi, a.noPolisi, a.tujuan, a.imageScan, a.imageCam, a.kodeQr,
        DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi, 
            CASE
                WHEN a.status = 0 THEN "Non Active" ELSE "Active"
            END as status
        FROM tblRegistrasi as a, tblUsers as b, tblKendaraan as c, tblKios as d
        WHERE 
            a.idUser = b.id AND
            a.idKendaraan = c.id AND
            a.idKios = d.id AND
            a.isRegis = 1 AND
            a.status = 1 AND
            (a.namaLengkap LIKE "%${search}%" OR a.kodeQr LIKE "%${search}%")
            ${getFilter}
        ORDER BY a.tglRegistrasi ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get All Registrasi Barang
const getAllRegistrasiBarang = async (params) => {
    const { pagination, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.nama as petugas, c.nama as kendaraan, d.nama as barang, e.nama as kios, a.namaLengkap, a.nik, a.namaInstansi, a.noPolisi, a.imageScan,
        a.imageCam, a.kodeQr, a.noAntrian, DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi,
            CASE
                WHEN a.status = 0 THEN "Non Active" ELSE "Active"
            END as status
        FROM tblRegistrasi as a, tblUsers as b, tblKendaraan as c, tblBarang as d, tblKios as e
        WHERE 
            a.idUser = b.id AND
            a.idKendaraan = c.id AND
            a.idBarang = d.id AND
            a.idKios = e.id AND
            a.isRegis = 2 AND 
            a.status = 1 AND
            a.kodeQr LIKE "%${search}%"   
            ${getFilter}
        ORDER BY a.tglRegistrasi ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Registrasi Visitor
const getRegistrasiVisitor = async (id) => {
    const getQuery = `
        SELECT id, idUser, idKendaraan, idKios, namaLengkap, nik, namaInstansi, noPolisi, tujuan, imageScan, imageCam, kodeQr, 
        DATE_FORMAT(tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi, status 
        FROM tblRegistrasi 
        WHERE 
            id = ? AND
            isRegis = 1
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get Registrasi Barang
const getRegistrasiBarang = async (id) => {
    const getQuery = `
        SELECT id, idUser, idKendaraan, idKios, idBarang, namaLengkap, nik, namaInstansi, noPolisi, imageScan, imageCam, kodeQr,
        DATE_FORMAT(tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi, status 
        FROM tblRegistrasi 
        WHERE 
            id = ? AND
            isRegis = 2
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get Count Registrasi Visitor
const getCountRegistrasiVisitor = async (params) => {
    const { search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT COUNT(1) count FROM tblRegistrasi 
        WHERE 
            isRegis = 1 AND 
            status = 1 AND
            (namaLengkap LIKE "%${search}%" OR kodeQr LIKE "%${search}%")
            ${getFilter}
    `;

    const [result] = await baseQuery(getQuery, []);
    return +result.count;
};

// Define Query Get Count Registrasi Barang
const getCountRegistrasiBarang = async (params) => {
    const { search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT COUNT(1) count FROM tblRegistrasi 
        WHERE 
            isRegis = 2 AND 
            status = 1 AND
            kodeQr LIKE "%${search}%" 
            ${getFilter}
    `;

    const [result] = await baseQuery(getQuery);
    return +result.count;
};

// Define Query Get Count Registrasi Per Day
const getCountRegistrasiPerDay = async () => {
    const getQuery = `
        SELECT 
        (
            SELECT COUNT(1) FROM tblRegistrasi
            WHERE
                isRegis = 1 AND status = 1
        ) totalVisitor,
        (
            SELECT COUNT(1) FROM tblRegistrasi
            WHERE
                isRegis = 2 AND status = 1
        ) totalBarang
        FROM tblRegistrasi
        WHERE 
            DATE_FORMAT(tglRegistrasi, '%Y-%m-%d') = CURDATE() 
        GROUP by 1
    `;
    const [result] = await baseQuery(getQuery);
    return result;
};

// Define Query Get No Antrian Barang
const getNoAntrianBarang = async (id) => {
    const getQuery = `
        SELECT a.noAntrian 
        FROM tblRegistrasi a, tblBarang b
        WHERE 
            a.idBarang = b.id AND
            b.id = ? AND
            a.isRegis = 2 AND
            DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d") = DATE_FORMAT(NOW(), "%Y-%m-%d")  
        ORDER BY a.id DESC 
        LIMIT 1 
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Create Registrasi
const createRegistrasi = async (params) => {
    const getQuery = `
        INSERT INTO tblRegistrasi
            (idUser, idKendaraan, idBarang, idKios, namaLengkap, nik, namaInstansi, noPolisi, tujuan, imageScan, imageCam, kodeQr, noAntrian, tglRegistrasi, isRegis)
        VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [
        params.idUser,
        params.idKendaraan,
        params.idBarang,
        params.idKios,
        params.namaLengkap,
        params.nik,
        params.namaInstansi,
        params.noPolisi,
        params.tujuan,
        params.imageScan,
        params.imageCam,
        params.kodeQr,
        params.noAntrian,
        params.tglRegistrasi,
        params.isRegis,
    ]);
};

// Define Query Update Registrasi
const updateRegistrasi = async (params) => {
    const getQuery = `
        UPDATE tblRegistrasi SET idUser = ?, idKendaraan = ?, idBarang = ?, namaLengkap = ?, nik = ?, namaInstansi = ?, noPolisi = ?, tujuan = ?, tglRegistrasi = ?, status = ?
        WHERE
            id = ?
    `;
    return await baseQuery(getQuery, [
        params.idUser,
        params.idKendaraan,
        params.idBarang,
        params.namaLengkap,
        params.nik,
        params.namaInstansi,
        params.noPolisi,
        params.tujuan,
        params.tglRegistrasi,
        params.status,
        params.id,
    ]);
};

// Define Query Delete Registrasi
const deleteRegistrasi = async (id) => {
    return await baseQuery('DELETE FROM tblRegistrasi WHERE id = ?', [id]);
};

// Export All Registrasi Models
module.exports.registrasiModels = {
    getAllRegistrasiVisitor,
    getAllRegistrasiBarang,
    getRegistrasiVisitor,
    getRegistrasiBarang,
    getCountRegistrasiVisitor,
    getCountRegistrasiBarang,
    getCountRegistrasiPerDay,
    getNoAntrianBarang,
    createRegistrasi,
    updateRegistrasi,
    deleteRegistrasi,
};
