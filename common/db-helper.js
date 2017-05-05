/**
 * Created by yangxun on 16/7/6.
 */
var Sequelize = require('sequelize'),
    DB = require('../config/config').mysql;

var sequelize = new Sequelize(DB.database, DB.username, DB.password, DB.config
    // SQLite only
    //storage: 'path/to/database.sqlite'
);

sequelize
    .authenticate()
    .then(function(err) {
        console.log('数据库连接成功');
    })
    .catch(function (err) {
        console.log('数据库连接失败', err);
    });


module.exports = sequelize;