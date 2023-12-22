const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const util = require('util');


const db = require('../utils/database');



const query = util.promisify(db.query).bind(db);


const fetchDataHSE = async () =>{
    try{
        const [totalBlmDiprosesHSE,totalDiterimaHSE, totalDitolakHSE] = await Promise.all([
            query("SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountHSE FROM hseplan_table"),
            query("SELECT SUM(status_mitra = 'Diterima') AS diterimaCountHSE FROM hseplan_table"),
            query("SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountHSE FROM hseplan_table"),
            
        ]);

        const blmDiprosesCountHSE = totalBlmDiprosesHSE[0].blmDiprosesCountHSE;
        const diterimaCountHSE = totalDiterimaHSE[0].diterimaCountHSE;
        const ditolakCountHSE = totalDitolakHSE[0].ditolakCountHSE;

        return {
            blmDiprosesCountHSE,
            diterimaCountHSE,
            ditolakCountHSE
        }
    }

    catch(err){
        throw err;
    }
}

const fetchDataPSB = async () =>{
    try{
        const [totalBlmDiprosesPSB,totalDiterimaPSB, totalDitolakPSB] = await Promise.all([
            query("SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountPSB FROM psb_table"),
            query("SELECT SUM(status_mitra = 'Diterima') AS diterimaCountPSB FROM psb_table"),
            query("SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountPSB FROM psb_table"),
            
        ]);

        const blmDiprosesCountPSB = totalBlmDiprosesPSB[0].blmDiprosesCountPSB;
        const diterimaCountPSB = totalDiterimaPSB[0].diterimaCountPSB;
        const ditolakCountPSB = totalDitolakPSB[0].ditolakCountPSB;

        return {
            blmDiprosesCountPSB,
            diterimaCountPSB,
            ditolakCountPSB
        }
    }

    catch(err){
        throw err;
    }
}

const fetchDataPB = async () =>{
    try{
        const [totalBlmDiprosesPB,totalDiterimaPB, totalDitolakPB] = await Promise.all([
            query("SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountPB FROM pb_table"),
            query("SELECT SUM(status_mitra = 'Diterima') AS diterimaCountPB FROM pb_table"),
            query("SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountPB FROM pb_table"),
            
        ]);

        const blmDiprosesCountPB = totalBlmDiprosesPB[0].blmDiprosesCountPB;
        const diterimaCountPB = totalDiterimaPB[0].diterimaCountPB;
        const ditolakCountPB = totalDitolakPB[0].ditolakCountPB;

        return {
            blmDiprosesCountPB,
            diterimaCountPB,
            ditolakCountPB
        }
    }

    catch(err){
        throw err;
    }
}

const fetchDataPA = async () =>{
    try{
        const [totalBlmDiprosesPA,totalDiterimaPA, totalDitolakPA] = await Promise.all([
            query("SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountPA FROM pa_table"),
            query("SELECT SUM(status_mitra = 'Diterima') AS diterimaCountPA FROM pa_table"),
            query("SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountPA FROM pa_table"),
            
        ]);

        const blmDiprosesCountPA = totalBlmDiprosesPA[0].blmDiprosesCountPA;
        const diterimaCountPA = totalDiterimaPA[0].diterimaCountPA;
        const ditolakCountPA = totalDitolakPA[0].ditolakCountPA;

        return {
            blmDiprosesCountPA,
            diterimaCountPA,
            ditolakCountPA
        }
    }

    catch(err){
        throw err;
    }
}

exports.berandaWeb = (req, res) => {
    const berandaTitle = "Beranda | SIBER Pertamina Limau Field"; // Gantilah dengan data atau variabel yang sesuai

    res.render('index',{
        berandaTitle
    });
}

exports.berandaAdmin = async (req,res) =>{
    const DashboardAdminTitle = "Dashboard Pertamina";

    const {
        blmDiprosesCountHSE,
        diterimaCountHSE,
        ditolakCountHSE
    } = await fetchDataHSE();

    const {
        blmDiprosesCountPSB,
        diterimaCountPSB,
        ditolakCountPSB

    } = await fetchDataPSB();

    const {
        blmDiprosesCountPB,
        diterimaCountPB,
        ditolakCountPB

    } = await fetchDataPB();

    const {
        blmDiprosesCountPA,
        diterimaCountPA,
        ditolakCountPA

    } = await fetchDataPA();

    res.render('dashboardAdmin',{
        DashboardAdminTitle,

        //HSE
        blmDiprosesCountHSE,
        diterimaCountHSE,
        ditolakCountHSE,

        //PSB

        blmDiprosesCountPSB,
        diterimaCountPSB,
        ditolakCountPSB,

        //PB
        blmDiprosesCountPB,
        diterimaCountPB,
        ditolakCountPB,

        //PA
        blmDiprosesCountPA,
        diterimaCountPA,
        ditolakCountPA

    });

}


//get view login Pertamina
exports.loginPertamina = (req,res)=>{
    res.render('loginPertamina',{
        
    })
}


//get view create pin page.
exports.createPINPage = (req,res)=>{
    res.render('createPIN');
};


// function untuk memeriksa PIN saat login
exports.CheckingPIN = async (req, res) => {


    // destructuring
    const { username, password } = req.body;
    // declare sql query
    const sql = "SELECT * FROM pertamina_divisi WHERE username = ?";
    db.query(sql, username, (err, resultQuery) => {
    if (err) {
        throw err;
    } 
    else if (resultQuery.length === 0) {
        return res.send("username tidak ditemukan");
    }

    bcrypt.compare(password, resultQuery[0].password, (err, result) => {
        if (err) {
            throw err;
        }
        if (!result) {
            
        return res.send("Password salah");
        // res.render("login", {
        //     loginData: data,
        //     notifier: true,
        // });
        } else {
   
            // res.send('berhasil')
            res.redirect('/dashboard-pertamina')
        }
    });
    });
};





//function untuk buat PIN pertamina-divisi.
exports.CreatingPIN = async (req, res) => {
    //variabel untuk input data PIN
    const password = req.body.password;

    // Generate salt untuk hashing PIN
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Mengenkripsi PIN menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    const fieldsDivisi = {
        password: hashedPassword
    }

    const insertDivisiQ = "INSERT INTO pertamina_divisi SET ?"

    db.query(insertDivisiQ, fieldsDivisi, (err, results) => {
        if (err) {
            console.error('Registration error:', err);
            return res.send('Registration failed');
        }

        res.send('Buat PIN success. <br><a href="/TEBNiTYQrFFULHqFQluEuw==">Kembali</a>')
        console.log(results);
    });
};
