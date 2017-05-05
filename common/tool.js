/**
 * Created by yangxun on 16/7/8.
 */
var http = require("http"),
    fs = require("fs"),
    qiniu = require("qiniu");
//log记录
var Logger = require('mini-logger'),
    config = require('../config/config');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});
//router use : this.logger.error(new Error(''))
exports.logger = logger;

/**
 * 处理成功的数据
 * @param data
 * @returns {{status: number, msg: string, data: *}}
 */
exports.prepareSuccess = function(data, msg="success"){
    return {
        status: 0,
        msg: msg,
        data: data
    }
};

/**
 * 处理失败的数据
 * @param data
 * @param status
 * @param msg
 * @returns {{status: number, msg: string, data: *}}
 */
exports.prepareFailure = function(data, msg='error', status=-1){
    return {
        status: status,
        msg: msg,
        data: data
    }
};

/**
 * 过滤掉target中在paramsList中不存在的属性字段
 * @param target
 * @param paramsList
 * @returns {{}}
 */
exports.filterParams = function(target={}, paramsList){
    var result = {};
    Object.keys(target).map(key=>{
        if(key && paramsList.includes(key)){
            result[key] = target[key];
        }
        else{
            logger.error(JSON.stringify(target));
        }
    });

    return result;
};


/**
 * 过滤掉空值
 * @param target
 * @returns {{}}
 */
exports.filterEmptyOrNull = function(target={}){
    var result = {};
    Object.keys(target).map(key=>{
        if(target[key] != null && target[key] != undefined && target[key] != ""){
            result[key] = target[key];
        }
    });

    return result;
};


function getAKSK(){
    return new Promise ((resolve, reject) => {
            http.get(config.qiniu.AKSK, (res) => {
                let str = '';

                res.on('data', (chunk) => {
                    str += chunk
                });

                res.on('end', () => {
                    const AkSk = JSON.parse(str);
                    resolve(AkSk)
                });
            }).on('error', (e) => {
                logger.error(e);
                reject(e)
            });
        }
    );
};

/**
 * 获取七牛ak sk
 * @returns {Promise}
 */
var AKSK;
getAKSK().then(aksk =>{
    /*
     * 设置七牛AK SK参数
     * @type {number}
     */
    qiniu.conf.ACCESS_KEY = aksk.ak;
    qiniu.conf.SECRET_KEY = aksk.sk;

    AKSK = exports.AKSK = aksk;
});

/**
 * 生成token
 * @param bucket  空间名
 * @param key     文件名
 */
var uptoken = exports.uptoken = function(bucket, key) {
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
};

/**
 * 上传文件到七牛
 * @param key
 * @param localFile
 */
exports.uploadFile = function(key, localFile, clean=false) {
    let extra = new qiniu.io.PutExtra();
    key = [config.qiniu.prefix, key].join('/');

    let token = uptoken(config.qiniu.bucket, key);
    return new Promise((resolve, reject) => {
        qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
            if(!err) {
                if(clean){
                    fs.unlinkSync(localFile);
                }
                let cdnUrl = config.qiniu.cdnHost + ret.key;
                // 上传成功， 处理返回值
                resolve(cdnUrl);
            } else {
                logger.error(err);
                // 上传失败， 处理返回代码
                reject(null);
            }
        });
    });
};

/**
 * 构建线上地址
 * @param name
 */
const buildRleaseUrl = exports.buildRleaseUrl = function(name){
    return [config.qiniu.cdnHost, config.qiniu.prefix, '/', name].join('');
};

/**
 * 上传文件到七牛CDN
 * @param content
 * @returns {Promise}
 */
exports.upload = function(fileName, content){
    let extra = new qiniu.io.PutExtra();
    fileName = [config.qiniu.prefix, fileName].join('/');

    let token = uptoken(config.qiniu.bucket, fileName);

    return new Promise((resolve, reject) => {
        qiniu.io.put(token, fileName, content, extra, function(err, ret) {
            if(!err) {
                let cdnUrl = buildRleaseUrl(ret.key);
                // 上传成功， 处理返回值
                resolve(cdnUrl);
            } else {
                logger.error(err);
                // 上传失败， 处理返回代码
                reject(null);
            }
        });
    });
}