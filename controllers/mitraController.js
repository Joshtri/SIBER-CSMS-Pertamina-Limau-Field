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

//get view upload data mitra
exports.formMitra = (req,res)=>{
    res.render('formMitra',{
        
    })
}




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
      res.send("Berhasil :)");
    }
  });
};


exports.postPSBForm = (req,res)=>{
        
    //*field mitra.
    const mitraPSBFields = {
      risk_assessment_id : req.body.risk_assessment_id,
      risk_level : req.body.risk_level,
      nomor_kontrak : req.body.nomor_kontrak,
      nama_pekerjaan : req.body.nama_pekerjaan,
      nama_kontraktor : req.body.nama_kontraktor,
      tanggal_penilaian : req.body.tanggal_penilaian,
      // tempat_penilaian : req.body.tempat_penilaian,

 
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

    const sql = 'INSERT INTO psb_table SET ?'
    db.query(sql,mitraPSBFields,(err,results)=>{
      if(err){
        throw err;
      }
      else if(!err){
        //* next action.
        res.send('Berhasil :)')
      }
    });
}


exports.postPBForm = (req,res)=>{
        
    //*field mitra.
    const mitraPBFields = {
      risk_assessment_id : req.body.risk_assessment_id ,
      risk_level : req.body.risk_level,
      kategori_pb : req.body.kategori_pb ,
      nomor_kontrak : req.body.nomor_kontrak ,
      nama_kontraktor : req.body.nama_kontraktor ,
      tanggal_penilaian : req.body.tanggal_penilaian,

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
        //* next action.
        res.send('berhasil :)')
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
        //* next action.

        res.send('berhasil :)')
      }
    });
}



//view hse Table 
exports.readHSEData = (req, res)=>{
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

//view psb Table 
exports.readPSBData = (req, res)=>{
  const sqlRead = "SELECT * FROM psb_table";

  db.query(sqlRead, (err,readResults)=>{

    if(err){
      throw err; 
    }

    else if(!err){
      res.render('psbDataTable',{
        dataPSB : readResults
      });
      console.log(readResults);
    }
  });
}


//view pb Table 
exports.readPBData = (req, res)=>{
  const sqlRead = "SELECT * FROM pb_table";

  db.query(sqlRead, (err,readResults)=>{

    if(err){
      throw err; 
    }

    else if(!err){
      res.render('pbDataTable',{
        dataPB : readResults
      });
      console.log(readResults);
    }
  });
}

//view pa Table 
exports.readPAData = (req, res)=>{
  const sqlRead = "SELECT * FROM pa_table";

  db.query(sqlRead, (err,readResults)=>{

    if(err){
      throw err; 
    }

    else if(!err){
      res.render('paDataTable',{
        dataPA : readResults
      });
      console.log(readResults);
    }
  });
}


// GET VIEW DETAIL HSEPLAN
exports.detailHSEData = (req, res) => {
  const id_hse = req.params.id_hse;
  const sqlRead = "SELECT * FROM hseplan_table WHERE id_hse = ?";
  
  db.query(sqlRead, [id_hse], (err, results) => {
    if (err) {
      throw err;
    } else if(!err) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nama_pekerjaan,
         nama_mitra,
         tanggal_audit,
         lokasi_kerja,
         status_mitra,
         
         
        
        } = results[0]; // Assuming there's only one result



      // Render the detailhse view with the details
      res.render('detailhse', {
        id_hse,
        risk_assessment_id,
        risk_level,
        nama_pekerjaan,
        nama_mitra,
        tanggal_audit,
        lokasi_kerja,
        status_mitra,
        files: results[0], 
        results
      });
      console.log(results);
    }
  });
}


// GET VIEW DETAIL PSB
exports.detailPSBData = (req, res) => {
  const id_psb = req.params.id_psb;
  const sqlRead = "SELECT * FROM psb_table WHERE id_psb = ?";
  
  db.query(sqlRead, [id_psb], (err, results) => {
    if (err) {
      throw err;
    } else if(!err) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nomor_kontrak,
         nama_pekerjaan,
         nama_kontraktor,
         tanggal_penilaian,
         tempat_penilaian,
         status_mitra,

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
        status_mitra,
        files: results[0], 
        results
      });
      // console.log(results);
    }
  });
}


// GET VIEW DETAIL PB
exports.detailPBData = (req, res) => {
  const id_pb = req.params.id_pb;
  const sqlRead = "SELECT * FROM pb_table WHERE id_pb = ?";
  
  db.query(sqlRead, [id_pb], (err, results) => {
    if (err) {
      throw err;
    } else if(!err) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nomor_kontrak,
         nama_kontraktor,
         tanggal_penilaian,
         status_mitra,

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
  const sqlRead = "SELECT * FROM pa_table WHERE id_pa = ?";
  
  db.query(sqlRead, [id_pa], (err, results) => {
    if (err) {
      throw err;
    } else if(!err) {
      // Assuming that 'risk_level' and 'nama_mitra' are columns in your hseplan_table
      const {
         risk_assessment_id, 
         risk_level, 
         nomor_kontrak,
         nama_kontraktor,
         tanggal_penilaian,
         status_mitra,

         //file uploads !!!!! --- mostly important
         
                 
        } = results[0]; // Assuming there's only one result



      // Render the detailhse view with the details
      res.render('detailpa', {
        id_pa,
        risk_assessment_id,
        risk_level,
        nomor_kontrak,
        nama_kontraktor,
        tanggal_penilaian,
        status_mitra,
        files: results[0], 
        results
      });
      // console.log(results);
    }
  });
}
