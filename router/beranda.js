const express = require('express');
const router = express.Router();

const berandaController = require('../controllers/berandaController');
const mitraController = require("../controllers/mitraController");

const {isLoggedIn} = require('../auth/protect');

/*
    *Catatan*

        *Terdapat 2 beranda yaitu admin (user dari pertamina) &  Pengunjung umum.
        *form Login Pertamina masuk saja di router beranda.
    
    *Alasan*✅ ✅ 
    karena bagian tersebut masih dalam ruang lingkup public / pengunjung umum. 


*/

//router-beranda pengunjung umum
router.get('/', berandaController.berandaWeb);

//router-beranda admin.
router.get('/dashboard-pertamina', berandaController.berandaAdmin, isLoggedIn);

//router-login admin.
router.get('/login-pertamina', berandaController.loginPertamina);

//router logout
router.get('/logout', berandaController.logOutAccount);


//router view -CREATE PIN PERTAMINA.
router.get('/TEBNiTYQrFFULHqFQluEuw==', berandaController.createPINPage);


//router post untuk buat pin
router.post('/createPIN', berandaController.CreatingPIN)


//router post untuk login pertamina 

router.post('/login-divisi', berandaController.CheckingPIN);

module.exports = router;