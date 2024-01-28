const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"banbqbykaghzzrsqrdei-mysql.services.clever-cloud.com", // local pc only.
    user: "uhwc7dnlccad96jy", //local pc .
    password:"uvznVcwfcyZSJ828Fb7t",
    database: "banbqbykaghzzrsqrdei",
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