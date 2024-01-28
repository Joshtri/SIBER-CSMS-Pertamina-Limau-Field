const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const util = require("util");

const db = require("../utils/database");

const query = util.promisify(db.query).bind(db);

const fetchDataHSE = async () => {
  try {
    const [totalBlmDiprosesHSE, totalDiterimaHSE, totalDitolakHSE] =
      await Promise.all([
        query(
          "SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountHSE FROM hseplan_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Diterima') AS diterimaCountHSE FROM hseplan_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountHSE FROM hseplan_table"
        ),
      ]);

    const blmDiprosesCountHSE = totalBlmDiprosesHSE[0].blmDiprosesCountHSE;
    const diterimaCountHSE = totalDiterimaHSE[0].diterimaCountHSE;
    const ditolakCountHSE = totalDitolakHSE[0].ditolakCountHSE;

    return {
      blmDiprosesCountHSE,
      diterimaCountHSE,
      ditolakCountHSE,
    };
  } catch (err) {
    throw err;
  }
};

const fetchDataPSB = async () => {
  try {
    const [totalBlmDiprosesPSB, totalDiterimaPSB, totalDitolakPSB] =
      await Promise.all([
        query(
          "SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountPSB FROM psb_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Diterima') AS diterimaCountPSB FROM psb_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountPSB FROM psb_table"
        ),
      ]);

    const blmDiprosesCountPSB = totalBlmDiprosesPSB[0].blmDiprosesCountPSB;
    const diterimaCountPSB = totalDiterimaPSB[0].diterimaCountPSB;
    const ditolakCountPSB = totalDitolakPSB[0].ditolakCountPSB;

    return {
      blmDiprosesCountPSB,
      diterimaCountPSB,
      ditolakCountPSB,
    };
  } catch (err) {
    throw err;
  }
};

const fetchDataPB = async () => {
  try {
    const [totalBlmDiprosesPB, totalDiterimaPB, totalDitolakPB] =
      await Promise.all([
        query(
          "SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountPB FROM pb_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Diterima') AS diterimaCountPB FROM pb_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountPB FROM pb_table"
        ),
      ]);

    const blmDiprosesCountPB = totalBlmDiprosesPB[0].blmDiprosesCountPB;
    const diterimaCountPB = totalDiterimaPB[0].diterimaCountPB;
    const ditolakCountPB = totalDitolakPB[0].ditolakCountPB;

    return {
      blmDiprosesCountPB,
      diterimaCountPB,
      ditolakCountPB,
    };
  } catch (err) {
    throw err;
  }
};

const fetchDataPA = async () => {
  try {
    const [totalBlmDiprosesPA, totalDiterimaPA, totalDitolakPA] =
      await Promise.all([
        query(
          "SELECT SUM(status_mitra = 'Belum Diproses') AS blmDiprosesCountPA FROM pa_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Diterima') AS diterimaCountPA FROM pa_table"
        ),
        query(
          "SELECT SUM(status_mitra = 'Ditolak') AS ditolakCountPA FROM pa_table"
        ),
      ]);

    const blmDiprosesCountPA = totalBlmDiprosesPA[0].blmDiprosesCountPA;
    const diterimaCountPA = totalDiterimaPA[0].diterimaCountPA;
    const ditolakCountPA = totalDitolakPA[0].ditolakCountPA;

    return {
      blmDiprosesCountPA,
      diterimaCountPA,
      ditolakCountPA,
    };
  } catch (err) {
    throw err;
  }
};



const fetchDashboardIkhtisar = async () => {
  try {
    const [
      totalPengusulanMitra,
      totalPenolakanMitra,
      totalDiterimaHSSEMitra,
      totalVerifikasiUser,

    ] = await Promise.all([
      query("SELECT (SELECT COUNT(*) FROM pb_table) + (SELECT COUNT(*) FROM pa_table) + (SELECT COUNT(*) FROM psb_table) + (SELECT COUNT(*) FROM hseplan_table) AS totalPengusulan"),
      query("SELECT (SELECT COUNT(*) FROM psb_table WHERE status_mitra = 'Ditolak' AND status_mitra2 = 'Ditolak') + (SELECT COUNT(*) FROM pb_table WHERE status_mitra = 'Ditolak' AND status_mitra2 = 'Ditolak') + (SELECT COUNT(*) FROM pa_table WHERE status_mitra = 'Ditolak' AND status_mitra2 = 'Ditolak') + (SELECT COUNT(*) FROM hseplan_table WHERE status_mitra = 'Ditolak') AS totalDitolakCount"),
      query("SELECT (SELECT COUNT(*) FROM psb_table WHERE status_mitra2 = 'Diterima') + (SELECT COUNT(*) FROM pb_table WHERE status_mitra2 = 'Diterima') + (SELECT COUNT(*) FROM pa_table WHERE status_mitra2 = 'Diterima') + (SELECT COUNT(*) FROM hseplan_table WHERE status_mitra = 'Diterima') AS totalDiterimaHSSECount"),
      query("SELECT (SELECT COUNT(*) FROM psb_table WHERE status_mitra = 'Diterima') + (SELECT COUNT(*) FROM pb_table WHERE status_mitra = 'Diterima') + (SELECT COUNT(*) FROM hseplan_table WHERE status_mitra = 'Diterima') + (SELECT COUNT(*) FROM pa_table WHERE status_mitra = 'Diterima') AS total_countUser"),

    ]);

    const totalPengusulan = totalPengusulanMitra[0].totalPengusulan;
    const totalDitolakCount = totalPenolakanMitra[0].totalDitolakCount;
    const totalDiterimaHSSECount = totalDiterimaHSSEMitra[0].totalDiterimaHSSECount;
    const total_countUser = totalVerifikasiUser[0].total_countUser;


    return {
      totalPengusulan,
      totalDitolakCount,
      totalDiterimaHSSECount,
      total_countUser,

    };
  } catch (err) {
    throw err;
  }
};

