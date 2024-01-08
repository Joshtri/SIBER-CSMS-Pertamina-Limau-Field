const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const multer = require("multer")
const db = require('../utils/database');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


// const readNamaFungsi = (req,res)=>{
//   const sqlRead = "SELECT pertamina_divisi.id_verifikator, pertamina_divisi.username, pertamina_divisi.password, divisi_pertamina.nama_divisi FROM pertamina_divisi JOIN divisi_pertamina ON pertamina_divisi.divisi = divisi_pertamina.id_divisi";

//   db.query(sqlRead, (err,readResults)=>{

//     if(err){
//       throw err; 
//     }

//     else if(!err){
//       res.render('formMitra',{
//         fungsi_divisi : readResults
//       });
//       // console.log(readResults);
//     }
//   });
// }

//get view upload data mitra
exports.formMitra = (req, res) => {
  const sqlRead = "SELECT * FROM fungsi_pertamina";

  db.query(sqlRead, (err, readResults) => {
    if (err) {
      throw err;
    } else if (!err) {
      // Filter out the data with id 5
      // const filteredFungsiPertamina = readResults.filter(
      //   (fungsi) => fungsi.id_fungsi !== 5
      // );

      res.render('formMitra', {
        fungsi_pertamina: readResults,
        notifSuksesHSEUpload: false,
        notifSuksesPSBUpload: false,
        notifSuksesPBUpload: false,
        notifSuksesPAUpload: false,
      });
    }
  });
};




//post data mitra. 
exports.postFormHSEPlan = (req,res)=>{

  // req.files berisi array informasi file yang diupload
  // req.body berisi data lain yang dikirimkan dalam formulir

  // Ekstrak informasi file
  // const fileArray = req.files;
  // const filePaths = fileArray.map(file => file.path);
    
  //*field mitra.
  const mitraHSEFields = {
    risk_assessment_id : req.body.risk_assessment_id,
      risk_level : req.body.risk_level,
      nama_pekerjaan : req.body.nama_pekerjaan,
      nama_mitra : req.body.nama_mitra, 
      tanggal_audit : req.body.tanggal_audit,
      lokasi_kerja : req.body.lokasi_kerja,
      no_hp : req.body.no_hp,
      alamat_email : req.body.alamat_email,
      // file_paths : filePaths.join(';')

      //file uploads.
      file1: req.files[0].filename,
      file2: req.files[1].filename,
      file3: req.files[2].filename,
      file4: req.files[3].filename,
      file5: req.files[4].filename,
      file6: req.files[5].filename,
      file7: req.files[6].filename,
      file8: req.files[7].filename,

  };

  const sql = 'INSERT INTO hseplan_table SET ?'
  db.query(sql,mitraHSEFields,(err,results)=>{
    if(err){
      throw err;
    }
    else if(!err){
      //* next action.
      // res.send("Berhasil :)");
      res.render('formMitra',{
        fungsi_pertamina: [],
        notifSuksesHSEUpload : true,
        notifSuksesPSBUpload : false,
        notifSuksesPBUpload : false,
        notifSuksesPAUpload : false,
      });
      
    }
  });
};


exports.postPSBForm = (req, res) => {
  // *field mitra.
  const mitraPSBFields = {
      risk_assessment_id: req.body.risk_assessment_id,
      risk_level: req.body.risk_level,
      nomor_kontrak: req.body.nomor_kontrak,
      nama_pekerjaan: req.body.nama_pekerjaan,
      nama_kontraktor: req.body.nama_kontraktor,
      tanggal_penilaian: req.body.tanggal_penilaian,
      // tempat_penilaian : req.body.tempat_penilaian,
      fungsi_dituju2: req.body.fungsi_dituju2,
      no_hp : req.body.no_hp,
      alamat_email : req.body.alamat_email,

      // file uploads.
      file1: req.files[0].filename,
      file2: req.files[1].filename,
      file3: req.files[2].filename,
      file4: req.files[3].filename,
      file5: req.files[4].filename,
      file6: req.files[5].filename,
      file7: req.files[6].filename,
      file8: req.files[7].filename,
  };

  const insertSQL = 'INSERT INTO psb_table SET ?';
  db.query(insertSQL, mitraPSBFields, (err, results) => {
      if (err) {
          throw err;
      } else if (!err) {
          // Fetch fungsi_pertamina separately
          const selectSQL = 'SELECT * FROM fungsi_pertamina';
          db.query(selectSQL, (err, fungsi_pertamina) => {
              if (err) {
                  throw err;
              }
              res.render('formMitra', {
                  fungsi_pertamina: fungsi_pertamina,
                  notifSuksesPSBUpload: true,
                  notifSuksesHSEUpload: false,
                  notifSuksesPBUpload: false,
                  notifSuksesPAUpload: false,
              });
          });
      }
  });
};



