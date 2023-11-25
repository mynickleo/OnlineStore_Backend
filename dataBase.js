const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: '3742907',
    host: 'localhost',
    port: 5432,
    database: 'onlinestore'
})

module.exports = pool