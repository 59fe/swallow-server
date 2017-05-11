/**
 * Created by yangxun on 16/7/6.
 */
var poster = require('./poster');
var relations = require('./relations')


module.exports = {
    poster: poster.Poster,
    relations: relations.Relations,
    //属性字段
    params: {
        poster: poster.Params,
        relations: relations.Params
    }
};