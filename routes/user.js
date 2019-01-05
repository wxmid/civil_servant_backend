/**
 * Created by wxm-pc on 2019/1/5.
 */
var express = require('express');
var url = require('url');
var router = express.Router();
var User = require('../models/user'); // 集合。。。
// 新用户注册
router.post('/register', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    var user = new User({
        phone: req.body.phone,
        password: req.body.password
    })
    //保存数据库
    User.countDocuments({phone: req.body.phone},function (err, count) {
        if(!count) {
            user.save(function (err) {
                if (err) {
                    result.status = 1
                    result.desc = '注册失败'
                    return;
                } else {

                    res.send(result);
                }
            });
        } else {
            result.status = 1
            result.desc = '该手机号已注册'
            res.send(result);
        }

    });
});
// 用户登录
router.get('/login',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    User.findOne({phone: req.query.loginPhone,password:req.query.loginPassword},function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = '用户名或密码不正确'
            return;
        } else {
            result.phone = resf.phone
            result.openid = resf.openid
            result.avatar = resf.avatar
        }
        res.send(result)
    })
})
module.exports = router;
