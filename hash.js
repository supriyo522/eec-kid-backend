const bcrypt = require('bcrypt');
const password = '##############'; // Your plain password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
});
