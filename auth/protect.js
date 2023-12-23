// Middleware proteksi
const protect = (req, res, next) => {
    if (req.session.id) {
      // Pengguna sudah login, lanjutkan ke halaman yang diminta
      next();
    } else {
      // Pengguna belum login, redirect ke halaman login
      res.redirect('/login');
    }
  };
  
  
  module.exports = {
    protect
  }