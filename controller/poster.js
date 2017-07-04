/**
 * Created by yangxun on 16/7/7.
 */
const Poster = require('../service/poster')
const Common = require('../service/common')
const Relations = require('../service/relations')
const doLogin = require('./doLogin')

module.exports = {
    /**
     * 保存到数据库
     */
    save: function*(){

        if (!this.session.userinfo) {
          doLogin()
          return false
        }

        var poster = this.request.body;
        var tempFiles = poster.tempFiles;
        var result = yield Common.publishImage(tempFiles);
        poster.userId = this.session.userinfo.uid
        if (result.status == 0) {
            this.body = yield Poster.save(poster);
        } else {
            this.body = result;
        }
    },
    /**
     * path唯一性校验
     */
    check: function *(){
        var path = this.query.path;
        var id = this.query.id;
        this.body = yield Poster.check(id, path);
    },
    /**
     * 根据自定义过滤条件查询
     */
    find: function *(){
        var where = this.query || {};
        var page = {
            size: Number(where.size) || 20,
            index: Number(where.index) || 0
        }
        if (this.session.userinfo) {
          where.user_id = this.session.userinfo.uid
        }
        if (where.attention) {
          where.attentioned_only = true
        }
        this.body = yield Poster.findBySQL(where, page);
    },
    /**
     * 获取自己创建的海报活动列表
     */
    findOwnerPoster: function *(){
        var page = this.query.page
        var where = {
          user_id: this.session.userinfo.uid,
          owned_only: true
        }
        this.body = yield Poster.findBySQL(where, page);
    },
    /**
     * 根据ID查询海报详情
     */
    detail: function* (){
        var id = this.query.id;
        this.body = yield Poster.detail(id);
    },
    /**
     * 更新海报信息
     */
    update: function* (){

        if (!this.session.userinfo) {
          doLogin()
          return false
        }

        var id = this.request.body.id,
            params = this.request.body.params;
        var tempFiles = params.tempFiles;
        var result = yield Common.publishImage(tempFiles);
        if(result.status == 0){
            this.body = yield Poster.update(id, params);
            //this.body = yield Poster.save(poster);
        }
        else{
            this.body = result;
        }

    },
    /**
     * 更新关注状态
     */
    attention: function* (){

        if (!this.session.userinfo) {
          doLogin()
          return false
        }

        var id = this.request.body.id, attention = this.request.body.attention;

        if (attention) {
          this.body = yield Relations.add({
            source_id: this.session.userinfo.uid,
            target_id: id,
            type: 'swallow_attention'
          })
        } else {
          this.body = yield Relations.remove({
            source_id: this.session.userinfo.uid,
            target_id: id,
            type: 'swallow_attention'
          })
        }

    },
    /**
     * 发布到CDN
     */
    publish: function* (){

        if (!this.session.userinfo) {
          doLogin()
          return false
        }

        var id = this.request.body.id,
            params = this.request.body.params;

        var result = yield Poster.update(id, params);
        if(result.status == 0){
            this.body = yield Common.publishHtml(params.pathname, params.html, params.type);
        }
        else{
            this.body = result;
        }
    },
    /**
     * 根据ID删除海报
     */
    del: function* (id){
        var id = this.params.id;
        if (!this.session.userinfo) {
          doLogin()
          return false
        }
        this.body = yield Poster.del(id);
    }
};