const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser')
const session = require ('express-session')
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
// const MySQLStore = require('connect-mysql-session')(session);

const database = require('./utils/database');
const app = express();
const PORT = 3003;



// const sessionStore = new MySQLStore({
//   /* Konfigurasi untuk MySQLStore di sini */
// });


const corsOptions = {
  origin: 'http://localhost:8080', // Ganti dengan origin/domain Anda
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Mengizinkan pengiriman cookie dan header otentikasi
  optionsSuccessStatus: 204, // Beberapa browser mungkin memerlukan status 204
};

// Set Trust Proxy jika di-host di bawah reverse proxy
app.set('trust proxy', 1);

app.use(session({
  secret: 'your-secret-key',
  saveUninitialized:  true,
  resave : false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 hari
  },
}));

// database.on();

app.use(morgan('tiny'));

// Middleware untuk mengizinkan CORS
app.use(cors(corsOptions));

// Middleware untuk menguraikan JSON dalam body permintaan
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// import router in app.js
const routerBeranda = require('./router/beranda');
const routerMitra = require('./router/mitra');

app.use("/", routerBeranda, routerMitra);

// Menyediakan rute statis untuk file PDF di direktori 'uploads'
app.use('/data/detail-hse/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data/detail-psb/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data/detail-pb/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data/detail-pa/uploads', express.static(path.join(__dirname, 'uploads')));

app.set("view engine", "ejs");

app.set("views", [
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/detail"),
    path.join(__dirname, "/views/data"),
    path.join(__dirname, "/views/updates"),
  ]);

// Menyediakan rute statis untuk file di direktori 'public'
app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));

app.listen(PORT,() =>{
    console.log(`run on port  <http://localhost>:${PORT}`);
});