const fetchTotalBerkas = async() => {

//   SELECT COUNT(*) as hseplanCount FROM hseplan_table;
// SELECT COUNT(*) as psbCount FROM psb_table;
// SELECT COUNT(*) as paCount FROM pa_table;
// SELECT COUNT(*) as pbCount FROM pb_table;
  try {
    const [totalBerkasHSE, totalBerkasPSB, totalBerkasPA,totalBerkasPB] =
      await Promise.all([
        query(
          "SELECT COUNT(*) as hseplanCount FROM hseplan_table"
        ),
        query(
          "SELECT COUNT(*) as psbCount FROM psb_table"
        ),
        query(
          "SELECT COUNT(*) as paCount FROM pa_table"
        ),
        query(
          "SELECT COUNT(*) as pbCount FROM pb_table"

        ),
      ]);

      const hseplanCount = totalBerkasHSE[0].hseplanCount;
      const psbCount = totalBerkasPSB[0].psbCount;
      const paCount = totalBerkasPA[0].paCount;
      const pbCount = totalBerkasPB[0].pbCount;

    return {
      hseplanCount,
      psbCount,
      paCount,
      pbCount,
    };
  } 
  catch (err) {
    throw err;
  }

}

const fetchVerifyUser = async () => {
  try {
    const [      totalVerifyUserPSB,
      totalVerifyUserPB,
      totalVerifyUserPA,
      totalVerifyUserHSEPLAN,] =
      await Promise.all([
        query("SELECT COUNT(id_psb) AS user_psb_verify FROM psb_table WHERE status_mitra = 'Diterima'"),
        query("SELECT COUNT(id_pb) AS user_pb_verify FROM pb_table WHERE status_mitra = 'Diterima'"),
        query("SELECT COUNT(id_hse) AS user_hseplan_verify FROM hseplan_table WHERE status_mitra = 'Diterima'"),
        query("SELECT SUM(status_mitra = 'Diterima') AS user_pa_verify FROM pa_table"),
      ]);


      const user_psb_verify = totalVerifyUserPSB[0].user_psb_verify;
      const user_pb_verify = totalVerifyUserPB[0].user_pb_verify;
      const user_hseplan_verify = totalVerifyUserHSEPLAN[0].user_hseplan_verify;
      const user_pa_verify = totalVerifyUserPA[0].user_pa_verify;


    return {
      user_psb_verify,
      user_pb_verify,
      user_hseplan_verify,
      user_pa_verify,

    };
  } catch (err) {
    throw err;
  }
};

const fetchVerifyHSSE = async () => {
  try {
    const [      totalVerifyHSSEPSB,
      totalVerifyHSSEPB,
      totalVerifyHSSEPA,
      totalVerifyHSSEHSEPLAN,] =
      await Promise.all([
        query("SELECT COUNT(*) AS hssePAVerify FROM pa_table WHERE status_mitra2 = 'Diterima'"),
        query("SELECT COUNT(*) AS hssePSBVerify FROM psb_table WHERE status_mitra2 = 'Diterima'"),
        query("SELECT COUNT(*) AS hssePBVerify FROM pb_table WHERE status_mitra2 = 'Diterima'"),

      ]);


      const hssePAVerify = totalVerifyHSSEPA[0].hssePAVerify;
      const hssePSBVerify = totalVerifyHSSEPSB[0].userPSBVerify;
      const hssePBVerify = totalVerifyHSSEPB[0].userPBVerify;
      // const user_pa_verify = totalVerifyUserPA[0].user_pa_verify;


    return {
      hssePAVerify,
      hssePSBVerify,
      hssePBVerify,


    };
  } catch (err) {
    throw err;
  }
};





exports.berandaWeb = (req, res) => {
  const berandaTitle = "Beranda | SIBER Pertamina Limau Field"; // Gantilah dengan data atau variabel yang sesuai

  res.render("index", {
    berandaTitle,
  });
};

