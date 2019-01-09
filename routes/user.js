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
        if (err || !resf) {
            result.status = 1
            result.desc = '用户名或密码不正确'
        } else {
            result.phone = resf.phone
            result.openid = resf.openid
            result.avatar = resf.avatar
            res.cookie('_M_Sessin', 'phone=' + resf.phone +  '&openid=' + resf.openid, {
                maxAge:7*24*60*60*1000, path:'/', httpOnly:true
            });
            /*var today = new Date();
            var time = today.getTime() + 60*1000;
            var time2 = new Date(time);
            var timeObj = time2.toGMTString();
            response.writeHead({
                'Set-Cookie':'myCookie="type=ninja", "language=javascript";path="/";Expires='+timeObj+';httpOnly=true'
            });*/
        }
        res.send(result)
    })
})
// 登出
router.all('/logout',function (req,res,next) {
    //销毁session
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })

});
module.exports = router;
