/**
 * Created by wxm-pc on 2019/1/5.
 */
var express = require('express');
var url = require('url');
var request = require('request'); // nodejs使用request发送http请求
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
router.get('/qqlogin',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    let access_token = req.query.access_token
    let expires_in = req.query.expires_in
    // access_token 换区openid
    request(`https://graph.qq.com/oauth2.0/me?access_token=${access_token}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            let params = {}
            function callback(json) {
                params = json
            }
            eval(body) //
            console.log(params)
            console.log(params.client_id)
            console.log(params.openid)
            User.findOne({openid: params.openid},function (err,resf) {
                if (err || !resf) { // 如果没有则插入，有则直接登录
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

                // res.send(result)
                res.send('http://www.mindwen.com')
            })
                } else {
                    console.log(body) // Show the HTML for the baidu homepage.
                }
            })
    res.send(result)
})
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
