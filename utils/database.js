const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"localhost", // local pc only.
    user: "root", //local pc .
    password:"",
    database: "db_siber_csms_pertamina_limau",
});

db.connect(function(err,results){

    if(err){
        console.log(`error connecting ${err.message}`);
        
    }
    else if(!err){
        // console.log(results);
        console.log('connection database work :)');
    }
});

module.exports=db;