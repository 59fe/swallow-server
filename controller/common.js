/**
 * Created by yangxun on 16/7/12.
 */
var common = require('../service/common'),
    config = require('../config/config');

/**
 * 上传文件
 */
exports.uploadFile = function* (){
    // parse a file upload
    this.body = yield common.uploadFile(this.req);
};

/**
 * 域名相关信息
 */
exports.qiniu = function* (){
    // parse a file upload
    this.body = {
        bucket: config.qiniu.bucket,
        host: config.qiniu.cdnHost
    };
};

/**
 * 获取七牛上传token
 */
exports.qiniuToken = function* (){
    this.body = yield common.createQiniuToken(this.request.body.tokenID);
}