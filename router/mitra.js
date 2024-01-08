const express = require('express');
const router = express.Router();
const multer = require("multer")


const mitraController = require('../controllers/mitraController');
const {isLoggedIn} = require('../auth/protect');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get('/form-pengusulan-data-mitra', mitraController.formMitra);
// router.get('',(req,res)=>{
    
// });


router.post('/post-data-hse',upload.array('files', 8), mitraController.postFormHSEPlan);
router.post('/post-data-psb', upload.array('files', 8), mitraController.postPSBForm);
router.post('/post-data-pb', upload.array('files', 8), mitraController.postPBForm);
router.post('/post-data-pa',upload.array('files', 8), mitraController.postPAForm);


//read data table
router.get('/data/hse-data', mitraController.readHSEData);
router.get('/data/psb-data', mitraController.readPSBData);
router.get('/data/pb-data',mitraController.readPBData);
router.get('/data/pa-data', mitraController.readPAData);




router.get('/data/detail-hse/:id_hse',  mitraController.detailHSEData);
router.get('/data/detail-psb/:id_psb',  mitraController.detailPSBData);
router.get('/data/detail-pb/:id_pb',  mitraController.detailPBData);
router.get('/data/detail-pa/:id_pa',  mitraController.detailPAData);



//update router and function.
router.get('/data/update-hse/:id_hse', mitraController.updateHSEdata);
router.get('/data/update-psb/:id_psb', mitraController.updatePSBdata);
router.get('/data/update-pa/:id_pa', mitraController.updatePAdata);
router.get('/data/update-pb/:id_pb', mitraController.updatePBdata);



//POST update router 
/* note : DONE  POST UPDATE! */
router.post('/data/post-update-hse',mitraController.postUpdateHSEPdata);
router.post('/data/post-update-psb', mitraController.postUpdatePSBdata);
router.post('/data/post-update-pa',mitraController.postUpdatePAdata);
router.post('/data/post-update-pb', mitraController.postUpdatePBdata);

module.exports = router;


