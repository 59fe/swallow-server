var path = require('path');
var local = require('./local');
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "swallow-server",
    //端口号配置
    "port": 8000,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": path.join(__dirname,'..', 'log'),

    mysql: {
        database: 'dbtms_dev',
        username: 'admin',
        password: 'admin',
        config: {
            host: '192.168.30.135',
            dialect: 'mysql',
            port: '3306',
            logging: null,
            pool: {
              max: 5,
              min: 0,
              idle: 10000
            }
        }
    },

    qiniu: {
        // 对象存储上的空间名
        "bucket": "fecdn",
        "prefix": "activity",
        // 公钥私钥的存放地址
        "AKSK": "http://code.59store.com/snippets/2/raw",
        // cdn域名
        "cdnHost": "http://fecdn.59store.com/",

        cache: path.join(process.cwd(), '/public/upload/')     //本地服务器缓存目录
    }
};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = Object.assign(config, local);
}

module.exports = config;
