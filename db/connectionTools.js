var mysql = require('mysql');


exports.getConnection = () => {
    return connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'locamat'
        })
};