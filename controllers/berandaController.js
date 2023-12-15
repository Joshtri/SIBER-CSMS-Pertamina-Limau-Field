const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const db = require('../utils/database');

exports.berandaWeb = (req, res) => {
    const berandaTitle = "Beranda | SIBER Pertamina Limau Field"; // Gantilah dengan data atau variabel yang sesuai

    res.render('index',{
        berandaTitle
    })
}

exports.berandaAdmin = (req,res) =>{
    const DashboardAdminTitle = "Dashboard Pertamina";

    res.render('dashboardAdmin',{
        DashboardAdminTitle
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