exports.berandaAdmin = async (req, res) => {

  const DashboardAdminTitle = "Dashboard Pertamina";

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }

  
  const { blmDiprosesCountHSE, diterimaCountHSE, ditolakCountHSE } =
  await fetchDataHSE();

  const { blmDiprosesCountPSB, diterimaCountPSB, ditolakCountPSB } =
  await fetchDataPSB();

  const { blmDiprosesCountPB, diterimaCountPB, ditolakCountPB } =
  await fetchDataPB();
  
  const { blmDiprosesCountPA, diterimaCountPA, ditolakCountPA } =
  await fetchDataPA();

  const {
    hseplanCount,
    psbCount,
    paCount,
    pbCount,
  } = await fetchTotalBerkas();

  const {
    totalPengusulan,
    totalDitolakCount,
    totalDiterimaHSSECount,
    total_countUser,

    
  } = await fetchDashboardIkhtisar();

  const {user_psb_verify, user_pb_verify, user_hseplan_verify, user_pa_verify,} = await fetchVerifyUser();


  const {      hssePAVerify,
    hssePSBVerify,
    hssePBVerify,} = await fetchVerifyHSSE();


  
  const { id_verifikator } = req.session.userData;
  
  const queryUserData = "SELECT * FROM pertamina_divisi WHERE id_verifikator = ?";

  db.query(queryUserData, [id_verifikator], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Internal Server Error');
      }

      if (results.length > 0) {
          return res.render("dashboardAdmin", {
              DashboardAdminTitle,
              userData: results[0],


              //Khusus 
              totalPengusulan,
              totalDitolakCount,
              totalDiterimaHSSECount,
              total_countUser,

              user_psb_verify,
              user_pb_verify,
              user_hseplan_verify,
              user_pa_verify,

              //end khusus....

              //ditolak ikhtisar data


              //end ditolak ikhitsar data
          

              //HSE
              blmDiprosesCountHSE,
              diterimaCountHSE,
              ditolakCountHSE,
              hseplanCount,

              hssePAVerify,
              hssePSBVerify,
              hssePBVerify,
          
              //PSB
          
              blmDiprosesCountPSB,
              diterimaCountPSB,
              ditolakCountPSB,
              psbCount,
          
              //PB
              blmDiprosesCountPB,
              diterimaCountPB,
              ditolakCountPB,
              pbCount,
          
              //PA
              blmDiprosesCountPA,
              diterimaCountPA,
              ditolakCountPA,
              paCount,
            });
      } else {
          return res.status(404).send('User not found');
      }
  });
};

//get view login Pertamina
exports.loginPertamina = (req, res) => {
  res.render("loginPertamina", {
    notifyStatusLogin : false
  });
};

//get view create pin page.
exports.createPINPage = (req, res) => {
  res.render("createPIN");  
};


exports.CheckingPIN = (req, res) => {
    const { password } = req.body;
    let notifyStatusLogin = false; // Set default value to false

    // Pemetaan antara password dan username
    const passwordUsernameMap = {

        '8642097531': 'ICT',
        '3210987654': 'HSSE',
        '2468013579' : 'WIWS',
        '1098765432' : 'RAM',
        '5678901234' : 'PE',
        '8765432109' : 'PRODUKSI',
        '5432109876' : 'SCM'
        
        // Tambahkan lebih banyak pasangan password dan username jika diperlukan
    };

    // Mendapatkan username berdasarkan password
    const username = passwordUsernameMap[password];

    if (!username) {
        // Password tidak ditemukan dalam pemetaan, sehingga tidak ada username yang cocok
        // return res.status(401).json({ message: 'Invalid password' });
        notifyStatusLogin = true;
        res.render('loginPertamina',{
          notifyStatusLogin
        })
        return;
    }

    // Melakukan query ke database dengan username yang ditemukan
    const sql = "SELECT * FROM pertamina_divisi WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            // User not found
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const hashedPasswordFromDatabase = results[0].password;

        bcrypt.compare(password, hashedPasswordFromDatabase, (err, passwordMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (passwordMatch) {
                // Passwords match, user is authenticated

                // Store user information in the session
                req.session.userData = {
                    id_verifikator: results[0].id_verifikator,
                    username: results[0].username,
                    // Add more user information as needed
                };
            

                // Redirect to the dashboard or any other route
                res.redirect('/dashboard-pertamina');
            } else {
                // Passwords do not match, authentication failed
                res.status(401).json({ message: 'Invalid username or password' });
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
    password: hashedPassword,
  };

  const insertDivisiQ = "INSERT INTO pertamina_divisi SET ?";

  db.query(insertDivisiQ, fieldsDivisi, (err, results) => {
    if (err) {
      console.error("Registration error:", err);
      return res.send("Registration failed");
    }

    res.send(
      `${hashedPassword} <br> Buat PIN success. <br><a href="/TEBNiTYQrFFULHqFQluEuw==">Kembali</a>`
    );

  });
};



exports.logOutAccount = (req,res)=>{
    // Hapus data pengguna dari sesi
    
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login-pertamina');
      }
    });
  }