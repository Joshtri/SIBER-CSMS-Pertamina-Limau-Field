const mysql = require('mysql2');

const db = mysql.createPool ({
    host:"banbqbykaghzzrsqrdei-mysql.services.clever-cloud.com", // local pc only.
    user: "uhwc7dnlccad96jy", //local pc .
    password:"uvznVcwfcyZSJ828Fb7t",
    database: "banbqbykaghzzrsqrdei",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Listener untuk menangkap event error
db.on('error', (err) => {
    console.error(`Database error: ${err.message}`);
});

// Listener untuk menangkap event connect
db.on('connect', () => {
    console.log('Connected to the database!');
  });
  
module.exports = db.promise(); 
// module.exports=db;