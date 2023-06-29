// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Registrasi Visitor
const getAllRegistrasiVisitor = async () => {
    const getQuery = `
        SELECT a.id, b.nama as petugas, c.nama as kendaraan, a.namaLengkap, a.nik, a.namaInstansi, a.noPolisi, a.tujuan, a.imageScan, a.imageCam, a.kodeQr, a.tglRegistrasi, 
            CASE
                WHEN a.status = 0 THEN "Non Active" ELSE "Active"
            END as status
        FROM tblRegistrasi as a, tblUsers as b, tblKendaraan as c
        WHERE 
            a.idUser = b.id AND
            a.idKendaraan = c.id AND
            a.isRegis = 1
        ORDER BY a.tglRegistrasi DESC
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get All Registrasi Barang
const getAllRegistrasiBarang = async () => {
    const getQuery = `
        SELECT a.id, b.nama as petugas, c.nama as kendaraan, d.nama as barang, a.namaLengkap, a.nik, a.namaInstansi, a.noPolisi, a.imageScan, a.imageCam, a.kodeQr, a.tglRegistrasi, 
            CASE
                WHEN a.status = 0 THEN "Non Active" ELSE "Active"
            END as status
        FROM tblRegistrasi as a, tblUsers as b, tblKendaraan as c, tblBarang as d
        WHERE 
            a.idUser = b.id AND
            a.idKendaraan = c.id AND
            a.idBarang = d.id AND
            a.isRegis = 2
        ORDER BY a.tglRegistrasi DESC
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Registrasi Visitor
const getRegistrasiVisitor = async (id) => {
    const getQuery = `
        SELECT id, idUser, idKendaraan, namaLengkap, nik, namaInstansi, noPolisi, tujuan, imageScan, imageCam, kodeQr, tglRegistrasi, status 
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
        SELECT id, idUser, idKendaraan, idBarang, namaLengkap, nik, namaInstansi, noPolisi, imageScan, imageCam, kodeQr, tglRegistrasi, status 
        FROM tblRegistrasi 
        WHERE 
            id = ? AND
            isRegis = 2
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get Antrian Barang
const getAntrianBarang = async () => {
    const getQuery = `
        SELECT noAntrian 
        FROM tblRegistrasi 
        WHERE 
            isRegis = 2 AND
            DATE_FORMAT(tglRegistrasi, "%Y-%m-%d") = DATE_FORMAT(NOW(), "%Y-%m-%d")  
        ORDER BY id DESC 
        LIMIT 1 
    `;
    const [result] = await baseQuery(getQuery, []);
    return result;
};

// Define Query Create Registrasi
const createRegistrasi = async (params) => {
    const getQuery = `
        INSERT INTO tblRegistrasi
            (idUser, idKendaraan, idBarang, idKios, imageCam, kodeQr, noAntrian, tglRegistrasi, isRegis)
        VALUES
            (?,?,?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [
        params.idUser,
        params.idKendaraan,
        params.idBarang,
        params.idKios,
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
        UPDATE tblRegistrasi idUser = ?, idKendaraan = ?, idBarang = ?, namaLengkap = ?, nik = ?, namaInstansi = ?, noPolisi = ?, tujuan = ?, tglRegistrasi = ?, status = ?
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

// Export All Registrasi Models
module.exports.registrasiModels = {
    getAllRegistrasiVisitor,
    getAllRegistrasiBarang,
    getRegistrasiVisitor,
    getRegistrasiBarang,
    getAntrianBarang,
    createRegistrasi,
    updateRegistrasi,
};
