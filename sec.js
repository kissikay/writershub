const crypto = require('crypto');

// Generate a 32-character random string
const secretKey = crypto.randomBytes(16).toString('hex');

console.log('Generated Secret Key:', secretKey);