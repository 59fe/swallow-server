/**
 * Created by yangxun on 16/7/6.
 */
var sequelize = require('../common/db-helper'),
    Sequelize = require('sequelize'),
    moment = require('moment'),
    ObjectId = require('../common/objectid').ObjectID

/*
* 海报model
* */
var params = {
    id: {
        type: Sequelize.STRING(24),
        primaryKey: true,
        //defaultValue: function(){return new ObjectId().toHexString();}
    },
    type: Sequelize.INTEGER,//页面类型，1：海报，2：活动文章
    layout: Sequelize.STRING(24),//页面布局类型，其值为mobile或者pc
    title: Sequelize.STRING(128), //页面标题
    userId: Sequelize.STRING,//创建人ID
    pathname: {
        type: Sequelize.STRING(255),
        unique: true
    }, //页面路径名，需要确保唯一性
    background: Sequelize.TEXT,
    //backgroundImageName: Sequelize.STRING(64), //背景图名称
    //backgroundImageData: Sequelize.TEXT, //背景图base64数据
    backgroundColor: Sequelize.STRING(24), //背景颜色
    shareImage: Sequelize.STRING(255), //分享图标地址
    shareTitle: Sequelize.STRING(128), //分享标题
    shareDesc: Sequelize.STRING(255), //分享描述
    statistics: Sequelize.TEXT, //统计代码
    elements: Sequelize.TEXT,
    isPublish: Sequelize.BOOLEAN,//是否已经发布
    html: Sequelize.TEXT,
    attention: {//是否关注    0不关注 1关注
        type: Sequelize.INTEGER,
        defaultValue: function(){return 0;}
    },
    createDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get: function()  {
            var time = this.getDataValue('createDate');
            if(time){
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            }
            else {
                return null;
            }
        }
    },
    updateDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get: function()  {
            var time = this.getDataValue('updateDate');
            if(time){
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            }
            else {
                return null;
            }
        }
    }
};

var Poster = sequelize.define('swallow_poster', params,{
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ],
    freezeTableName: true // Model tableName will be the same as the model name
});

//创建表
//Poster.sync({force: false});

module.exports = {
    Poster,
    Params: Object.keys(params),
};