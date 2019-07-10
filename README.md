# swallow-server

活动海报页可视化制作工具swallow 的服务端接口


## 目录结构

````
swallow-server/
├── index.js        服务启动入口
├── package.json
├── router.js       服务路由
├── README.md       项目说明
├── README.md       项目说明
├── common/         存放公共模块
├── controller/     项目采用mvc分层,该目录存放业务控制层逻辑
├── log/            项目日志
├── model/          数据库表对应的实体model
├── node_modules/   第三方模块
├── service/        项目采用mvc分层,该目录存放业务服务层逻辑
├── view/           页面模板
└── test/           单元测试
````


## 如何开始?

````
第一步: 拉取项目 git clone xxxxx
````

````
第二步: 安装依赖  cd swallow-server & npm install
````

````
第三步: 启动服务 node index.js

注意目前必须先 cd 到应用目录下(如/var/www/swallow-server/) 再执行命令,否则上传图片等功能会报错)
````


## 项目详情

````
  数据库
     采用mysql数据库 , 数据库地址存放于192.168.30.135内部服务器上,其它具体配置信息,
     如数据库用户名,密码等请查看config/config.js配置文件

  图片存储
     图片存储于七牛云存储,相关七牛配置信息请查看config/config.js配置文件

  图片上传流程
     客户端上传图片->暂存于应用服务器下的public/upload目录->客户端点保存->转义应用服务器的图片至七牛云存储

````

## 项目技术栈

````
   koa
   koa-router
   sequlize
   qiniu
````

 
