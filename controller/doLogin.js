//var md5 = require('')

module.exports = function *(next) {
    this.redirect('http://tms.dbike.me/#/login?referer=swallow');
}