exports.postPBForm = (req,res)=>{
        
    //*field mitra.
    const mitraPBFields = {
      risk_assessment_id : req.body.risk_assessment_id ,
      risk_level : req.body.risk_level,
      kategori_pb : req.body.kategori_pb ,
      nomor_kontrak : req.body.nomor_kontrak ,
      nama_kontraktor : req.body.nama_kontraktor ,
      tanggal_penilaian : req.body.tanggal_penilaian,
      fungsi_dituju2: req.body.fungsi_dituju2,
      //ada 3 yang baru. 
      no_hp : req.body.no_hp,
      alamat_email : req.body.alamat_email,
      temuan: req.body.temuan,

      //file uploads.
      file1: req.files[0].filename,
      file2: req.files[1].filename,
      file3: req.files[2].filename,
      file4: req.files[3].filename,
      file5: req.files[4].filename,
      file6: req.files[5].filename,
      file7: req.files[6].filename,
      file8: req.files[7].filename,

    };

    const sql = 'INSERT INTO pb_table SET ?'
    db.query(sql,mitraPBFields,(err,results)=>{
      if(err){
        throw err;
      }
      else if(!err){
          // Fetch fungsi_pertamina separately
          const selectSQL = 'SELECT * FROM fungsi_pertamina';
          db.query(selectSQL, (err, fungsi_pertamina) => {
              if (err) {
                  throw err;
              }
              res.render('formMitra', {
                  fungsi_pertamina: fungsi_pertamina,
                  notifSuksesPSBUpload: false,
                  notifSuksesHSEUpload: false,
                  notifSuksesPBUpload: true,
                  notifSuksesPAUpload: false,
              });
          });
      }
    });
}

exports.postPAForm = (req,res)=>{
        
    //*field mitra.
    const mitraPAFields = {
      risk_assessment_id : req.body.risk_assessment_id,
      risk_level : req.body.risk_level,
      nomor_kontrak : req.body.nomor_kontrak,
      nama_pekerjaan : req.body.nama_pekerjaan,
      tanggal_penilaian : req.body.tanggal_penilaian,
      fungsi_dituju2: req.body.fungsi_dituju2,
      no_hp : req.body.no_hp,
      alamat_email : req.body.alamat_email,
      temuan: req.body.temuan,

      //file uploads.
      file1: req.files[0].filename,
      file2: req.files[1].filename,
      file3: req.files[2].filename,
      file4: req.files[3].filename,
      file5: req.files[4].filename,
      file6: req.files[5].filename,
      file7: req.files[6].filename,
      file8: req.files[7].filename,
    };

    const sql = 'INSERT INTO pa_table SET ?'
    db.query(sql,mitraPAFields,(err,results)=>{
      if(err){
        throw err;
      }
      else if(!err){
          // Fetch fungsi_pertamina separately
          const selectSQL = 'SELECT * FROM fungsi_pertamina';
          db.query(selectSQL, (err, fungsi_pertamina) => {
              if (err) {
                  throw err;
              }
              res.render('formMitra', {
                  fungsi_pertamina: fungsi_pertamina,
                  notifSuksesPSBUpload: false,
                  notifSuksesHSEUpload: false,
                  notifSuksesPBUpload: false,
                  notifSuksesPAUpload: true,
              });
          });
      }
    });
}



