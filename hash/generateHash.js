const bcrypt = require('bcrypt');
const myPassword = '';

console.time('Time to generate salt');
const salt = bcrypt.genSaltSync(10);
console.log('This is your salt:' + salt);
console.timeEnd('Time to generate salt');

console.time('Time to generate salt');
const hashedPassword = bcrypt.hashSync(myPassword, salt);

console.log(myPassword + ' is your password & this is your password after hashing it: ' + hashedPassword);

console.timeEnd('Time to generate has');