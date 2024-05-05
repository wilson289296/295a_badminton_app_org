let bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

module.exports = users;