//view hse Table 
exports.readHSEData = (req, res)=>{
  const userRole = req.session.userData ? req.session.userData.username : null;
  
  
  // Hanya menampilkan data jika peran pengguna adalah 'HSSE'
  if (userRole === 'HSSE') {
    const sqlRead = "SELECT * FROM hseplan_table";
    db.query(sqlRead, (err,readResults)=>{

      if(err){
        throw err; 
      }

      else if(!err){
        res.render('hsePlanDataTable',{
          dataHse : readResults
        });
        // console.log(readResults);
      }
    });
  }
  
  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
}


// view psb Table
exports.readPSBData = (req, res) => {
  // Periksa peran pengguna yang masuk
  const userRole = req.session.userData ? req.session.userData.username : null;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  // Hanya menampilkan data jika peran pengguna adalah 'HSSE'
  if (userRole === 'HSSE') {
      const sqlHSSERead = "SELECT * FROM psb_table";

      db.query(sqlHSSERead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  }

  // Hanya menampilkan data jika peran pengguna adalah 'ICT'
  else if (userRole === 'ICT') {
      const sqlHSSERead = "SELECT * FROM psb_table WHERE fungsi_dituju2 = 1";

      db.query(sqlHSSERead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  }

  // Hanya menampilkan data jika peran pengguna adalah 'WIWS'
  else if (userRole === 'WIWS') {
      const sqlWIWSRead = "SELECT * FROM psb_table WHERE fungsi_dituju2 = 2";

      db.query(sqlWIWSRead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  } 

  // Hanya menampilkan data jika peran pengguna adalah 'WIWS'
  else if (userRole === 'PE') {
      const sqlPERead = "SELECT * FROM psb_table WHERE fungsi_dituju2 = 3";

      db.query(sqlPERead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  } 

  // Hanya menampilkan data jika peran pengguna adalah 'WIWS'
  else if (userRole === 'RAM') {
      const sqlRAMRead = "SELECT * FROM psb_table WHERE fungsi_dituju2 = 4";

      db.query(sqlRAMRead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  }

  // Hanya menampilkan data jika peran pengguna adalah 'WIWS'
  else if (userRole === 'PRODUKSI') {
      const sqlProduksiRead = "SELECT * FROM psb_table WHERE fungsi_dituju2 = 6";

      db.query(sqlProduksiRead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  }

  // Hanya menampilkan data jika peran pengguna adalah 'WIWS'
  else if (userRole === 'SCM') {
      const sqlSCMRead = "SELECT * FROM psb_table WHERE fungsi_dituju2 = 7";

      db.query(sqlSCMRead, (err, readResults) => {
          if (err) {
              throw err;
          } else if (!err) {
              res.render('psbDataTable', {
                  dataPSB: readResults
              });

          }
      });
  } 


  
  else {
      // Tampilkan pesan atau lakukan sesuatu jika pengguna tidak memiliki peran 'ICT'
      res.status(403).send('Access Forbidden'); // Atau ganti dengan tindakan lain yang sesuai
  }
};



//view pb Table 
exports.readPBData = (req, res)=>{

  // Periksa peran pengguna yang masuk
  const userRole = req.session.userData ? req.session.userData.username : null;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }

  if(userRole === 'HSSE'){
    const sqlHSSERead = "SELECT * FROM pb_table";

    db.query(sqlHSSERead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  }

  else if(userRole === 'ICT'){
    const sqlHSSERead = "SELECT * FROM pb_table WHERE fungsi_dituju2 = 1";

    db.query(sqlHSSERead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  }

  else if(userRole === 'WIWS'){
    const sqlWIWSRead = "SELECT * FROM pb_table WHERE fungsi_dituju2 = 2";

    db.query(sqlWIWSRead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  } 

  else if(userRole === 'PE'){
    const sqlPERead = "SELECT * FROM pb_table WHERE fungsi_dituju2 = 3";

    db.query(sqlPERead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  }

  else if(userRole === 'RAM'){
    const sqlRAMRead = "SELECT * FROM pb_table WHERE fungsi_dituju2 = 4";

    db.query(sqlRAMRead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  }

  else if(userRole === 'PRODUKSI'){
    const sqlPRODUKSIRead = "SELECT * FROM pb_table WHERE fungsi_dituju2 = 6";

    db.query(sqlPRODUKSIRead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  }


  else if(userRole === 'SCM'){
    const sqlSCMRead = "SELECT * FROM pb_table WHERE fungsi_dituju2 = 7";

    db.query(sqlSCMRead, (err,readResults)=>{
  
      if(err){
        throw err; 
      }
  
      else if(!err){
        res.render('pbDataTable',{
          dataPB : readResults
        });

      }
    });
  }
}

//view pa Table 
exports.readPAData = (req, res)=>{
  // Periksa peran pengguna yang masuk
  const userRole = req.session.userData ? req.session.userData.username : null;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  

  if(userRole === 'HSSE') {
    
    const sqlHSSERead = "SELECT * FROM pa_table";
      db.query(sqlHSSERead, (err,readResults)=>{

    if(err){
      throw err; 
    }

    else if(!err){
      res.render('paDataTable',{
        dataPA : readResults
      });

    }
  });
  }
  else if(userRole === 'ICT') {
  
  const sqlICTRead = "SELECT * FROM pa_table WHERE fungsi_dituju2 = 1";
    db.query(sqlICTRead, (err,readResults)=>{

  if(err){
    throw err; 
  }

  else if(!err){
    res.render('paDataTable',{
      dataPA : readResults
    });

  }
});
  }
  else if(userRole === 'WIWS') {

const sqlWIWSRead = "SELECT * FROM pa_table WHERE fungsi_dituju2 = 2";
  db.query(sqlWIWSRead, (err,readResults)=>{

if(err){
  throw err; 
}

else if(!err){
  res.render('paDataTable',{
    dataPA : readResults
  });

}
});
  }
  else if(userRole === 'PE') {
  
  const sqlPERead = "SELECT * FROM pa_table WHERE fungsi_dituju2 = 3";
    db.query(sqlPERead, (err,readResults)=>{

  if(err){
    throw err; 
  }

  else if(!err){
    res.render('paDataTable',{
      dataPA : readResults
    });

  }
});

        
  }
  else if(userRole === 'RAM') {
  
  const sqlRAMRead = "SELECT * FROM pa_table WHERE fungsi_dituju2 = 4";
    db.query(sqlRAMRead, (err,readResults)=>{

  if(err){
    throw err; 
  }

  else if(!err){
    res.render('paDataTable',{
      dataPA : readResults
    });

  }
});

  }

  else if(userRole === 'PRODUKSI') {
  
  const sqlPRODUKSIRead = "SELECT * FROM pa_table WHERE fungsi_dituju2 = 6";
    db.query(sqlPRODUKSIRead, (err,readResults)=>{

  if(err){
    throw err; 
  }

  else if(!err){
    res.render('paDataTable',{
      dataPA : readResults
    });

  }
});

  }


  else if(userRole === 'SCM') {
  const sqlSCMRead = "SELECT * FROM pa_table WHERE fungsi_dituju2 = 7";
    db.query(sqlSCMRead, (err,readResults)=>{

  if(err){
    throw err; 
  }

  else if(!err){
    res.render('paDataTable',{
      dataPA : readResults
    });

  }
});
  }
}


// GET VIEW DETAIL HSEPLAN
exports.detailHSEData = (req, res) => {
  const id_hse = req.params.id_hse;
  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM hseplan_table WHERE id_hse = ?";


  
  db.query(sqlRead, [id_hse], (err, results) => {
    if (err) {
      throw err;
    } else if (results.length > 0) { // Pastikan ada hasil sebelum mencoba destrukturisasi
      // Assuming that 'risk_assessment_id' and other columns are in your hseplan_table
      const {
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nama_mitra,
        tanggal_audit,
        lokasi_kerja,
        nilai_total,
        keterangan_verifikasi,
        no_hp,
        alamat_email,
        status_mitra,
        // ... other properties
      } = results[0];

      // Render the detailhse view with the details
      res.render('detailhse', {
        id_hse,
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nama_mitra,
        tanggal_audit,
        lokasi_kerja,
        nilai_total,
        keterangan_verifikasi,
        no_hp,
        alamat_email,
        status_mitra,
        files: results[0], 
        // results
      });
    } else {
      // Handle case when no results are found (redirect or show an error message)
      res.status(404).send('Data not found');
    }
  });
}


// GET VIEW DETAIL PSB
exports.detailPSBData = (req, res) => {
  const id_psb = req.params.id_psb;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM psb_table WHERE id_psb = ?";
  
  db.query(sqlRead, [id_psb], (err, results) => {
    if (err) {
      throw err;
    } else if(results.length > 0) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nomor_kontrak,
         nama_pekerjaan,
         nama_kontraktor,
         nilai_total,
         keterangan_verifikasi,
         no_hp,
         alamat_email,
         tanggal_penilaian,
         tempat_penilaian,
         status_mitra,
         status_mitra2,
         fungsi_dituju2,

         //file uploads !!!!! --- mostly important
         
         
        
        } = results[0]; // Assuming there's only one result



      // Render the detailhse view with the details
      res.render('detailpsb', {
        id_psb,
        risk_assessment_id,
        risk_level,
        nomor_kontrak,
        nama_pekerjaan,
        nama_kontraktor,
        tanggal_penilaian,
        tempat_penilaian,
        nilai_total,
        keterangan_verifikasi,
        no_hp,
        alamat_email,
        status_mitra,
        status_mitra2,
        fungsi_dituju2,
        files: results[0], 
        results
      });
    }
  });
}


// GET VIEW DETAIL PB
exports.detailPBData = (req, res) => {
  const id_pb = req.params.id_pb;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM pb_table WHERE id_pb = ?";
  
  db.query(sqlRead, [id_pb], (err, results) => {
    if (err) {
      throw err;
    } else if(results.length > 0) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nomor_kontrak,
         nama_kontraktor,
         tanggal_penilaian,
         nilai_total,
         keterangan_verifikasi,
         no_hp,
         alamat_email,
         status_mitra,
         status_mitra2,
         fungsi_dituju2,

         //file uploads !!!!! --- mostly important
         
         
        
        } = results[0]; // Assuming there's only one result



      // Render the detailhse view with the details
      res.render('detailpb', {
        id_pb,
        risk_assessment_id,
        risk_level,
        nomor_kontrak,
        nama_kontraktor,
        tanggal_penilaian,
        status_mitra,
        status_mitra2,
        fungsi_dituju2,
        nilai_total,
        keterangan_verifikasi,
        no_hp,
        alamat_email,
        files: results[0], 
        results
      });
      // console.log(results);
    }
  });
}


// GET VIEW DETAIL PA
exports.detailPAData = (req, res) => {
  const id_pa = req.params.id_pa;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM pa_table WHERE id_pa = ?";
  
  db.query(sqlRead, [id_pa], (err, results) => {
    if (err) {
      throw err;
    } else if(results.length > 0) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nomor_kontrak, 
         nama_pekerjaan,
         tanggal_penilaian,
         nilai_total,
         keterangan_verifikasi,
         no_hp,
         temuan,
         alamat_email,
         status_mitra,
         status_mitra2,
         fungsi_dituju2,

         //file uploads !!!!! --- mostly important
         
                  
        } = results[0]; // Assuming there's only one result



      // Render the detailhse view with the details
      res.render('detailpa', {
        id_pa,
        risk_assessment_id,
        risk_level,
        nomor_kontrak,
        nama_pekerjaan,
        tanggal_penilaian,
        nilai_total,
        keterangan_verifikasi,
        no_hp,
        temuan,
        alamat_email,
        status_mitra,
        status_mitra2,
        fungsi_dituju2,
        files: results[0], 
        results
      });
      // console.log(results);m
    }
  });
}


//GET DATA hse TO UPDATE!!
exports.updateHSEdata = (req,res)=>{
  
  const id_hse = req.params.id_hse;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM hseplan_table WHERE id_hse = ?";


  db.query(sqlRead,[id_hse],(err,results)=>{
    if(err){
      throw err;
    }

    else if(!err){
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
        risk_assessment_id, 
        risk_level, 
        nama_pekerjaan,
        nama_mitra,
        tanggal_audit,
        lokasi_kerja,
        nilai_total,
        keterangan_verifikasi,
        status_mitra,
                       
      } = results[0]; // Assuming there's only one result

     // Render the detailhse view with the details
      res.render('update_hse', {
        id_hse,
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nama_mitra,
        tanggal_audit,
        lokasi_kerja,
        nilai_total,
        keterangan_verifikasi,
        status_mitra,
        files: results[0], 
        results,
        notifSuksesHSEUpdate : false
      });

    }
  });
  
 
}


// //GET DATA psb TO UPDATE!!
// exports.updatePSBdata = (req,res)=>{
  
//   const id_psb = req.params.id_psb;


//   if (!req.session.userData || !req.session.userData.id_verifikator) {
//     // Jika pengguna belum login, redirect ke halaman login
//     return res.redirect('/login-pertamina');
//   }

  
  
//   const sqlRead = "SELECT * FROM psb_table WHERE id_psb = ?";


//   db.query(sqlRead,[id_psb],(err,results)=>{
//     if(err){
//       throw err;
//     }

//     else if(!err){
//       // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
//       const {
//         risk_assessment_id, 
//         risk_level, 
//         nama_pekerjaan,
//         nomor_kontrak,
//         nama_kontraktor,
//         tanggal_penilaian,
//         nilai_total,
//         keterangan_verifikasi,
//         status_mitra,
//         status_mitra2,
//         fungsi_dituju1,
//         fungsi_dituju2
                       
//       } = results[0]; // Assuming there's only one result

//      // Render the detailhse view with the details
//       res.render('update_psb', {
//         id_psb,
//         risk_assessment_id,
//         risk_level,
//         nama_pekerjaan,
//         nomor_kontrak,
//         nama_kontraktor,
//         tanggal_penilaian,
//         status_mitra,
//         status_mitra2,
//         fungsi_dituju1, 
//         fungsi_dituju2,
//         nilai_total,
//         keterangan_verifikasi,
//         files: results[0], 
//         results,
//         notifSuksesPSBUpdate : false
//       });

//     }
//   });
  
// }

// ...

//GET DATA psb TO UPDATE!!
exports.updatePSBdata = (req, res) => {
  const id_psb = req.params.id_psb;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }

  const sqlRead = "SELECT * FROM psb_table WHERE id_psb = ?";

  db.query(sqlRead, [id_psb], (err, results) => {
    if (err) {
      throw err;
    } else if (!err) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nomor_kontrak,
        nama_kontraktor,
        tanggal_penilaian,
        nilai_total,
        keterangan_verifikasi,
        status_mitra,
        status_mitra2,
        fungsi_dituju1,
        fungsi_dituju2,
      } = results[0]; // Assuming there's only one result

      // Render the detailhse view with the details
      res.render('update_psb', {
        id_psb,
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nomor_kontrak,
        nama_kontraktor,
        tanggal_penilaian,
        status_mitra,
        status_mitra2,
        fungsi_dituju1,
        fungsi_dituju2,
        nilai_total,
        keterangan_verifikasi,
        files: results[0],
        results,
        notifSuksesPSBUpdate: false,
        userData: req.session.userData, // Menyertakan data session.userData ke dalam objek yang dikirim ke view
      });
    }
  });
};



//GET DATA pa TO UPDATE!!
exports.updatePAdata = (req,res)=>{
  
  const id_pa = req.params.id_pa;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM pa_table WHERE id_pa = ?";


  db.query(sqlRead,[id_pa],(err,results)=>{
    if(err){
      throw err;
    }

    else if(!err){
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
        risk_assessment_id, 
        risk_level,
        nama_pekerjaan,
        nomor_kontrak,
        tanggal_penilaian,
        status_mitra,
        status_mitra2,
        fungsi_dituju1,
        fungsi_dituju2,
        temuan,
        nilai_total,
        keterangan_verifikasi,
                       
      } = results[0]; // Assuming there's only one result

     // Render the detailhse view with the details
      res.render('update_pa', {
        id_pa,
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nomor_kontrak,
        tanggal_penilaian,
        status_mitra,
        status_mitra2,
        fungsi_dituju1,
        fungsi_dituju2,
        temuan,
        nilai_total,
        keterangan_verifikasi,
        files: results[0], 
        results,
        notifSuksesPAUpdate : false,
        userData: req.session.userData, // Menyertakan data session.userData ke dalam objek yang dikirim ke view
      });

    }
  });
  
 
}



