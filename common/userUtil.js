/**
 * Created by wxm-pc on 2019/3/24.
 */
function saveUserLogin(res, req, phone, openid, avatar) {
    res.cookie('_M_Session','phone=' + phone + '&openid=' + openid, {
        signed: true,
        maxAge: 7*24*60*60*1000,
        path:'/',
        httpOnly:false
    });
    req.session.userInfo = {
        phone: phone,
        openid: openid,
        avatar: avatar
    }
}
module.exports = {
    saveUserLogin:saveUserLogin
}