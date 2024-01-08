const crypto = require('crypto');

const secretKey = 'your-secret-key'; // Ganti dengan kunci rahasia yang aman

const encryptedId_hse = (id) => {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decryptId = (encryptedId) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedId, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encryptedId_hse, decryptId };