//GET DATA pa TO UPDATE!!
exports.updatePBdata = (req,res)=>{
  
  const id_pb = req.params.id_pb;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  
  const sqlRead = "SELECT * FROM pb_table WHERE id_pb = ?";


  db.query(sqlRead,[id_pb],(err,results)=>{
    if(err){
      throw err;
    }

    else if(!err){
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
        risk_assessment_id, 
        risk_level, 
        kategori_pb,
        nomor_kontrak,
        nama_kontraktor,
        tanggal_penilaian,
        status_mitra,
        status_mitra2,
        fungsi_dituju1,
        fungsi_dituju2,
        temuan,
        nilai_total,
        keterangan_verifikasi,
                       
      } = results[0]; // Assuming there's only one result

     // Render the detailhse view with the details
      res.render('update_pb', {
        id_pb,
        risk_assessment_id,
        risk_level,
        kategori_pb,
        nomor_kontrak,
        nama_kontraktor,
        tanggal_penilaian,
        status_mitra,
        status_mitra2,
        fungsi_dituju1,
        fungsi_dituju2,
        temuan,
        nilai_total,
        keterangan_verifikasi,
        files: results[0], 
        results,
        notifSuksesPBUpdate : false,
        userData: req.session.userData, // Menyertakan data session.userData ke dalam objek yang dikirim ke view
      });

    }
  });
  
 
}



