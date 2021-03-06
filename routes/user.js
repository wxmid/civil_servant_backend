/**
 * Created by wxm-pc on 2019/1/5.
 */
var express = require('express');
var url = require('url');
var request = require('request'); // nodejs使用request发送http请求
var router = express.Router();
var User = require('../models/user'); // 集合。。。
var userUtil = require('../common/userUtil');
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
router.post('/login',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    User.findOne({phone: req.body.loginPhone,password:req.body.loginPassword},function (err,resf) {
        if (err || !resf) {
            result.status = 1
            result.desc = '用户名或密码不正确'
        } else {
            result.phone = resf.phone
            result.openid = resf.openid
            result.avatar = resf.avatar
            //将密匙字符串赋值给req.secret,可以省略，在上面cookieparser()时会自动对secret赋值
            // req.secret= signStr;
            res.cookie('_M_Session','phone=' + resf.phone + '&openid=' + resf.openid, {
                signed: true,
                maxAge: 7*24*60*60*1000,
                path:'/',
                httpOnly:false
            });
            req.session.userInfo = {
                phone: resf.phone,
                openid: resf.openid,
                avatar: resf.avatar
            }
        }
        console.log('带签名',JSON.stringify(req.signedCookies));
        console.log('不带签名',JSON.stringify(req.cookies));
        console.log('不带签名1:' + JSON.stringify(req.session))

        res.send(result)
    })
})
// 用户qq登录
router.post('/qqLogin',function (req, res, next) {
    console.log('======================111111111111111=============')
    let result = {
        status: 0,
        desc: '登陆成功！'
    }
    console.log('======================222=============')

    let openId = req.body.openId;
    console.log('======================333=============')
    console.log('======================:' + openId + ':=============')
    var user = new User({
        openid: openId
    });
    console.log('======================444=============')
    User.findOne({openid: openId},function (err,resf) {
        console.log('======================555=============')
        if (err || !resf) {
            console.log('======================666=============')
            // 如果没有则插入，有则直接登录
            user.save(function (err) {
                console.log('======================777=============')
                if (err) {
                    result.status = 1
                    result.desc = '登陆失败!'
                    res.send(result);
                } else {
                    res.send(result);
                }
            });
        } else {
            console.log('======================888=============')
            result.phone = resf.phone
            result.openid = resf.openid
            result.avatar = resf.avatar
            //将密匙字符串赋值给req.secret,可以省略，在上面cookieparser()时会自动对secret赋值
            // req.secret= signStr;
            userUtil.saveUserLogin(res, req, resf.phone, resf.openid, resf.avatar);
            console.log('======================222=============')
            res.send(result);
        }
    })
});
// 登出
router.all('/logout',function (req,res,next) {
    //销毁session
    req.session.destroy(function(err){
        if(err){
            throw err;
        }else{
            res.clearCookie('_M_Session');
            res.redirect('/login');
        }
    })

});
module.exports = router;
