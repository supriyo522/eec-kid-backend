const bcrypt = require('bcrypt');
const password = 'admin123'; // Your plain password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
});