// POST DATA psb TO UPDATE!!
exports.postUpdateHSEPdata = (req, res) => {
  const { id_hse,status_mitra, nilai_total, keterangan_verifikasi } = req.body;
  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  

  const sqlUpdate = 'UPDATE hseplan_table SET status_mitra = ?, nilai_total = ?, keterangan_verifikasi = ? WHERE id_hse = ?';
  const values = [status_mitra, nilai_total, keterangan_verifikasi, id_hse];

  db.query(sqlUpdate, values, (err, results) => {
    if (err) {
      console.error('Terjadi kesalahan saat memperbarui data:', err);
      res.status(500).send('Kesalahan Server Internal');
    } else {
      // Kirim skrip JavaScript sebagai respons
      const script = `
        <script>
          alert('Data berhasil diperbarui!');
          window.location.href = '/data/update-hse/${id_hse}'; // Ganti dengan URL halaman Anda
        </script>`;
      res.send(script);


    }
  });
};


//POST DATA psb TO UPDATE!!
// exports.postUpdatePSBdata = (req,res)=>{
//   const { id_psb,status_mitra, status_mitra2, nilai_total, keterangan_verifikasi } = req.body;

//   if (!req.session.userData || !req.session.userData.id_verifikator) {
//     // Jika pengguna belum login, redirect ke halaman login
//     return res.redirect('/login-pertamina');
//   }

