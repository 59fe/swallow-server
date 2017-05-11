var koa = require('koa');
var router = require('koa-router')();
var session = require('koa-session');
var assets = require('koa-static');
var appRouter = require('./router.js');
var config = require('./config/config');
var sessionConfig = require('./config/session')
var path = require('path');
var http = require('http');
var fs = require('fs');
//var serve = require('koa-static');
var app = koa();

//app.use(serve('./uploaded'));

app.use(assets(__dirname + '/'));
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
      this.config = config;
    }
    yield next;
});
app.keys = [sessionConfig.key]
app.use(session(sessionConfig, app))
// create log/
if (!fs.existsSync('./log')){
    fs.mkdirSync('./log');
}

var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
    //配置模板目录
    views: config.viewDir
});

//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

appRouter(router);
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(config.port);
module.exports = app;
