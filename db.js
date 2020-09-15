var mysql = require('mysql');



//declaring the mysql connection parameters
const MysqlHost = "127.0.0.1";
const MysqlUser = "root";
const MysqlPass = "root";
const MysqlPort = 3306;

var connection;

module.exports = {

    dbConnection: function () {

        //creating mysql connection
        connection = mysql.createConnection({
            host: MysqlHost,
            port: MysqlPort,
            user: MysqlUser,
            password: MysqlPass,
            multipleStatements: true
        });
        connection.connect();
        return connection;
    }

};