//   const sqlUpdate = 'UPDATE psb_table SET status_mitra = ?, status_mitra2 = ?, nilai_total = ?, keterangan_verifikasi = ? WHERE id_psb = ?';
//   const values = [status_mitra , status_mitra2, nilai_total, keterangan_verifikasi, id_psb];

//   db.query(sqlUpdate, values, (err, results) => {
//     if (err) {
//       console.error('Terjadi kesalahan saat memperbarui data:', err);
//       res.status(500).send('Kesalahan Server Internal');
//     } else {
//       // Kirim skrip JavaScript sebagai respons
//       const script = `
//         <script>
//           alert('Data berhasil diperbarui!');
//           window.location.href = '/data/update-psb/${id_psb}'; // Ganti dengan URL halaman Anda
//         </script>`;
//       res.send(script);


//       // console.log('Update Berhasil:', results); // Tambahkan ini untuk melihat hasil query
//       // res.send('Update Berhasil :)');
//       // console.log('ID HSE yang Diterima:', id_psb);
//       // console.log('Data yang Diterima:', req.body);

//       // console.log('Query SQL:', sqlUpdate, ' dengan Nilai:', values);

//     }
//   });
// }


// POST DATA psb TO UPDATE!!
exports.postUpdatePSBdata = (req, res) => {

  const { id_psb, nilai_total, keterangan_verifikasi } = req.body;
  const { userData } = req.session;

  if (!userData || !userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }

  const sqlUpdate = 'UPDATE psb_table SET ? WHERE id_psb = ?';
  let updateFields = { nilai_total, keterangan_verifikasi };

  if (userData.username === 'HSSE') {
    // Jika pengguna adalah HSSE, maka hanya izinkan update status_mitra2
    const { status_mitra2 } = req.body;
    updateFields = { status_mitra2, ...updateFields };
  } else {
    // Jika bukan HSSE, izinkan update status_mitra
    const { status_mitra } = req.body;
    updateFields = { status_mitra, ...updateFields };
  }

  const values = [updateFields, id_psb];

  db.query(sqlUpdate, values, (err, results) => {
    if (err) {
      console.error('Terjadi kesalahan saat memperbarui data:', err);
      res.status(500).send('Kesalahan Server Internal');
    } else {
      // Kirim skrip JavaScript sebagai respons
      const script = `
        <script>
          alert('Data berhasil diperbarui!');
          window.location.href = '/data/update-psb/${id_psb}'; // Ganti dengan URL halaman Anda
        </script>`;
      res.send(script);

      // Tambahkan ini untuk melihat hasil query
      // console.log('Update Berhasil:', results);
    }
  });
};



