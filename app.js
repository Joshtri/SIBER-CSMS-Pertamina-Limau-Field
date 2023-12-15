const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser')
const session = require ('express-session')
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


const database = require('./utils/database');
const app = express();
const PORT = 3003;


database.connect();

app.use(morgan('tiny'));

app.use(cors());

// Middleware untuk menguraikan JSON dalam body permintaan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// import router in app.js
const routerBeranda = require('./router/beranda');
const routerMitra = require('./router/mitra');

app.use("/", routerBeranda, routerMitra);

// app.use("/", routerMitra)

// Menyediakan rute statis untuk file PDF di direktori 'uploads'
app.use('/data/detail-hse/uploads', express.static(path.join(__dirname, 'uploads')));
app.set("view engine", "ejs");


app.set("views", [
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/detail"),
    path.join(__dirname, "/views/data"),
    // path.join(__dirname, "/views/layouts"),
  ]);


//menampilkan assets.
app.use(express.static(__dirname + "/public"));

app.listen(PORT,() =>{
    console.log(`run on port  <http://localhost>:${PORT}`);
}); 