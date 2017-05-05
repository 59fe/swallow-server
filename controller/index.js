var doLogin = require('./doLogin');

module.exports = {
    index: function*(){
        yield this.render('index', {"title": "swallow"});
    },
    login: function*(){
        yield this.render('login', {"title": "登录"});
    },
    doLogin: doLogin,
    getToken: function*(){
        var qiniu = require("qiniu");
        qiniu.conf.ACCESS_KEY = 'xx';
        qiniu.conf.SECRET_KEY = 'oo';
        var bucket = 'fecdn';
        var key = 'test';

        function uptoken(bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
            return putPolicy.token();
        }

        var token = uptoken(bucket, key);
        this.body = 'swallow qiniu token has generated!';
    },
    uploadImg: function*(){
        var parse = require('co-busboy');
        var fs = require('fs');
        var path = require('path');

        // ignore non-POSTs
        if ('POST' != this.method) return yield next;

        // multipart upload
        var parts = parse(this);
        var part;

        while (part = yield parts) {
            if (!/image/.test(part.mimeType)) continue;
            var stream = fs.createWriteStream(path.resolve('./uploaded/' + part.filename));
            part.pipe(stream);
        }

        this.redirect('/');
    },

};