//POST DATA PA TO UPDATE!!
exports.postUpdatePAdata = (req,res)=>{

  const { id_pa, nilai_total, keterangan_verifikasi } = req.body;
  const {userData} = req.session;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }


  const sqlUpdate = 'UPDATE pa_table SET ? WHERE id_pa = ?';
  let updateFields = {nilai_total, keterangan_verifikasi};

  if(userData.username === 'HSSE'){
    const {status_mitra2} =req.body;
    updateFields = {status_mitra2, ...updateFields}
  }
  else {
    // Jika bukan HSSE, izinkan update status_mitra
    const { status_mitra } = req.body;
    updateFields = { status_mitra, ...updateFields };
  }
  
  
  // const values = [status_mitra , nilai_total, keterangan_verifikasi, id_pa];

  const values = [updateFields, id_pa];

  db.query(sqlUpdate, values, (err, results) => {
    if (err) {
      console.error('Terjadi kesalahan saat memperbarui data:', err);
      res.status(500).send('Kesalahan Server Internal');
    } else {
      // Kirim skrip JavaScript sebagai respons
      const script = `
        <script>
          alert('Data berhasil diperbarui!');
          window.location.href = '/data/update-pa/${id_pa}'; 
        </script>`;
      res.send(script);

    }
  });
}





//POST DATA pb TO UPDATE!!
exports.postUpdatePBdata = (req,res)=>{
  const { id_pb,status_mitra, nilai_total, keterangan_verifikasi } = req.body;
  const {userData} = req.session;

  if (!req.session.userData || !req.session.userData.id_verifikator) {
    // Jika pengguna belum login, redirect ke halaman login
    return res.redirect('/login-pertamina');
  }
  const sqlUpdate = 'UPDATE pb_table SET ? WHERE id_pb = ?';
  let updateFields = {nilai_total, keterangan_verifikasi};

  if(userData.username === 'HSSE'){
    const {status_mitra2} =req.body;
    updateFields = {status_mitra2, ...updateFields}
  }
  else{
    const {status_mitra} =req.body;
    updateFields = {status_mitra, ...updateFields}
  }
  

  const values = [updateFields, id_pb];

  db.query(sqlUpdate, values, (err, results) => {
    if (err) {
      console.error('Terjadi kesalahan saat memperbarui data:', err);
      res.status(500).send('Kesalahan Server Internal');
    } else {
      // Kirim skrip JavaScript sebagai respons
      const script = `
        <script>
          alert('Data berhasil diperbarui!');
          window.location.href = '/data/update-pb/${id_pb}'; // Ganti dengan URL halaman Anda
        </script>`;
      res.send(script);
      // console.log('Update Berhasil:', results); // Tambahkan ini untuk melihat hasil query
      // res.send('Update Berhasil :)');
      // console.log('ID HSE yang Diterima:', id_pb);
      // console.log('Data yang Diterima:', req.body);

      // console.log('Query SQL:', sqlUpdate, ' dengan Nilai:', values);

    }
  });
}

